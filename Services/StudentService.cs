using StudentGradesDotnet.Data;
using StudentGradesDotnet.Models;
using StudentGradesDotnet.Services;

public class StudentService : IStudentService
{
    private readonly StudentGradesContext _context;

    public StudentService(StudentGradesContext context)
    {
        _context = context;
    }

    public IEnumerable<Student> GetAllStudents()
    {
        return _context.Students.ToList();
    }
}