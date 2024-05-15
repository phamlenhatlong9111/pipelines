using Application.JwtCommon;
using Application.NhanVien;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
//using QuanLyCayXanh.Pages.CongViec;
using System.Security.Claims;

namespace PhuongTienDoNhom2.Pages.CMS
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserStore<AppUser> _userStore;
        private readonly IUserEmailStore<AppUser> _emailStore;
        //private readonly ILogger<NhiemVuModel> _logger;
        private readonly IMediator _mediator;

        public IndexModel(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IUserStore<AppUser> userStore, IMediator mediator)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _userStore = userStore;
            _mediator = mediator;
        }
        //public IndexModel(SignInManager<AppUser> signInManager, ILogger<NhiemVuModel> logger, UserManager<AppUser> userManager, IUserStore<AppUser> userStore, IMediator mediator)
        //{
        //    _signInManager = signInManager;
        //    _userManager = userManager;
        //    _userStore = userStore;
        //    _logger = logger;
        //    _mediator = mediator;
        //}
        public string TokenJWT { get; set; }
        public Guid IDUser { get; set; }
        public async Task OnGetAsync()
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            var result = await _mediator.Send(new GetAll.Query { DepartmentId = null, DepartmentName = null, Enabled = null, FullName = null, Username = username });
            if (result.Value != null)
            {
                foreach (var item in result.Value)
                {
                    IDUser = item.ID;
                }
            }

            var api = await _mediator.Send(new GenerateToken.Command { Entity = new GetToken() });
            TokenJWT = api.Value.Token;
            //HttpContext.Response.Cookies.Append("TokenJWT", TokenJWT, new CookieOptions
            //{
            //    //Expires = DateTimeOffset.Now.AddHours(1), // Thời gian sống của cookie (ví dụ: 1 giờ)
            //    Expires = DateTimeOffset.Now.AddMinutes(30),
            //    HttpOnly = true, // Đảm bảo cookie chỉ được truy cập bằng HTTP (không được truy cập từ mã JavaScript)
            //    Secure = true // Đảm bảo cookie chỉ được gửi qua HTTPS (nếu trang web được gửi qua HTTPS)
            //});
        }
    }
}
