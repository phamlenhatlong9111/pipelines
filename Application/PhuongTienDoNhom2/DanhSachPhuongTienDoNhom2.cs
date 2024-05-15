using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Core;
using Domain;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using Dapper;

namespace Application.PhuongTienDoNhom2
{
    public class DanhSachPhuongTienDoNhom2
    {
        public class Query : IRequest<Result<IEnumerable<PTD_PhuongTienDoNhom2>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_PhuongTienDoNhom2>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_PhuongTienDoNhom2>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        var result = await connection.QueryAsync<PTD_PhuongTienDoNhom2>("TDC_Gets_PhuongTienDoNhom2", null, commandType: CommandType.StoredProcedure);
                        return Result<IEnumerable<PTD_PhuongTienDoNhom2>>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_PhuongTienDoNhom2>>.Failure(ex.Message);
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
