using API.Controllers;
using Application.ChungNhanKiemDinh;
using Application.Core;
using Application.DonViDo;
using Application.PhuongTienDo;
using Application.TepKemTheo;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace PhuongTienDoNhom02.ApiController
{
    
    public class PhuongTienDoApiController : BaseApiController
    {
        public PhuongTienDoApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("DanhSachPhuongTienDo")]
        public async Task<IActionResult> DanhSachPhuongTienDo() 
        {
            PTD_PhuongTienDo ptd = new PTD_PhuongTienDo();
            return HandleResult(await Mediator.Send(new GetAllPhuongTienDo.Query {  PhuongTienDo = ptd }));
        }
        [HttpPut]
        [Route("CapNhatPhuongTienDo")]

        public async Task<IActionResult> CapNhatPhuongTienDo( PTD_PhuongTienDo ptd)
        {


            return HandleResult(await Mediator.Send(new EditPhuongTienDo.Command { PhuongTienDo = ptd }));

        }

        [HttpPost]
        [Route("ThemMoiPhuongTienDo")]
        public async Task<IActionResult> ThemMoiPhuongTienDo( PTD_PhuongTienDo ptd)
        {


            return HandleResult(await Mediator.Send(new Application.PhuongTienDo.Insert.Command { PhuongTienDo = ptd }));
        }
        [HttpGet]
        [Route("ThongTinChiTiet")]
        [AllowAnonymous]
        public async Task<IActionResult> ThongTinChiTiet(int Id)
        {

            return HandleResult(await Mediator.Send(new Get.Query { ID = Id }));

        }
        [HttpDelete]
        [Route("XoaPhuongTienDo")]
        public async Task<IActionResult> XoaPhuongTienDo(int ID)
        {
            
            return HandleResult(await Mediator.Send(new Application.PhuongTienDo.Delete.Command { ID = ID }));
        }
    }
}
