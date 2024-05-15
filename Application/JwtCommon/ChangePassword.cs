using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Application.JwtCommon
{
    public class ChangePassword
    {
        public class Command : IRequest<Result<ResultPassWord>>
        {
            public RequestChangePassWord Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<ResultPassWord>>
        {
            private readonly IConfiguration _configuration;
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly ClaimsPrincipal _user;
            private readonly SignInManager<AppUser> _signInManager;

            public Handler(IConfiguration configuration, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IHttpContextAccessor httpContextAccessor, SignInManager<AppUser> signInManager)
            {
                _configuration = configuration;
                _userManager = userManager;
                _roleManager = roleManager;
                _user = httpContextAccessor.HttpContext.User;
                _signInManager = signInManager;
            }

            public async Task<Result<ResultPassWord>> Handle(Command request, CancellationToken cancellationToken)

            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    var user = new AppUser();
                    var roles = new List<string>();
                    if(request.Entity == null)
                    {                        
                        return Result<ResultPassWord>.Failure("Không có dữ liệu"); 
                    }

                    user = await _userManager.FindByNameAsync(request.Entity.Username);
                    if(user == null)
                    {                        
                        return Result<ResultPassWord>.Failure("Không tìm thấy user");
                    }
                    var checkOldPassword = await _signInManager.PasswordSignInAsync(user.UserName, request.Entity.PassWordOld, false, false);
                    if (checkOldPassword.Succeeded == false) {
                        
                        return Result<ResultPassWord>.Failure("Mật khẩu cũ không chính xác vui lòng nhập lại");
                    }
                    if(string.Equals(request.Entity.PassWordOld, request.Entity.PassWordNew))
                    {
                        return Result<ResultPassWord>.Failure("Mật khẩu mới không được trùng với mật khẩu cũ");
                    }
                    //return Result<ResultPassWord>.Success(new ResultPassWord { Notification = "Error" });
                    string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var result = await _userManager.ResetPasswordAsync(user, resetToken, request.Entity.PassWordNew);
                    //return Result<ResultPassWord>.Success(new ResultPassWord { Notification = "Error" });
                    if (result.Succeeded)
                    {
                        ResultPassWord resultPassWord = new ResultPassWord();
                        resultPassWord.Notification = "Thay đổi mật khẩu thành công";
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.Entity.Username);
                        parameters.Add("@PPASSWORD", request.Entity.PassWordNew);
                        var api = await connettion.QueryFirstOrDefaultAsync<Domain.NhanVien>("SP_NHANVIEN_CAPNHAT_THONGTIN_PASSWORD", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if(api != null)
                        {
                            return Result<ResultPassWord>.Success(resultPassWord);
                        }
                        else
                        {
                            return Result<ResultPassWord>.Failure("Thay đổi mật khẩu không thành công" );
                        }
                        
                    }
                    else
                    {
                        return Result<ResultPassWord>.Failure( "Thay đổi mật khẩu không thành công" );
                    }

                }
            }
        }
    }
}
