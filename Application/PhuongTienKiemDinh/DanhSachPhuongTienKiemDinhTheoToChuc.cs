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

namespace Application.PhuongTienKiemDinh
{
    public class DanhSachPhuongTienKiemDinhTheoToChuc
    {
        public class Query : IRequest<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>>
        {
            public Guid MaToChuc;
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMATOCHUC", request.MaToChuc);
                        var result = await connection.QueryAsync<PTD_PhuongTienKiemDinhViewModel>("TDC_Gets_PhuongTienKiemDinhTheoToChuc", parameter, commandType: CommandType.StoredProcedure);
                        return Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>.Success(result);
                    }catch(Exception ex)
                    {
                        return Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>.Failure(ex.Message);
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
