using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;


namespace Application.QuocGia
{
    public class Xoa
    {
        public class Command : IRequest<Result<int>>
        {
            public string MaQuocGia { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
               using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
               {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMaQuocGia", request.MaQuocGia);
                        var result = await connection.ExecuteAsync("TDC_Delete_QuocGia", parameter, commandType: CommandType.StoredProcedure);
                        return Result<int>.Success(result);
                    } catch (Exception ex)
                    {
                        return Result<int>.Failure(ex.Message);
                    }finally
                    {
                        await connection.CloseAsync();
                    }
               }
            }
        }
    }
}
