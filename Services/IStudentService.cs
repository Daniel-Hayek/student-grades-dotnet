using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Services;

public interface IStudentService
{
    IEnumerable<Student> GetAllStudents();
}