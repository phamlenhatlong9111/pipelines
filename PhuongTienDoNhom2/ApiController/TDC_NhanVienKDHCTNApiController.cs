using API.Controllers;
using Application.Core;
using Application.NhanVienKDHCTN;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_NhanVienKDHCTNApiController : BaseApiController
    {
        public TDC_NhanVienKDHCTNApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_NhanVienKDHCTN>>> DanhSachNhanVien()
        {
            return await Mediator.Send(new DanhSachNhanVienKDHCTN.Query { });
        }

        [HttpGet]
        [Route("chitiet")]
        public async Task<Result<PTD_NhanVienKDHCTN>> ChiTietNhanVien(Guid MaNhanVien)
        {
            return await Mediator.Send(new ChiTietNhanVienKDHCTN.Query { MaNhanVien = MaNhanVien });
        }

        [HttpGet]
        [Route("danhsachtheotochuc")]
        public async Task<Result<IEnumerable<PTD_NhanVienKDHCTN>>> DanhSachNhanVienTheoToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new DanhSachNhanVienKDHCTNTheoToChuc.Query { MaToChuc =  MaToChuc });
        }

        [HttpPost]
        [Route("kiemtra")]
        public async Task<Result<int>> KiemTraNhanVien(PTD_NhanVienKDHCTNCheckModel Entity)
        {
            return await Mediator.Send(new KiemTraNhanVienKDHCTN.Command { Entity = Entity });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<IActionResult> ThemMoiNhanVien([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_NhanVienKDHCTNAddModel Entity = JsonConvert.DeserializeObject<PTD_NhanVienKDHCTNAddModel>(_request.data);
            const string vanbanPath = "wwwroot\\upload\\nhanvienkdhctn";
            const string pathdb = "upload\\nhanvienkdhctn";
            var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
            Entity.TepKemTheo = uploadedFiles;
            var result = await Mediator.Send(new ThemMoiNhanVienKDHCTN.Command { Entity = Entity });
            return HandleResult(result);
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<IActionResult> CapNhatNhanVien([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_NhanVienKDHCTN Entity = JsonConvert.DeserializeObject<PTD_NhanVienKDHCTN>(_request.data);
            if(_request.file != null)
            {
                const string vanbanPath = "wwwroot\\upload\\nhanvienkdhctn";
                const string pathdb = "upload\\nhanvienkdhctn";
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
                Entity.TepKemTheo = uploadedFiles;
                var result = await Mediator.Send(new CapNhatNhanVienKDHCTN.Command { Entity = Entity });
                return HandleResult(result);
            }
            else
            {
                return HandleResult(await Mediator.Send(new CapNhatNhanVienKDHCTN.Command { Entity = Entity }));
            }
           
        }

        [HttpPut]
        [Route("capnhatduongdan")]
        public async Task<IActionResult> CapNhatDuongDan(Guid MaNhanVien)
        {
            var resultNhanVien = await Mediator.Send(new ChiTietNhanVienKDHCTN.Query { MaNhanVien = MaNhanVien });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultNhanVien.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return HandleResult(await Mediator.Send(new CapNhatDuongDanNhanVienKDHCTN.Command { MaNhanVien = MaNhanVien }));
            }
            return null;
        }

        [HttpDelete]
        [Route("xoa")]
        public async Task<Result<int>> XoaNhanVien(Guid MaNhanVien)
        {
            var resultNhanVien = await Mediator.Send(new ChiTietNhanVienKDHCTN.Query { MaNhanVien = MaNhanVien });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultNhanVien.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return await Mediator.Send(new XoaNhanVienKDHCTN.Command { MaNhanVien = MaNhanVien });
            }
            return await Mediator.Send(new XoaNhanVienKDHCTN.Command { MaNhanVien = MaNhanVien });
        }
    }
}
