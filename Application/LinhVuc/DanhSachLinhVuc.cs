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


namespace Application.LinhVuc

{
    public class DanhSachLinhVuc
    {
        public class Query : IRequest<Result<IEnumerable<PTD_LinhVuc>>>
        {
            public PTD_LinhVuc Entity { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_LinhVuc>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_LinhVuc>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        var result = await connettion.QueryAsync<PTD_LinhVuc>("TDC_Gets_LinhVuc", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_LinhVuc>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_LinhVuc>>.Failure(ex.Message);
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
