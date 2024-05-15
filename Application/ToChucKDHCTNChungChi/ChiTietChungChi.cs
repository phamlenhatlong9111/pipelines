using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ToChucKDHCTNChungChi
{
    public class ChiTietChungChi
    {
        public class Query : IRequest<Result<PTD_ToChucKDHCTNChungChi>>
        {
            public int MaChungChi { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_ToChucKDHCTNChungChi>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_ToChucKDHCTNChungChi>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMACHUNGCHI", request.MaChungChi);

                        var result = await connection.QueryFirstOrDefaultAsync<PTD_ToChucKDHCTNChungChi>("TDC_Get_ToChucKDHCTN_ChungChi", parameters, commandType: System.Data.CommandType.StoredProcedure);


                        return Result<PTD_ToChucKDHCTNChungChi>.Success(result);
                    }
                    catch (Exception ex)
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
