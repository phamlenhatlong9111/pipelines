using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Core;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Persistence
{
    public class Result1<T>
    {
        public bool IsSuccess { get; set; }
        public T Value { get; set; }

        public string Error { get; set; }
        public static Result1<T> Success(T value) => new Result1<T> { IsSuccess = true, Value = value };
        public static Result1<T> Failure(string error) => new Result1<T> { IsSuccess = false, Error = error };
    }
    public class Add
    {
        public class Command : IRequest<Result1<NhanSu>>
        {
            public NhanSu NhanSu { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result1<NhanSu>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result1<NhanSu>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PDepartmentId", request.NhanSu.DepartmentId);
                        parameters.Add("@PFullName", request.NhanSu.FullName);
                        parameters.Add("@PEnabled", request.NhanSu.Enabled);
                        parameters.Add("@PAvatar", request.NhanSu.Avatar);
                        parameters.Add("@POrganizationId", request.NhanSu.OrganizationId);
                        parameters.Add("@PUsername", request.NhanSu.Username);
                        parameters.Add("@POrganizationName", request.NhanSu.OrganizationName);
                        parameters.Add("@PIsLeaderOrg", request.NhanSu.IsLeaderOrg);
                        parameters.Add("@PIsLeaderDep", request.NhanSu.IsLeaderDep);
                        parameters.Add("@POrganizationUniqueCode", request.NhanSu.OrganizationUniqueCode);
                        parameters.Add("@PDepartmentName", request.NhanSu.DepartmentName);
                        parameters.Add("@POrgTitle", request.NhanSu.OrgTitle);
                        parameters.Add("@PDepTitle", request.NhanSu.DepTitle);
                        parameters.Add("@PDongBo", 0);
                        parameters.Add("@PMatKhau", request.NhanSu.MatKhau);
                        var result = await connettion.QueryFirstOrDefaultAsync<NhanSu>("SP_NHANVIEN_PHONGBAN_THEMMOI", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Thêm mới nhân viên không thành công");
                        }
                        return Result1<NhanSu>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result1<NhanSu>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connettion.CloseAsync();
                    }
                }
            }
        }
    }
    public class Seed
    {
        private static IMediator _mediator;
        private static UserManager<AppUser> _userManager;
        private static RoleManager<AppRole> _roleManager;
        private static DataContext _context;


        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IMediator mediator)
        {
            _mediator = mediator;
            _userManager = userManager;
            _roleManager = roleManager;
            _context = context;
            if (!_roleManager.Roles.Any())
            {
                var roleList = new List<AppRole>
                {
                    new AppRole
                    {
                        Name = "Host"
                    },
                    new AppRole
                    {
                        Name = "Admin"
                    }
                };

                foreach (var role in roleList)
                {
                    await _roleManager.CreateAsync(role);
                }
            }

            if (!_userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "admin",
                        UserName = "admin",
                        Email = "admin@email.com",
                        IsEnabled = true
                    }
                };

                foreach(var user in users)
                {
                    NhanSu NhanSu = new NhanSu();
                    NhanSu.DepartmentId = null;
                    NhanSu.FullName = "Admin";
                    NhanSu.Enabled = true;
                    NhanSu.Avatar = null;
                    NhanSu.OrganizationId = null;
                    NhanSu.OrganizationName = null;
                    NhanSu.Username = "admin";
                    NhanSu.DepartmentName = null;
                    NhanSu.OrganizationUniqueCode = null;
                    NhanSu.IsLeaderDep = null;
                    NhanSu.IsLeaderOrg = null;
                    NhanSu.DongBo = false;
                    NhanSu.Quyen = null;
                    NhanSu.MatKhau = "Abc@123";

                    var insertNhanVien = await _mediator.Send(new Add.Command { NhanSu = NhanSu });
                    if (insertNhanVien.IsSuccess)
                        //var insertNhanVien = await Mediator.Send(new Add.Command { NhanSu = nhansu });
                    await _userManager.CreateAsync(user, "Abc@123");
                    await _userManager.AddToRoleAsync(user, "Admin");
                }
            }
            await _context.SaveChangesAsync();
        }
    }
}
