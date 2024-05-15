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
    public class PhanQuyenVaiTro
    {
        public class Command : IRequest<Result<VAITRO_NHANVIEN>>
        {
            public long UserId { get; set; }
            public string RoleIds { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<VAITRO_NHANVIEN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<VAITRO_NHANVIEN>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@UserId", request.UserId);
                        parameters.Add("@RoleIds", request.RoleIds);
                        var result = await connettion.QueryFirstOrDefaultAsync<VAITRO_NHANVIEN>("UpsertUserRoles", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Cập nhật nhân viên không thành công");
                        }
                        return Result<VAITRO_NHANVIEN>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<VAITRO_NHANVIEN>.Failure(ex.Message);
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
