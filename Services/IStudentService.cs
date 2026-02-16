using StudentGradesDotnet.DTOs;
using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Services;

public interface IStudentService
{
    Task<IEnumerable<StudentDto>> GetAllStudents();
    Task<IEnumerable<StudentAverageDto>> StudentAverages();

    Task<StudentDto> AddStudent(StudentDto student);

    Task<StudentDto?> UpdateStudent(StudentDto student);

    Task<bool> DeleteStudent(StudentDto student);
}