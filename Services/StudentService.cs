using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Data;
using StudentGradesDotnet.DTOs;
using StudentGradesDotnet.Models;
using StudentGradesDotnet.Services;

namespace StudentGradesDotnet.Services;

public class StudentService : IStudentService
{
    private readonly StudentGradesContext _context;

    public StudentService(StudentGradesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<StudentDto>> GetAllStudents()
    {
        return await _context.Students
            .Include(s => s.Grades)
            .Select(s => new StudentDto(
                s.Id,
                s.Name!,
                s.Grades!
                    .Select(g => new GradeDto(g.Course_Id, g.Course_Name!, g.GradeValue))
                    .ToList()
            ))
            .ToListAsync();
    }

    // Fetching the data from the database and using LINQ EF to aggregate
    // directly from the query, avoiding extra backend computing
    public async Task<IEnumerable<StudentAverageDto>> StudentAverages()
    {

        return await _context.Students
            .OrderBy(s => s.Name)
            .Select(s => new StudentAverageDto(
                s.Id,
                s.Name!,
                s.Grades!.Average(g => g.GradeValue)
            ))
            .ToListAsync();
    }

    public async Task<StudentDto> AddStudent(StudentDto student)
    {
        if (await _context.Students.AnyAsync(s => s.Name == student.Name))
        {
            throw new InvalidOperationException("That name already exists");
        }

        var s = new Student();
        s.Name = student.Name;
        s.Grades = new List<Grade>();

        foreach (GradeDto g in student.Grades)
        {
            var temp = new Grade();
            temp.Course_Id = g.Course_Id;
            temp.Course_Name = g.Course_Name;
            temp.GradeValue = g.GradeValue;

            s.Grades.Add(temp);
        }

        _context.Students.Add(s);

        await _context.SaveChangesAsync();

        var res = new StudentDto(student.Id, student.Name, student.Grades);

        return student;
    }

    public async Task<StudentDto?> UpdateStudent(StudentDto student)
    {
        var exists = await _context.Students.Include(s => s.Grades).FirstOrDefaultAsync(s => s.Id == student.Id);

        if (exists == null)
        {
            return null;
        }

        exists.Name = student.Name;

        foreach (GradeDto g in student.Grades)
        {
            var gradeExists = exists.Grades!.FirstOrDefault(x => x.Course_Id == g.Course_Id);

            if (gradeExists != null)
            {
                gradeExists.GradeValue = g.GradeValue;
            }
            else
            {
                exists.Grades!.Add(new Grade
                {
                    Student_Id = student.Id,
                    Course_Id = g.Course_Id,
                    Course_Name = g.Course_Name,
                });
            }


        }

        await _context.SaveChangesAsync();

        return student;
    }

    public async Task<bool> DeleteStudent(StudentDto student)
    {
        var studentToDelete = await _context.Students.FindAsync(student.Id);

        if (studentToDelete == null)
        {
            return false;
        }

        _context.Students.Remove(studentToDelete);
        await _context.SaveChangesAsync();

        return true;
    }
}