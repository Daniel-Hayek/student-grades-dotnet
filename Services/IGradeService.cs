using StudentGradesDotnet.DTOs;
using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Services;

public interface IGradeService
{
    Task<IEnumerable<Grade>> GetCourseAverages();
}