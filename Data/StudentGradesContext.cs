using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using student_grades_dotnet.Models;

namespace StudentGradesDotnet.Data
{
    public class StudentGradesContext : DbContext
    {
        public StudentGradesContext (DbContextOptions<StudentGradesContext> options)
            : base(options)
        {
        }

        public DbSet<student_grades_dotnet.Models.Student> Student { get; set; } = default!;
    }
}
