using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Data;
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

    public async Task<IEnumerable<Student>> GetAllStudents()
    {
        return await _context.Students.ToListAsync();
    }
}