using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Data
{
    public class StudentGradesContext : DbContext
    {
        public StudentGradesContext (DbContextOptions<StudentGradesContext> options)
            : base(options)
        {
            
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Grade> Grades { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        modelBuilder.Entity<Student>()
            .ToTable("students");

        modelBuilder.Entity<Grade>()
            .ToTable("grades");

        modelBuilder.Entity<Grade>()
            .HasKey(g => new { g.Student_Id, g.Course_Id });

        modelBuilder.Entity<Grade>()
            .HasOne(g => g.Student)
            .WithMany(s => s.Grades)
            .HasForeignKey(g => g.Student_Id);
        }
    }
}
