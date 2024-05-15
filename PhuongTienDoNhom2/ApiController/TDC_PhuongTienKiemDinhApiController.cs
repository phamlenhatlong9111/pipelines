using API.Controllers;
using Application.Core;
using Application.PhuongTienKiemDinh;
using Application.QuyTrinhApDung;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PhuongTienDoNhom2.ApiController
{
    public class TDC_PhuongTienKiemDinhApiController : BaseApiController
    {
        public TDC_PhuongTienKiemDinhApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("danhsach")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>> DanhSachPhuongTienKiemDinh()
        {
            return await Mediator.Send(new DanhSachPhuongTienKiemDinh.Query { });
        }

        [HttpGet]
        [Route("danhsachtheotochuc")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>> DanhSachPhuongTienKiemDinhTheoToChuc(Guid MaToChuc)
        {
            return await Mediator.Send(new DanhSachPhuongTienKiemDinhTheoToChuc.Query {MaToChuc = MaToChuc });
        }

        [HttpGet]
        [Route("chitiet")]
        public async Task<Result<PTD_PhuongTienKiemDinh>> ChiTietPhuongTienKiemDinh(int MaPhuongTien)
        {
            return await Mediator.Send(new ChiTietPhuongTienKiemDinh.Query { MaPhuongTien = MaPhuongTien });
        }

        [HttpPost]
        [Route("themmoi")]
        public async Task<IActionResult> ThemMoiPhuongTienKiemDinh([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_PhuongTienKiemDinhAddModel Entity = JsonConvert.DeserializeObject<PTD_PhuongTienKiemDinhAddModel>(_request.data);
            const string vanbanPath = "wwwroot\\upload\\phuongtienkiemdinh";
            const string pathdb = "upload\\phuongtienkiemdinh";
            var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
            Entity.TepKemTheo = uploadedFiles;
            var result = await Mediator.Send(new ThemMoiPhuongTienKiemDinh.Command { Entity = Entity});
            return HandleResult(result);
        }

        [HttpPut]
        [Route("capnhat")]
        public async Task<IActionResult> CapNhatPhuongTienKiemDinh([FromForm] RequestUploadFileUpdateSingle _request)
        {
            PTD_PhuongTienKiemDinh Entity = JsonConvert.DeserializeObject<PTD_PhuongTienKiemDinh>(_request.data);
            if (_request.file != null)
            {
                const string vanbanPath = "wwwroot\\upload\\phuongtienkiemdinh";
                const string pathdb = "upload\\phuongtienkiemdinh";
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, vanbanPath, pathdb);
                Entity.TepKemTheo = uploadedFiles;
                var result = await Mediator.Send(new CapNhatPhuongTienKiemDinh.Command { Entity = Entity });
                return HandleResult(result);
            }
            else
            {
                return HandleResult(await Mediator.Send(new CapNhatPhuongTienKiemDinh.Command { Entity = Entity }));
            }
            
           
        }

        [HttpPut]
        [Route("capnhatduongdan")]
        public async Task<IActionResult> CapNhatDuongDanPhuongTienKiemDinh(int MaPhuongTien)
        {
            var resultPhuongTienKiemDinh = await Mediator.Send(new ChiTietPhuongTienKiemDinh.Query { MaPhuongTien = MaPhuongTien });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultPhuongTienKiemDinh.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return HandleResult(await Mediator.Send(new CapNhatDuongDanPhuongTienKiemDinh.Command { MaPhuongTien = MaPhuongTien }));
            }
            return null;
        }

        [HttpDelete]
        [Route("xoa")]
        public async Task<Result<int>> XoaPhuongTienKiemDinh(int MaPhuongTien)
        {
            var resultPhuongTienKiemDinh = await Mediator.Send(new ChiTietPhuongTienKiemDinh.Query { MaPhuongTien = MaPhuongTien });
            var quyTrinhPath = "wwwroot";
            string fullPath = resultPhuongTienKiemDinh.Value.TepKemTheo;
            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(quyTrinhPath, fullPath);
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
                return await Mediator.Send(new XoaPhuongTienKiemDinh.Command { MaPhuongTien = MaPhuongTien });
            }
            return await Mediator.Send(new XoaPhuongTienKiemDinh.Command { MaPhuongTien = MaPhuongTien });
        }
    }
}
