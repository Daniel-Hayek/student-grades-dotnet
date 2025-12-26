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
        private readonly IStudentService _studentService;

        public GradeController(IStudentService studentService)
        {
            _studentService = studentService;
        }

    }
}
