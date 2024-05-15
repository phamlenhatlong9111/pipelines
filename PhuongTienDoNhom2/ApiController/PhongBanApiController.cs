using Application.Core;
using Application.PhongBan;
using API.Controllers;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PhuongTienDoNhom2.ApiController
{
    public class PhongBanApiController :BaseApiController
    {
        public PhongBanApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }

        [HttpGet]
        [Route("DanhSachPhongBan")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<PhongBanModel>>> DanhSachPhongBan(string DepartmentName)
        {
            return await Mediator.Send(new GetAll.Query { DepartmentName = DepartmentName });
        }
        [HttpPost]
        [Route("ThemMoiPhongBan")]
        public async Task<Result<PhongBanModel>> ThemMoiPhongBan(PhongBanModel PhongBan)
        {
            return await Mediator.Send(new Add.Command { PhongBan = PhongBan });
        }
        [HttpPut]
        [Route("CapNhatPhongBan")]
        public async Task<Result<PhongBanModel>> CapNhatPhongBan(PhongBanModel PhongBan)
        {
            return await Mediator.Send(new Update.Command { PhongBan = PhongBan });
        }
        [HttpDelete]
        [Route("XoaPhongBan")]
        public async Task<Result<int>> XoaPhongBan(Guid DepartmentId)
        {
            return await Mediator.Send(new Xoa.Command { DepartmentId = DepartmentId });
        }
    }

   
}
