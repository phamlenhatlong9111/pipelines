using Application.Core;
using Application.VaiTro;
using API.Controllers;
using Domain;
using Domain.DTOs.ResponseDtos;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace PhuongTienDoNhom2.ApiController
{
    public class VaiTroApiController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;

        public VaiTroApiController(IWebHostEnvironment hostingEnvironment, UserManager<AppUser> userManager) : base(hostingEnvironment)
        {
            _userManager = userManager;
        }
        [HttpPost]
        [Route("ThemMoiVaiTro")]
        public async Task<Result<VAITRO>> ThemMoiVaiTro(VAITRO VAITRO)
        {
            return await Mediator.Send(new Add.Command { VAITRO = VAITRO });
        }
        [HttpPut]
        [Route("XoaVaiTro")]
        public async Task<Result<int>> XoaVaiTro(VAITRO VAITRO)
        {
            return await Mediator.Send(new Delete.Command { VAITRO = VAITRO });
        }
        [HttpPut]
        [Route("CapNhatVaiTro")]
        public async Task<Result<VAITRO>> CapNhatVaiTro(VAITRO VAITRO)
        {
            return await Mediator.Send(new Update.Command { VAITRO = VAITRO });
        }
        [HttpGet]
        [Route("DanhSachVaiTro")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<VAITRO>>> DanhSachVaiTro()
        {
            return await Mediator.Send(new GetsAll.Query { });
        }
        [HttpGet]
        [Route("DanhSachChucNang")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<MainMenu>>> DanhSachChucNang()
        {
            return await Mediator.Send(new GetsAllChucNang.Query { });
        }
        [HttpGet]
        [Route("ChucNangByID")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<CHUCNANG_BY_ID>>> ChucNangByID(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await Mediator.Send(new ChucNangByID.Query { UserId = user.Id });
        }
        [HttpGet]
        [Route("VaiTroByID")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<VAITRO_BY_ID>>> VaiTroByID(string UserName)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await Mediator.Send(new VaiTroByID.Query { UserId = user.Id });
        }
        [HttpPost]
        [Route("PhanQuyenVaiTro")]
        public async Task<Result<VAITRO_NHANVIEN>> PhanQuyenVaiTro(string UserName, string RoleIds )
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await Mediator.Send(new PhanQuyenVaiTro.Command { UserId= user.Id, RoleIds = RoleIds });
        }
        [HttpPost]
        [Route("PhanQuyenChucNang")]
        public async Task<Result<CHUCNANG_NHANVIEN>> PhanQuyenChucNang(string UserName, string MenuIds)
        {
            var user = await _userManager.FindByNameAsync(UserName);
            return await Mediator.Send(new PhanQuyenChucNang.Command { UserId = user.Id, MenuIds = MenuIds });
        }
    }
}
