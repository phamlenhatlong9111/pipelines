using API.Controllers;
using Application.Core;
using Application.HT_ToChucQuanLy;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class HT_ToChucQuanLyApiControllercs : BaseApiController
    {
        public HT_ToChucQuanLyApiControllercs(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("DanhSachToChucHeThong")]
        [AllowAnonymous]

        public async Task<Result<IEnumerable<HT_ToChucQuanLyModel>>> DanhSachToChucHeThong(Guid? MaToChuc)
        {
            return await Mediator.Send(new GetAll.Query { MaToChuc = MaToChuc });
        }
        [Authorize]
        [HttpPost]
        [Route("ThemMoiToChucHeThong")]
        public async Task<Result<HT_ToChucQuanLyModel>> ThemMoiToChucHeThong(HT_ToChucQuanLyModel HT_ToChucQuanLy)
        {
            return await Mediator.Send(new Add.Command { HT_ToChucQuanLy = HT_ToChucQuanLy });
        }
        [Authorize]
        [HttpPut]
        [Route("CapNhatToChucHeThong")]
        public async Task<Result<HT_ToChucQuanLyModel>> CapNhatToChucHeThong(HT_ToChucQuanLyModel HT_ToChucQuanLy)
        {
            return await Mediator.Send(new Update.Command { HT_ToChucQuanLy = HT_ToChucQuanLy });
        }
        [Authorize]
        [HttpDelete]
        [Route("XoaToChucHeThong")]
        public async Task<Result<int>> XoaToChucHeThong(Guid MaToChuc)
        {
            return await Mediator.Send(new Delete.Command { MaToChuc = MaToChuc });
        }
    }
}
