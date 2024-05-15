using API.Controllers;
using Application.Core;
using Application.DonViDo;
using Application.QuocGia;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom02.ApiController
{

    public class QuocGiaApiController : BaseApiController
    {
        public QuocGiaApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("DanhSachQuocGia")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachQuocGia(string? TuKhoa)
        {
            return HandleResult(await Mediator.Send(new DanhSach.Query { TuKhoa = TuKhoa }));
        }
        [HttpPut]
        [Route("CapNhatQuocGia")]

        public async Task<IActionResult> CapNhatQuocGia( PTD_QuocGia qg)
        {
            return HandleResult(await Mediator.Send(new CapNhat.Command { QuocGia = qg }));
        }
        [HttpPost]
        [Route("ThemMoiQuocGia")]
        public async Task<IActionResult> ThemMoiQuocGia( PTD_QuocGia qg)
        {
            return HandleResult(await Mediator.Send(new Application.QuocGia.ThemMoi.Command { QuocGia = qg }));
        }
        [HttpGet]
        [Route("ThongTinChiTiet")]
        [AllowAnonymous]
        public async Task<IActionResult> ThongTinChiTiet(string MaQuocGia)
        {

            return HandleResult(await Mediator.Send(new Application.QuocGia.ThongTinChiTiet.Query { Id = MaQuocGia }));

        }
        [HttpDelete]
        [Route("XoaQuocGia")]
        public async Task<IActionResult> XoaQuocGia(string MaQuocGia)
        {

            return HandleResult(await Mediator.Send(new Application.QuocGia.Xoa.Command { MaQuocGia = MaQuocGia }));
        }
    }
}
