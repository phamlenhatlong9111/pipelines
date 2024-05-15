
using Application.Core;
using Application.JwtCommon;
//using Application.NhiemVu;
using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace QuanLyCayXanh.ApiController
{
    public class JwtCommonController : BaseApiController
    {
        public JwtCommonController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpPost]
        [AllowAnonymous]
        [Route("gettoken")]
        public async Task<ActionResult<Result<StringToken>>> GetAccessToken([FromForm] GetToken tendangnhap)
        {            
            return await Mediator.Send(new GenerateToken.Command { Entity = tendangnhap });
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin,GiaoViec,NhanViec")]
        [Route("changepassword")]
        public async Task<ActionResult<Result<ResultPassWord>>> ChangePassword([FromForm] RequestChangePassWord user)
        {
            var username = ((ClaimsIdentity)User.Identity).Name;
            user.Username = username;
            return await Mediator.Send(new ChangePassword.Command { Entity = user });
        }
    }
}

