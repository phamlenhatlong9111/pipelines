using API.Controllers;
using Application.Core;
using Application.QuyTrinhApDung;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_QuyTrinhApDungApiController : BaseApiController
    {
        public TDC_QuyTrinhApDungApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>> DanhSachQuyTrinhApDung()
        {
            return await Mediator.Send(new DanhSachQuyTrinh.Query { });
        }

        [HttpGet]
        [Route("danhsachtheotochuc")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>> DanhSachQuyTrinhApDungTheoToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new DanhSachQuyTrinhTheoToChuc.Query {MaToChuc = MaToChuc });
        }

        [HttpGet]
        [Route("chitiet")]
        [AllowAnonymous]
        public async Task<Result<PTD_QuyTrinhApDung>> ChiTietQuyTrinh (int MaQuyTrinh)
        {
            return await Mediator.Send(new ChiTietQuyTrinh.Query { MaQuyTrinh = MaQuyTrinh });
        }

        [HttpPost]
        [Route("kiemtra")]
        public async Task<Result<int>> KiemTraQuyTrinh(PTD_QuyTrinhApDungCheckModel Entity)
        {
            return await Mediator.Send(new KiemTraQuyTrinh.Command { Entity = Entity });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<IActionResult> ThemMoiQuyTrinh([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_QuyTrinhApDungAddModel Entity = JsonConvert.DeserializeObject<PTD_QuyTrinhApDungAddModel>(_request.data);
            const string vanbanPath = "wwwroot\\upload\\quytrinhapdung";
            const string pathdb = "upload\\quytrinhapdung";
            var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
            Entity.TepKemTheo = uploadedFiles;
            var result = await Mediator.Send(new ThemMoiQuyTrinh.Command { Entity = Entity });
            return HandleResult(result);
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<IActionResult> CapNhatQuyTrinh([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_QuyTrinhApDung Entity = JsonConvert.DeserializeObject<PTD_QuyTrinhApDung>(_request.data);
            if (_request.file != null)
            {
                const string vanbanPath = "wwwroot\\upload\\quytrinhapdung";
                const string pathdb = "upload\\quytrinhapdung";
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
                Entity.TepKemTheo = uploadedFiles;
                var result = await Mediator.Send(new CapNhatQuyTrinh.Command { Entity = Entity });
                return HandleResult(result);
            }
            else
            {
                return HandleResult(await Mediator.Send(new CapNhatQuyTrinh.Command { Entity = Entity }));
            }
          
           
        }

        [HttpPut]
        [Route("capnhatduongdan")]
        public async Task<IActionResult> CapNhatDuongDan(int MaQuyTrinh)
        {
            var resultQuyTrinh = await Mediator.Send(new ChiTietQuyTrinh.Query { MaQuyTrinh = MaQuyTrinh });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultQuyTrinh.Value.TepKemTheo;
            if(fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return HandleResult(await Mediator.Send(new CapNhatDuongDan.Command { MaQuyTrinh = MaQuyTrinh }));
            }
            return Ok();
        }

        [HttpDelete]
        [Route("xoa")]
        public async Task<Result<int>> XoaQuyTrinh (int MaQuyTrinh)
        {
            var resultQuyTrinh = await Mediator.Send(new ChiTietQuyTrinh.Query { MaQuyTrinh = MaQuyTrinh });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultQuyTrinh.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return await Mediator.Send(new XoaQuyTrinh.Command { MaQuyTrinh = MaQuyTrinh });
            }
            return await Mediator.Send(new XoaQuyTrinh.Command { MaQuyTrinh = MaQuyTrinh });
        }

    }
}
