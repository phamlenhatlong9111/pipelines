using System;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Application.Core;
using Domain;

namespace Application.PhuongTienDo
{
    public class Get
    {
        public class Query : IRequest<Result<PTD_PhuongTienDo>>
        {
            public int ID { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PTD_PhuongTienDo>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_PhuongTienDo>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaPhuongTien", request.ID);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_PhuongTienDo>("TDC_Get_PhuongTienDo", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu phù hợp");
                        }

                        return Result<PTD_PhuongTienDo>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_PhuongTienDo>.Failure(ex.Message);
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
