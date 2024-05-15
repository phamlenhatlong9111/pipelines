using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Core;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using Domain;

namespace Application.ToChucKDHCTN
{
    public class KiemTraToChuc
    {
        public class Command : IRequest<Result<int>>
        {
            public PTD_ToChucKDHCTNCheckModel Entity;
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
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMADINHDANH", request.Entity.MaDinhDanh);
                        parameter.Add("@PMATOCHUCQUANLY", request.Entity.MaToChucQuanLy);
                        var result = await connection.QueryFirstOrDefaultAsync<int>("TDC_Check_ToChucKDHCTN", parameter, commandType: CommandType.StoredProcedure);
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
