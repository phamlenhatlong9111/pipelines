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
    public class ChiTietQuyTrinh
    {
        public class Query : IRequest<Result<PTD_QuyTrinhApDung>>
        {
            public int MaQuyTrinh { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_QuyTrinhApDung>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_QuyTrinhApDung>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@MaQuyTrinh", request.MaQuyTrinh);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_QuyTrinhApDung>("TDC_Get_QuaTrinhApDung", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
                        }

                        return Result<PTD_QuyTrinhApDung>.Success(result);
                    }
                    catch (Exception ex)
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
