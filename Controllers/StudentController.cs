using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using StudentGradesDotnet.Data;
using StudentGradesDotnet.Models;
using StudentGradesDotnet.Services;

namespace StudentGradesDotnet.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }


        // GET: students
        // This was an endpoint created for testing
        [HttpGet]
        [Route("/students")]
        public async Task<IActionResult> GetAllStudents()
        {
            return Ok(await _studentService.GetAllStudents());
        }

        // GET: student-averages
        // This endpoint returns the student name and their average grades
        [HttpGet]
        [Route("/student-averages")]
        public async Task<IActionResult> GetStudentsWithAverages()
        {
            return Ok(await _studentService.StudentAverages());
        }

    }
}
