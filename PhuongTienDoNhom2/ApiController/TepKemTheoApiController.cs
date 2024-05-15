using API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.TepKemTheo;
using Domain;
using Application.Core;

namespace QuanLyCayXanh.ApiController
{
    public class TepKemTheoApiController : BaseApiController
    {
        public TepKemTheoApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpGet]
        [Route("danhsachfiles")]
        [AllowAnonymous]
        public async Task<IActionResult> DanhSachFiles()
        {
            return HandleResult(await Mediator.Send(new DanhSachFiles.Query {}));
        }
        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<TepKemTheo>>> DanhSachFile (Guid IDDoiTuong)
        {
            return await Mediator.Send(new DanhSachFile.Query { IdDoiTuong = IDDoiTuong });
        }

        [HttpGet]
        [Route("chitietnhanvien")]
        [AllowAnonymous]
        public async Task<IActionResult> ChiTietNhanVien (string TenDangNhap)
        {
            return HandleResult(await Mediator.Send(new GetNhanVien.Query { tendangnhap = TenDangNhap }));
        }

        [HttpGet]
        [Route("chitiettepkemtheo")]
        [AllowAnonymous]
        public async Task<Result<TepKemTheo>> ChiTietTepKemTheo (int ID)
        {
            return await Mediator.Send(new ChiTietTepKemTheoByID.Query { MaTep = ID });
        }

        [HttpPost]
        [Route("themoitep")]
        public async Task<IActionResult> ThemMoiFile (TepKemTheo Entity)
        {
            return HandleResult(await Mediator.Send(new Insert.Command { Entity = Entity }));
        }

        //[HttpPost]
        //[Route("ghidetep")]
        //public async Task<IActionResult> GhiDeFile (QLCX_TepKemTheo Entity)
        //{
        //    return HandleResult(await Mediator.Send(new OverWrite.Command { Entity = Entity }));   
        //}

        [HttpDelete]
        [Route("xoa")]
        public async Task<IActionResult> XoaFile (int ID)
        {
            var resultTepKemTheo = await Mediator.Send(new ChiTietTepKemTheoByID.Query { MaTep = ID });
            var vanbanPath = "wwwroot";
            string fullPath = resultTepKemTheo.Value.NoiLuuTru;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(vanbanPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    // Nếu tồn tại, xóa file cũ
                    System.IO.File.Delete(oldFilePath);
                }
            }

            return HandleResult(await Mediator.Send(new Delete.Command { ID = ID }));
        }
    }
}
