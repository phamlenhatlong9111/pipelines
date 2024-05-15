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


namespace Application.ToChucKDHCTN
{
    public class ThongTinToChuc
    {
        public class Query : IRequest<Result<PTD_ToChucKDHCTN>>
        {
            public Guid MaToChuc { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_ToChucKDHCTN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_ToChucKDHCTN>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMATOCHUC", request.MaToChuc);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ToChucKDHCTN>("TDC_Get_ToChucKDHCTN", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
                        }

                        return Result<PTD_ToChucKDHCTN>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_ToChucKDHCTN>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connettion.CloseAsync();
                    }
                }
            }
        }
    }
}
