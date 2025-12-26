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


    // Fetching the data from the database and using LINQ EF to aggregate
    // directly from the query, avoiding extra backend computing
    public async Task<IEnumerable<GradeDto>> GetCourseAverages()
    {
        return await _context.Grades
            .GroupBy(g => g.Course_Name)
            .Select(g => new GradeDto(
                g.Key,
                (int)Math.Round(g.Average(x => x.GradeValue))
            ))
            .ToListAsync();
    }

}