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

namespace Application.ToChucKDHCTNChungChi
{
    public class CapNhatDuongDanChungChi
    {
        public class Command : IRequest<Result<PTD_ToChucKDHCTNChungChi>>
        {
            public int MaChungChi;
        }

        public class Handler : IRequestHandler<Command, Result<PTD_ToChucKDHCTNChungChi>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_ToChucKDHCTNChungChi>> Handle(Command request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMACHUNGCHI", request.MaChungChi);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_ToChucKDHCTNChungChi>("SP_CHUNGCHI_CAPNHATDUONGDAN", parameter, commandType: CommandType.StoredProcedure);
                        return Result<PTD_ToChucKDHCTNChungChi>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<PTD_ToChucKDHCTNChungChi>.Failure(ex.Message);
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
