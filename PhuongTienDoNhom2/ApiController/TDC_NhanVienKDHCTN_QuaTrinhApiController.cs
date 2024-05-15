using API.Controllers;
using Application.Core;
using Application.NhanVienKDHCTNQuaTrinh;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_NhanVienKDHCTN_QuaTrinhApiController : BaseApiController
    {
        public TDC_NhanVienKDHCTN_QuaTrinhApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsachquatrinhdaotao")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>> DanhSachQuaTrinhDaoTao(Guid MaNhanVien)
        {
            return await Mediator.Send(new DanhSachQuaTrinhDaoTao.Query { MaNhanVien = MaNhanVien });
        }

        [HttpGet]
        [Route("danhsachquatrinhcongtac")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>> DanhSachQuaTrinhCongTac(Guid MaNhanVien)
        {
            return await Mediator.Send(new DanhSachQuaTrinhCongTac.Query { MaNhanVien = MaNhanVien });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<Result<PTD_NhanVienKDHCTNQuaTrinh>> ThemMoiQuaTrinh(PTD_NhanVienKDHCTNQuaTrinhAddModel Entity)
        {
            return await Mediator.Send(new ThemMoiQuaTrinh.Command { Entity = Entity });
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<Result<PTD_NhanVienKDHCTNQuaTrinh>> CapNhatQuaTrinh(PTD_NhanVienKDHCTNQuaTrinh Entity)
        {
            return await Mediator.Send(new CapNhatQuaTrinh.Command { Entity = Entity });
        }

        [HttpDelete]
        [Route("xoaquatrinh")]
        public async Task<Result<int>> XoaQuaTrinh(int MaQuaTrinh)
        {
            return await Mediator.Send(new XoaQuaTrinh.Command { MaQuaTrinh = MaQuaTrinh });
        }
    }
}
