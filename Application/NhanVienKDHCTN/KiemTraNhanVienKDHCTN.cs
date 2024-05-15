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
    public class KiemTraNhanVienKDHCTN
    {
        public class Command : IRequest<Result<int>>
        {
            public PTD_NhanVienKDHCTNCheckModel Entity;
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PSOHIEUKDV", request.Entity.SoHieuKDV);
                        parameters.Add("@PMATOCHUC", request.Entity.MaToChuc);
                        var result = await connection.QueryFirstOrDefaultAsync<int>("TDC_Check_NhanVienKDHCTN", parameters, commandType: CommandType.StoredProcedure);
                        return Result<int>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<int>.Failure(ex.Message);
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
