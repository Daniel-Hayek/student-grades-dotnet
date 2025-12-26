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
    public class GradeController : Controller
    {

        //Initializing instance of Grade Service to call relevant service layer logic
        private readonly IGradeService _gradeService;

        public GradeController(IGradeService gradeService)
        {
            _gradeService = gradeService;
        }

        // GET: course-averages
        // This endpoint returns the courses and their averages
        [HttpGet]
        [Route("/course-averages")]
        public async Task<IActionResult> GetCourseAverages()
        {
            return Ok(await _gradeService.GetCourseAverages());
        }

    }
}
