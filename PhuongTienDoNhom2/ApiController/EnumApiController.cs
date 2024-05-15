using API.Controllers;
using Application.Core;
using Application.Enum;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class EnumApiController : BaseApiController
    {
        public EnumApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        #region EnumLoaiGiayToPhapLy
        [HttpGet]
        [Route("danhsachgiaytophaply")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<EnumModel>>> DanhSachLoaiGiayToPhapLy()
        {
            return await Mediator.Send(new DanhSachLoaiGiayToPhapLy.Query { });
        }
        #endregion

        #region EnumLinhVuc
        [HttpGet]
        [Route("danhsachlinhvuc")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<EnumModel>>> DanhSachLinhVuc()
        {
            return await Mediator.Send(new DanhSachLichVuc.Query { });
        }
        #endregion

        #region EnumLoaiChungChi
        [HttpGet]
        [Route("danhsachloaichungchi")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<EnumModel>>> DanhSachLoaiChungChi()
        {
            return await Mediator.Send(new DanhSachLoaiChungChi.Query { });
        }
        #endregion


    }
}
