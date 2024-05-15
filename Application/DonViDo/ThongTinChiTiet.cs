using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Persistence;
using Application.Core;
using Domain;
using Dapper;
using System.Data.SqlClient;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Application.DonViDo
{
    public class ThongTinChiTiet
    {
        public class Query : IRequest<Result<PTD_DonViDo>>
        {
            public int Id { get; set; }
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
                        parameters.Add("@ID", request.Id);
                        return Result<PTD_DonViDo>.Success(await connection.QueryFirstOrDefaultAsync<PTD_DonViDo>("", parameters, commandType: System.Data.CommandType.StoredProcedure));
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
