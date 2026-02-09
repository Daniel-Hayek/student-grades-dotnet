using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace StudentGradesDotnet.Models;

public class Grade
{
    public int Student_Id { get; set; }
    public int Course_Id { get; set; }

    public string? Course_Name { get; set; }
    public int GradeValue { get; set; }

    public Student? Student { get; set; }
}