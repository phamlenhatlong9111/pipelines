using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Persistence;
using Application.Core;
using Domain;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace Application.QuocGia
{
    public class ThongTinChiTiet
    {
        public class Query : IRequest<Result<PTD_QuocGia>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PTD_QuocGia>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<PTD_QuocGia>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@MaQuocGia", request.Id);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_QuocGia>("TDC_Get_QuocGia", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không tìm thấy dữ liệu");
                        }

                        return Result<PTD_QuocGia>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_QuocGia>.Failure(ex.Message);
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
