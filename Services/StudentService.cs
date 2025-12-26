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
                s.Name,
                s.Grades
                    .Select(g => new GradeDto(g.Course_Name, g.GradeValue))
                    .ToList()
            ))
            .ToListAsync();
    }

    public async Task<IEnumerable<StudentAverageDto>> StudentAverages()
    {

        return await _context.Students
            .Select(s => new StudentAverageDto(
                s.Name,
                s.Grades.Average(g => g.GradeValue)
            ))
            .ToListAsync();
    }
}