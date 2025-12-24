using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bogus;
using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Data;
using StudentGradesDotnet.Models;

namespace StudentGradesDotnet.Data;

public static class DbSeeder
{
    public static void Seed(StudentGradesContext context)
    {
        // Avoids seeding if data already exists
        if (context.Students.Any())
            return;

        var studentFaker = new Faker<Student>()
            .RuleFor(s => s.Name, f => f.Name.FullName());

        var students = studentFaker.Generate(50);

        context.Students.AddRange(students);
        context.SaveChanges();

        var courses = new[]
        {
            new { Id = 1, Name = "Math" },
            new { Id = 2, Name = "Physics" },
            new { Id = 3, Name = "Chemistry" },
            new { Id = 4, Name = "Biology" },
            new { Id = 5, Name = "English" }
        };

        var gradeFaker = new Faker<Grade>()
            .RuleFor(g => g.Course_Id, f => f.PickRandom(courses).Id)
            .RuleFor(g => g.Course_Name, (f, g) =>
                courses.First(c => c.Id == g.Course_Id).Name)
            .RuleFor(g => g.GradeValue, f => f.Random.Number(30, 100));

        var grades = new List<Grade>();

        foreach (var student in students)
        {
            foreach (var course in courses)
            {
                grades.Add(gradeFaker.Clone()
                    .RuleFor(g => g.Student_Id, student.Id)
                    .Generate());
            }
        }

        context.Grades.AddRange(grades);
        context.SaveChanges();
    }
}