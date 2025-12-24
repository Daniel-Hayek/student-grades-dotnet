using System.ComponentModel.DataAnnotations;

namespace student_grades_dotnet.Models;

public class Student
{
    public int Id { get; set; }
    public string? Name { get; set;}

    public ICollection<Grade> Grades { get; set; }
}