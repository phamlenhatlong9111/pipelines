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


namespace Application.QuyTrinhApDung
{
    public class DanhSachQuyTrinh
    {
        public class Query : IRequest<Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {

                        var result = await connection.QueryAsync<PTD_QuyTrinhApDungViewModel>("TDC_Gets_QuyTrinhApDung", null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_QuyTrinhApDungViewModel>>.Failure(ex.Message);
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
