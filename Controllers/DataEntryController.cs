using Microsoft.AspNetCore.Mvc;

namespace StudentGradesDotnet.Controllers
{
    public class DataEntryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
