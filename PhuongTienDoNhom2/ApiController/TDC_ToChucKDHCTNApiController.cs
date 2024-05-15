using API.Controllers;
using Application.Core;
using Application.ToChucKDHCTN;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_ToChucKDHCTNApiController : BaseApiController
    {
        public TDC_ToChucKDHCTNApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_ToChucKDHCTN>>> DanhSachToChucKDHCTN()
        {
            return await Mediator.Send(new TruyVanToChuc.Query { });
        }

        [HttpGet]
        [Route("chitiet")]
        [AllowAnonymous]
        public async Task<Result<PTD_ToChucKDHCTN>> ChiTietToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new ThongTinToChuc.Query { MaToChuc = MaToChuc });
        }

        [HttpPost]
        [Route("kiemtra")]
        public async Task<Result<int>> KiemTraToChuc(PTD_ToChucKDHCTNCheckModel Entity)
        {
            return await Mediator.Send(new KiemTraToChuc.Command { Entity = Entity });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<Result<PTD_ToChucKDHCTN>> ThemMoiToChuc (PTD_ToChucKDHCTNAddModel Entity)
        {
            return await Mediator.Send(new ThemMoiToChuc.Command { Entity = Entity });
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<Result<PTD_ToChucKDHCTN>> CapNhatToChuc (PTD_ToChucKDHCTN Entity)
        {
            return await Mediator.Send(new CapNhatToChuc.Command { Entity = Entity });
        }

        [HttpDelete]
        [Route("xoa")]
        public async Task<Result<int>> XoaToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new XoaToChuc.Command { MaToChuc = MaToChuc });
        }
    }
}
