using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;

using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Application.QuocGia
{
    public class DanhSach
    {
        public class Query : IRequest<Result<List<PTD_QuocGia>>>
        {
            public string? TuKhoa { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<PTD_QuocGia>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;
            private readonly IUserStore<AppUser> _userStore;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IConfiguration configuration, IUserStore<AppUser> userStore, UserManager<AppUser> userManager)
            {
                _context = context;
                _configuration = configuration;
                _userStore = userStore;
                _userManager = userManager;
            }
            public async Task<Result<List<PTD_QuocGia>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {

                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PTUKHOA", request.TuKhoa);

                        var result = await connettion.QueryAsync<PTD_QuocGia>("TDC_Gets_QuocGia", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        List<PTD_QuocGia> qgs = new List<PTD_QuocGia>();
                        /*AppUser user1 = new AppUser
                        {
                            Email = "admin@gmail.com",
                            DisplayName = "Admin",
                            UserName = "admin",
                            GroupId = 1,
                            ChucDanhId = 1,

                        };
                        // Tạo user đăng nhập
                        await _userStore.SetUserNameAsync(user1, "admin", CancellationToken.None);
                        var result1 = await _userManager.CreateAsync(user1, "Abc@123");*/
                        foreach (var item in result)
                        {
                            PTD_QuocGia qg = new PTD_QuocGia();
                            qg.MaQuocGia = item.MaQuocGia.Trim();
                            qg.TenQuocGia = item.TenQuocGia;
                            qgs.Add(qg);    
                        }
                        return Result<List<PTD_QuocGia>>.Success(qgs.ToList());
                    }
                    catch (Exception ex)
                    {
                        return Result<List<PTD_QuocGia>>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connettion.CloseAsync();
                    }
                }
            }
        }
    }
}
