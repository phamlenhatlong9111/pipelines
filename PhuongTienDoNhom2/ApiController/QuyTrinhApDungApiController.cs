using API.Controllers;
using Application.Core;
using Application.QuyTrinhApDung;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace PhuongTienDoNhom02.ApiController
{
    
    public class QuyTrinhApDungApiController : BaseApiController
    {
        public QuyTrinhApDungApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        //[HttpGet]
        //[Route("DanhSachQuyTrinhApDung")]
        //[AllowAnonymous]
        //public async Task<ActionResult<Result<IEnumerable<PTD_QuyTrinhApDung>>>> DanhSachQuyTrinhApDung()
        //{
        //    PTD_QuyTrinhApDung qtap = new PTD_QuyTrinhApDung();
        //    return await Mediator.Send(new GetAllQuaTrinh.Query { QuyTrinhApDung = qtap });
        //}
        //[HttpPut]
        //[Route("CapNhatQuyTrinhApDung")]

        //public async Task<ActionResult<Result<PTD_QuyTrinhApDung>>> CapNhatQuyTrinhApDung( PTD_QuyTrinhApDung qtap)
        //{
        //    return await Mediator.Send(new Edit.Command { Entity = qtap });
        //}
        //[HttpPost]
        //[Route("ThemMoiQuyTrinhApDung")]
        //public async Task<ActionResult<Result<PTD_QuyTrinhApDung>>> ThemMoiQuyTrinhApDung( PTD_QuyTrinhApDung qtap)
        //{
        //    return await Mediator.Send(new Insert.Command { Entity = qtap });
        //}
        //[HttpGet]
        //[Route("ThongTinChiTiet")]
        //[AllowAnonymous]
        //public async Task<ActionResult<Result<PTD_QuyTrinhApDung>>> ThongTinChiTiet(int Id)
        //{

        //    return await Mediator.Send(new Application.QuyTrinhApDung.Get.Query { ID = Id });

        //}
        //[HttpDelete]
        //[Route("XoaQuyTrinhApDung")]
        //public async Task<IActionResult> XoaQuyTrinhApDung(int Id)
        //{

        //    return HandleResult(await Mediator.Send(new Delete.Command { ID = Id }));
        //}
    }
}
