using API.Controllers;
using Application.Core;
using Application.DonViDo;
using Application.PhuongTienDo;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom02.ApiController
{

    public class DonViDoApiController : BaseApiController
    {
        
        public DonViDoApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
            
        }
        [HttpGet]
        [Route("DanhSachDonViDo")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachDonViDo()
        {
            return HandleResult(await Mediator.Send(new DanhSachDonViDo.Query {  }));
        }
        [HttpGet]
        [Route("DanhSachDonViDoTheoLinhVuc")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachDonViDoTheoLinhVuc(int LinhVucID)
        {
            return HandleResult(await Mediator.Send(new DanhSachDonViDoTheoLinhVuc.Query {LinhVuc = LinhVucID }));
        }
        [HttpPut]
        [Route("CapNhatDonViDo")]

        public async Task<IActionResult> CapNhatDonViDo( PTD_DonViDo dvd)
        {
            return HandleResult(await Mediator.Send(new ChinhSua.Command { DonViDo = dvd }));
        }
        [HttpPost]
        [Route("ThemMoiDonViDo")]
        public async Task<IActionResult> ThemMoiDonViDo( PTD_DonViDo dvd)
        {
            return HandleResult(await Mediator.Send(new Application.DonViDo.ThemMoi.Command { DonViDo = dvd }));
        }
        [HttpGet]
        [Route("ThongTinChiTiet")]
        [AllowAnonymous]
        public async Task<IActionResult> ThongTinChiTiet(int Id)
        {

            return HandleResult(await Mediator.Send(new ThongTinChiTiet.Query { Id = Id }));

        }
        [HttpDelete]
        [Route("XoaDonViDo")]
        public async Task<IActionResult> XoaDonViDo(int ID)
        {

            return HandleResult(await Mediator.Send(new Xoa.Command { ID = ID }));
        }
    }
}
