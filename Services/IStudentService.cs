using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetAllStudents();
    Task<IEnumerable<Student>> StudentAverages();
}