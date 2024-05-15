using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Core;
using Domain;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;

namespace Application.NhanVienKDHCTN
{
    public class CapNhatDuongDanNhanVienKDHCTN
    {
        public class Command : IRequest<Result<PTD_NhanVienKDHCTN>>
        {
            public Guid MaNhanVien;
        }

        public class Handler : IRequestHandler<Command, Result<PTD_NhanVienKDHCTN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_NhanVienKDHCTN>> Handle(Command request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMANHANVIEN", request.MaNhanVien);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_NhanVienKDHCTN>("SP_NHANVIENKDHCTN_CAPNHAT", parameter, commandType: CommandType.StoredProcedure);
                        return Result<PTD_NhanVienKDHCTN>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<PTD_NhanVienKDHCTN>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connection.CloseAsync();
                    }
                }
            }
        }
    }
}
