using StudentGradesDotnet.DTOs;
using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentDto>> GetAllStudents();
    Task<IEnumerable<StudentAverageDto>> StudentAverages();
}