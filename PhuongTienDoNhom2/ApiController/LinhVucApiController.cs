using API.Controllers;
using Application.Core;
using Application.LinhVuc;
using Application.QuyTrinhApDung;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom02.ApiController
{

    public class LinhVucApiController : BaseApiController
    {
        public LinhVucApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("DanhSachLinhVuc")]
        [AllowAnonymous]
        public async Task<ActionResult<Result<IEnumerable<PTD_LinhVuc>>>> DanhSachQuyTrinhApDung()
        {
            PTD_LinhVuc lv = new PTD_LinhVuc();
            return await Mediator.Send(new DanhSachLinhVuc.Query { Entity = lv });
        }
        [HttpPut]
        [Route("CapNhatLinhVuc")]

        public async Task<IActionResult> CapNhatQuyTrinhApDung( PTD_LinhVuc lv)
        {
            return HandleResult(await Mediator.Send(new CapNhat.Command { Entity = lv }));
        }
        [HttpPost]
        [Route("ThemMoiLinhVuc")]
        public async Task<IActionResult> ThemMoiQuyTrinhApDung( PTD_LinhVuc lv)
        {
            return HandleResult(await Mediator.Send(new ThemMoi.Command { Entity = lv }));
        }
        [HttpGet]
        [Route("ThongTinChiTiet")]
        [AllowAnonymous]
        public async Task<IActionResult> ThongTinChiTiet(int Id)
        {

            return HandleResult(await Mediator.Send(new ChiTiet.Query { ID = Id }));

        }
        [HttpDelete]
        [Route("XoaLinhVuc")]
        public async Task<IActionResult> XoaLinhVuc(int Id)
        {

            return HandleResult(await Mediator.Send(new Xoa.Command { ID = Id }));
        }
    }
}
