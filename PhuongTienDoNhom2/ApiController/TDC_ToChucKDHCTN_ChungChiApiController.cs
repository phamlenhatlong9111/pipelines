using API.Controllers;
using Application.Core;
using Application.QuyTrinhApDung;
using Application.ToChucKDHCTNChungChi;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_ToChucKDHCTN_ChungChiApiController : BaseApiController
    {
        public TDC_ToChucKDHCTN_ChungChiApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>> DanhSachChungChi()
        {
            return await Mediator.Send(new DanhSachChungChi.Query { });
        }

        [HttpGet]
        [Route("danhsachtheotochuc")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>> DanhSachChungChiTheoToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new DanhSachChungChiTheoToChuc.Query { MaToChuc = MaToChuc });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<IActionResult> ThemMoiChungChi([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_ToChucKDHCTNChungChiAddModel Entity = JsonConvert.DeserializeObject<PTD_ToChucKDHCTNChungChiAddModel>(_request.data);
            const string vanbanPath = "wwwroot\\upload\\chungchi";
            const string pathdb = "upload\\chungchi";
            var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
            Entity.TepKemTheo = uploadedFiles;
            var result = await Mediator.Send(new ThemMoiChungChi.Command { Entity = Entity });
            return HandleResult(result);
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<IActionResult> CapNhatChungChi([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_ToChucKDHCTNChungChi Entity = JsonConvert.DeserializeObject<PTD_ToChucKDHCTNChungChi>(_request.data);
            if (_request.file != null)
            {
                const string vanbanPath = "wwwroot\\upload\\chungchi";
                const string pathdb = "upload\\chungchi";
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
                Entity.TepKemTheo = uploadedFiles;
                var result = await Mediator.Send(new CapNhatChungChi.Command { Entity = Entity });
                return HandleResult(result);
            }
            else
            {
                return HandleResult(await Mediator.Send(new CapNhatChungChi.Command { Entity = Entity }));
            }


        }

        [HttpPut]
        [Route("capnhatduongdan")]
        public async Task<IActionResult> CapNhatDuongDanChungChi(int MaChungChi)
        {
            var resultChungChi = await Mediator.Send(new ChiTietChungChi.Query { MaChungChi = MaChungChi });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultChungChi.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return HandleResult(await Mediator.Send(new CapNhatDuongDanChungChi.Command { MaChungChi = MaChungChi }));
            }
            return null;
        }

        [HttpDelete]
        [Route("xoa")]
        public async Task<Result<int>> XoaChungChi(int MaChungChi)
        {
            var resultChungChi = await Mediator.Send(new ChiTietChungChi.Query { MaChungChi = MaChungChi });
            var chungChiPath = "wwwroot";
            string fullPath = resultChungChi.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(chungChiPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return await Mediator.Send(new XoaChungChi.Command { MaChungChi = MaChungChi });
            }
            return await Mediator.Send(new XoaChungChi.Command { MaChungChi = MaChungChi });
        }
    }
}
