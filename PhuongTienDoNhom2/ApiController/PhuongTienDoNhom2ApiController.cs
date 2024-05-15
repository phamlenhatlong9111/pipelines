using API.Controllers;
using Application.Core;
using Application.PhuongTienDoNhom2;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class PhuongTienDoNhom2ApiController : BaseApiController
    {
        public PhuongTienDoNhom2ApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_PhuongTienDoNhom2>>> DanhSachPhuongTienDoNhom2()
        {
            return await Mediator.Send(new DanhSachPhuongTienDoNhom2.Query { });
        }

        [HttpPost]
        [Route("ThemMoiPhuongTienDoNhom2")]
        public async Task<IActionResult> ThemMoiPhuongTienDoNhom2([FromForm] PTD_PhuongTienDoNhom2 ptd)
        {


            return HandleResult(await Mediator.Send(new Application.PhuongTienDoNhom2.Insert.Command { PhuongTienDo = ptd }));
        }
        [HttpDelete]
        [Route("XoaPhuongTienDoNhom2")]
        public async Task<IActionResult> XoaPhuongTienDoNhom2(int ID)
        {

            return HandleResult(await Mediator.Send(new Application.PhuongTienDoNhom2.Delete.Command { ID = ID }));
        }
    }
}
