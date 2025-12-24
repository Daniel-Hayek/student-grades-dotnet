using System.ComponentModel.DataAnnotations;

namespace student_grades_dotnet.Models;

public class Grade
{
    public int Student_Id { get; set; }
    public int Course_Id { get; set; }

    public string Course_Name { get; set; }
    public decimal GradeValue { get; set; }

    public Student Student { get; set; }
}