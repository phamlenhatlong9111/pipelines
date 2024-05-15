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


namespace Application.ToChucQuanLy
{
    public class DanhSachKieu
    {
        public class Query : IRequest<Result<IEnumerable<PTD_ToChucQuanLy>>>
        {
            public PTD_ToChucQuanLy ToChucQuanLy { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_ToChucQuanLy>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_ToChucQuanLy>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        var result = await connettion.QueryAsync<PTD_ToChucQuanLy>("TDC_Gets_ToChucQuanLy", param: null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_ToChucQuanLy>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_ToChucQuanLy>>.Failure(ex.Message);
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
