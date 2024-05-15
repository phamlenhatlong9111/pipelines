using System;
using System.Data;
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


namespace Application.ToChucKDHCTNChungChi
{
    public class DanhSachChungChi
    {
        public class Query : IRequest<Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();

                        var result = await connection.QueryAsync<PTD_ToChucKDHCTNChungChi>("TDC_Gets_ToChucKDHCTN_ChungChi", parameters, commandType: CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_ToChucKDHCTNChungChi>>.Failure(ex.Message);
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
