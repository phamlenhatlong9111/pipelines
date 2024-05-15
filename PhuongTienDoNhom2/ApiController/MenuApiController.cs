using Application.Menu;
using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Dapper.SqlMapper;

namespace QuanLyCayXanh.ApiController
{
    public class MenuApiController : BaseApiController
    {
        public MenuApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpPost]
        [Route("ThemMoiMenu")]
        public async Task<IActionResult> ThemMoiMenu([FromForm] NhomMenu_Menu _qlcx_Menu)
        {
            return HandleResult(await Mediator.Send(new ThemMoiMenu.Command { Entity = _qlcx_Menu }));
        }
        [HttpGet]
        [Route("DanhSachMenu")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachMenu(string UserID)
        {
            //var username = ((ClaimsIdentity)User.Identity).Name;
            return HandleResult(await Mediator.Send(new DanhSachMenu.Query { Id = UserID }));
        }
        [HttpPut]
        [Route("CapNhatMenu")]
        public async Task<IActionResult> CapNhatMenu([FromForm] NhomMenu_Menu _qlcx_Menu)
        {
            return HandleResult(await Mediator.Send(new CapNhatMenu.Command { Entity = _qlcx_Menu }));
        }
        [HttpPost]
        [Route("ThemMoiNhomMenu")]
        public async Task<IActionResult> ThemMoiNhomMenu([FromForm] NhomMenu _qlcx_NhomMenu)
        {
            return HandleResult(await Mediator.Send(new ThemMoiNhomMenu.Command { Entity = _qlcx_NhomMenu }));
        }
        [HttpGet]
        [Route("DanhSachNhomMenu")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachNhomMenu()
        {
            return HandleResult(await Mediator.Send(new DanhSachNhomMenu.Query { }));
        }
        [HttpPut]
        [Route("CapNhatNhomMenu")]
        public async Task<IActionResult> CapNhatNhomMenu([FromForm] NhomMenu _qlcx_NhomMeNu)
        {
            return HandleResult(await Mediator.Send(new CapNhatNhomMenu.Command { Entity = _qlcx_NhomMeNu }));
        }
        [HttpGet]
        [Route("DanhSachCayMenu")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachCayMenu()
        {
            return HandleResult(await Mediator.Send(new DanhSachCayMenu.Query { }));
        }
        [HttpGet]
        [Route("DanhSachMenuTheoNhom")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachMenuTheoNhom(int nhomid)
        {
            return HandleResult(await Mediator.Send(new DanhSachMenuTheoNhom.Query { nhomid = nhomid }));
        }


    }
}
