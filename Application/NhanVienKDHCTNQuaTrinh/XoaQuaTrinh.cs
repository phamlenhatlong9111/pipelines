using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Core;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;

namespace Application.NhanVienKDHCTNQuaTrinh
{
    public class XoaQuaTrinh
    {
        public class Command : IRequest<Result<int>>
        {
            public int MaQuaTrinh;
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
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMAQUATRINH", request.MaQuaTrinh);
                        var result = await connection.ExecuteAsync("TDC_Delete_NhanVienKDHCTN_QuaTrinh", parameter, commandType: CommandType.StoredProcedure);
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
