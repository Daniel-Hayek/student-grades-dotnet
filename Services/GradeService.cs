using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Data;
using StudentGradesDotnet.DTOs;
using StudentGradesDotnet.Models;
using StudentGradesDotnet.Services;

namespace StudentGradesDotnet.Services;

public class GradeService : IGradeService
{
    private readonly StudentGradesContext _context;

    public GradeService(StudentGradesContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<GradeDto>> GetCourseAverages()
    {
        return await _context.Grades
            .Select(g => new GradeDto(g.Course_Name, g.GradeValue))
            .ToListAsync();
    }

}