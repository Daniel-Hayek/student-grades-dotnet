using Microsoft.AspNetCore.Mvc;
using StudentGradesDotnet.Reports;

namespace StudentGradesDotnet.Controllers
{
    public class ReportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("/student-report")]
        public IActionResult StudentReport(int? studentId)
        {
            var report = new Report2();

            if (studentId.HasValue)
            {
                report.Parameters["StudentID"].Value = studentId;
            }
            else
            {
                report.Parameters["StudentID"].Value = null;
            }

            report.Parameters["StudentID"].Visible = false;


            // return Content("hit controller");
            return View(report);
        }
    }
}
