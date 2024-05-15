using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;
using Domain;

namespace Application.DonViDo
{
    public class TimKiem
    {
        public class Query : IRequest<Result<PTD_DonViDo>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<PTD_DonViDo>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<PTD_DonViDo>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {

                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();

                        var result = await connection.QueryFirstOrDefaultAsync<PTD_DonViDo>("", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không tìm thấy dữ liệu");
                        }

                        return Result<PTD_DonViDo>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_DonViDo>.Failure(ex.Message);
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
