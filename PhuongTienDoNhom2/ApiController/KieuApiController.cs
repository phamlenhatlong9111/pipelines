using API.Controllers;
using Application.Core;
using Application.Kieu;
using Application.QuyTrinhApDung;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom02.ApiController
{
    [Route("api/[controller]")]
    [ApiController]
    public class KieuApiController : BaseApiController
    {
        public KieuApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("DanhSachKieu")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachKieu()
        {
            PTD_Kieu kieu = new PTD_Kieu();
            return HandleResult(await Mediator.Send(new DanhSachKieu.Query { Kieu = kieu }));
        }
        [HttpPut]
        [Route("CapNhatKieu")]

        public async Task<IActionResult> CapNhatKieu( PTD_Kieu kieu)
        {
            return HandleResult(await Mediator.Send(new CapNhat.Command { Entity = kieu }));
        }
        [HttpPost]
        [Route("ThemMoiKieu")]
        public async Task<IActionResult> ThemMoiKieu( PTD_Kieu kieu)
        {
            return HandleResult(await Mediator.Send(new ThemMoi.Command { Entity = kieu }));
        }
        [HttpGet]
        [Route("ThongTinChiTiet")]
        [AllowAnonymous]
        public async Task<IActionResult> ThongTinChiTiet(int ID )
        {

            return HandleResult(await Mediator.Send(new ChiTiet.Query { ID = ID }));

        }
        [HttpDelete]
        [Route("XoaKieu")]
        public async Task<IActionResult> XoaKieu(int Id)
        {

            return HandleResult(await Mediator.Send(new Xoa.Command { ID = Id }));
        }
    }
}
