using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QuyTrinhApDung
{
    public class CapNhatDuongDan
    {
        public class Command : IRequest<Result<PTD_QuyTrinhApDung>>
        {
            public int MaQuyTrinh;
        }

        public class Handler : IRequestHandler<Command, Result<PTD_QuyTrinhApDung>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_QuyTrinhApDung>> Handle(Command request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMAQUYTRINH", request.MaQuyTrinh);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_QuyTrinhApDung>("SP_QUYTRINHAPDUNG_CAPNHATDUONGDAN", parameter, commandType: CommandType.StoredProcedure);
                        return Result<PTD_QuyTrinhApDung>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<PTD_QuyTrinhApDung>.Failure(ex.Message);
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
