using System.ComponentModel.DataAnnotations;

namespace StudentGradesDotnet.DTOs;

public record StudentDto(
    int Id,

    [Required]
    [MinLength(1, ErrorMessage = "Name too short!")]
    [MaxLength(50)]
    string Name,

    List<GradeDto> Grades);