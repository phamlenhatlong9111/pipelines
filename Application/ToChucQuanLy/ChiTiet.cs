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
    public class ChiTiet
    {
        public class Query : IRequest<Result<PTD_ToChucQuanLy>>
        {
            public string ID { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_ToChucQuanLy>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<PTD_ToChucQuanLy>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.ID);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ToChucQuanLy>("TDC_Get_ToChucQuanLy", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_ToChucQuanLy>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_ToChucQuanLy>.Failure(ex.Message);
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
