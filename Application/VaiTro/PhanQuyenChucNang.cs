using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.VaiTro
{
    public class PhanQuyenChucNang
    {
        public class Command : IRequest<Result<CHUCNANG_NHANVIEN>>
        {
            public long UserId { get; set; }
            public string MenuIds { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<CHUCNANG_NHANVIEN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<CHUCNANG_NHANVIEN>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@UserId", request.UserId);
                        parameters.Add("@MenuIds", request.MenuIds);
                        var result = await connettion.QueryFirstOrDefaultAsync<CHUCNANG_NHANVIEN>("UpsertUserMenu", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Cập nhật nhân viên không thành công");
                        }
                        return Result<CHUCNANG_NHANVIEN>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<CHUCNANG_NHANVIEN>.Failure(ex.Message);
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
