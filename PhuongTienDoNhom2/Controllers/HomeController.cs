using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuanLyCayXanh.Models;
using System.Diagnostics;

namespace QuanLyCayXanh.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        

        public IActionResult Index()
        {
            return LocalRedirect("/cms");
        }

        public IActionResult BanDoCayXanh()
        {
            return View($"~/Pages/TrangChu/BanDoCayXanh.cshtml");

        }
        public IActionResult BanDoThamXanhMatNuoc()
        {
            return View($"~/Pages/TrangChu/BanDoThamXanhMatNuoc.cshtml");

        }

        //add bản đồ mobile
        public IActionResult BanDoMatNuoc()
        {
            //ViewBag.ID = ID;
            //ViewBag.ObjectID = ObjectID;
            return View($"~/Pages/TrangChu/BanDoMatNuoc.cshtml");
        }
        public IActionResult BanDoThamXanh()
        {
            //ViewBag.ID = ID;
            //ViewBag.ObjectID = ObjectID;
            return View($"~/Pages/TrangChu/BanDoThamXanh.cshtml");
        }

        public IActionResult BanDoThamXanhThem()
        {
            //ViewBag.ID = ID;
            //ViewBag.ObjectID = ObjectID;
            return View($"~/Pages/TrangChu/BanDoThamXanhThem.cshtml");
        }

        public IActionResult BanDoMatNuocThem()
        {
            //ViewBag.ID = ID;
            //ViewBag.ObjectID = ObjectID;
            return View($"~/Pages/TrangChu/BanDoThamXanhThem.cshtml");
        }

        /*[HttpGet]
        [Route("/cms")]
        public IActionResult IndexNew()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectPermanent("/CMS-New");
            }
            else
            {
                return RedirectPermanent("/Identity/Account/Login");
            }

        }*/
        /*public IActionResult Login()
        {
            return View();
        }*/
        public IActionResult LoginPartial()
        {
            return View();
        }
        public IActionResult TrangChu()
        {
            return View($"~/Pages/TrangChu/Index.cshtml");
        }
        public IActionResult TinTuc(int ID)
        {
                ViewBag.ID = ID;
            return View($"~/Pages/TrangChu/TinTuc.cshtml");
        }
        public IActionResult ChiTietPhanAnh(int Id)
        {
            ViewBag.Id = Id;
            return View($"~/Pages/TrangChu/ChiTietPhanAnh.cshtml");
        }
        public IActionResult DanhMuc(int ID)
        {
            ViewBag.ID = ID;
            return View($"~/Pages/TrangChu/DanhMuc.cshtml");
        }
        public IActionResult ChuyenTrangTinTuc(Guid Id)
        {
            ViewBag.Id = Id;
            return View($"~/Pages/TrangChu/DetailTinTuc.cshtml");
        }
        public IActionResult ChuyenTrangCayXanhTrangChu(Guid IdCayXanh)
        {
            ViewBag.IdCayXanh = IdCayXanh;
            return View($"~/Pages/TrangChu/DetailCayXanhTrangChu.cshtml");
        }
        public IActionResult CayCamTrong()
        {
            return View($"~/Pages/TrangChu/CayCamTrong.cshtml");
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}