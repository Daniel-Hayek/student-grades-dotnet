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
        public IActionResult StudentReport([FromQuery] int? studentId)
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

            var stream = new MemoryStream();
            report.ExportToPdf(stream);
            stream.Position = 0;

            return File(stream, "application/pdf");
        }
    }
}
