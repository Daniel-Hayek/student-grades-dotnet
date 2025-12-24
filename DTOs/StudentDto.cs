namespace StudentGradesDotnet.DTOs;

public record StudentDto(int Id, string Name, List<GradeDto> Grades);