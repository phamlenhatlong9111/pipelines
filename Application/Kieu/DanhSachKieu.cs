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


namespace Application.Kieu

{
    public class DanhSachKieu
    {
        public class Query : IRequest<Result<IEnumerable<PTD_Kieu>>>
        {
            public PTD_Kieu Kieu { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_Kieu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_Kieu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        var result = await connettion.QueryAsync<PTD_Kieu>("TDC_Gets_Kieu", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_Kieu>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_Kieu>>.Failure(ex.Message);
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
