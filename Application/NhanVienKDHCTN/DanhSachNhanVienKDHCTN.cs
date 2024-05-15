using System;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;
using Domain;
using System.Collections.Generic;

using System.Linq;


namespace Application.NhanVienKDHCTN
{
    public class DanhSachNhanVienKDHCTN
    {
        public class Query : IRequest<Result<IEnumerable<PTD_NhanVienKDHCTN>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_NhanVienKDHCTN>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_NhanVienKDHCTN>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        var result = await connection.QueryAsync<PTD_NhanVienKDHCTN>("TDC_Gets_NhanVienKDHCTN", null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_NhanVienKDHCTN>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_NhanVienKDHCTN>>.Failure(ex.Message);
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
