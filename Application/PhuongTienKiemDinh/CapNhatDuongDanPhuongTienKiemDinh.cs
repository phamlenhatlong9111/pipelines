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

namespace Application.PhuongTienKiemDinh
{
    public class CapNhatDuongDanPhuongTienKiemDinh
    {
        public class Command : IRequest<Result<PTD_PhuongTienKiemDinh>>
        {
            public int MaPhuongTien;
        }

        public class Handler : IRequestHandler<Command, Result<PTD_PhuongTienKiemDinh>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_PhuongTienKiemDinh>> Handle(Command request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMAPHUONGTIEN", request.MaPhuongTien);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_PhuongTienKiemDinh>("SP_PHUONGTIENKIEMDINH_CAPNHATDUONGDAN", parameter, commandType: CommandType.StoredProcedure);
                        return Result<PTD_PhuongTienKiemDinh>.Success(result);
                    }catch(Exception ex)
                    {
                        return Result<PTD_PhuongTienKiemDinh>.Failure(ex.Message);
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
