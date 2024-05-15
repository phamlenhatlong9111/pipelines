using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using System.Security.Cryptography;
using System.Data;

namespace Application.JwtCommon
{
    public class GenerateToken
    {
        public class Command : IRequest<Result<StringToken>>
        {
            public GetToken Entity { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<StringToken>>
        {
            private readonly IConfiguration _configuration;
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly ClaimsPrincipal _user;

            public Handler(IConfiguration configuration, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IHttpContextAccessor httpContextAccessor)
            {
                _configuration = configuration;
                _userManager = userManager;
                _roleManager = roleManager;
                _user = httpContextAccessor.HttpContext.User;
            }

            public async Task<Result<StringToken>> Handle(Command request, CancellationToken cancellationToken)
            
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    
                    var user = new AppUser();
                    var roles = new List<string>();
                    if (_user.Identity.IsAuthenticated)
                    {
                        string userId = _user.FindFirstValue(ClaimTypes.NameIdentifier);
                        user = await _userManager.FindByIdAsync(userId);
                        roles = (await _userManager.GetRolesAsync(user)).ToList();
                    }
                    else 
                    {
                        user = await _userManager.FindByNameAsync(request.Entity.Username);
                        if (user != null)
                        {
                            bool isCheck = await _userManager.CheckPasswordAsync(user, request.Entity.PassWord);
                            if (isCheck)
                            {
                                roles = (await _userManager.GetRolesAsync(user)).ToList();
                            }
                            else
                            {
                                return Result<StringToken>.Failure("Lỗi mật khẩu không chính xác");
                            }

                        }
                        else
                        {
                            return Result<StringToken>.Failure("Lỗi tên đăng nhập không chính xác");
                        }
                    }
                    /*bool isCheckUser = await _userManager.CheckPasswordAsync(user, request.Entity.PassWord);
                    if (isCheckUser == false)*/
                        
                    
                    DynamicParameters parameters = new DynamicParameters();
                    parameters.Add("@TENDANGNHAP", user.UserName);
                    //var userdn = await connettion.QueryFirstOrDefaultAsync<QLCX_NhanVien>("SP_GetUserByTenDangNhap", parameters, commandType: System.Data.CommandType.StoredProcedure);
                    Claim[] claimsIdentity = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                        new Claim(JwtRegisteredClaimNames.Email, user.Email),
                        new Claim(JwtRegisteredClaimNames.Jti, user.Id.ToString()),

                        new Claim(ClaimTypes.Name, user.UserName),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Sid, user.Id.ToString()),
                        new Claim(ClaimTypes.Version, DateTime.Now.ToString()),
                        new Claim(ClaimTypes.Role, string.Join(",", roles)),
                    };

                    //Generate Access Token
                    var issuer = _configuration["Tokens:Issuer"];
                    var audience = _configuration["Tokens:Audience"];
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(claimsIdentity),
                        Expires = DateTime.UtcNow.AddHours(24),
                        Audience = audience,
                        Issuer = issuer,
                        SigningCredentials = credentials,
                    };
                    var jwtTokenHandler = new JwtSecurityTokenHandler();
                    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
                    var jwtToken = jwtTokenHandler.WriteToken(token);
                    //string jwtToken = this.GenerateAccessToken(claimsIdentity);
                    List<RoleModel> lst = new List<RoleModel>();
                    foreach (var i in roles)
                    {
                        if (i == "NhanViec")
                        {
                            lst = _roleManager.Roles.Where(ele => string.Compare(ele.Name, "GiaoViec") != 0 && string.Compare(ele.Name, "Admin") != 0).Select(ele => new RoleModel { Id = ele.Id.ToString(), Name = ele.Name }).ToList();
                        }
                        else if (i == "GiaoViec")
                        {
                            lst = _roleManager.Roles.Where(ele => string.Compare(ele.Name, "NhanViec") != 0 && string.Compare(ele.Name, "Admin") != 0).Select(ele => new RoleModel { Id = ele.Id.ToString(), Name = ele.Name }).ToList();
                        }
                        else if (i == "Admin")
                        {
                            lst = _roleManager.Roles.Where(ele => string.Compare(ele.Name, "NhanViec") != 0 && string.Compare(ele.Name, "GiaoViec") != 0).Select(ele => new RoleModel { Id = ele.Id.ToString(), Name = ele.Name }).ToList();
                        }
                    }

                    StringToken getToken = new StringToken();
                    getToken.Token = jwtToken;
                    //getToken.HopThu = userdn.HopThu;
                    //getToken.AnhDaiDien = userdn.AnhDaiDien;
                    //getToken.TenDangNhap = userdn.TenDangNhap;
                    //getToken.TrangThai = userdn.TrangThai;
                    //getToken.DiaChi = userdn.DiaChi;
                    //getToken.HoTen = userdn.HoTen;
                    //getToken.DienThoai = userdn.DienThoai;
                    //getToken.MaNhom = userdn.MaNhom;
                    //getToken.MatKhau = userdn.MatKhau;
                    //getToken.VaiTro = userdn.VaiTro;
                    //getToken.ID = userdn.ID;
                    getToken.Roles = lst;
                    //getToken.TenNhom = userdn.TenNhom;
                    return Result<StringToken>.Success(getToken);
                }
            }
        }
    }
}
