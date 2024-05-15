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

namespace Application.NhanVienKDHCTN
{
    public class DanhSachNhanVienKDHCTNTheoToChuc
    {
        public class Query : IRequest<Result<IEnumerable<PTD_NhanVienKDHCTN>>>
        {
            public Guid MaToChuc;
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_NhanVienKDHCTN>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_NhanVienKDHCTN>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMATOCHUC", request.MaToChuc);
                        var result = await connection.QueryAsync<PTD_NhanVienKDHCTN>("SP_NHANVIENKDHCTH_DANHSACHTHEOTOCHUC", parameter, commandType: CommandType.StoredProcedure);
                        return Result<IEnumerable<PTD_NhanVienKDHCTN>>.Success(result);
                    }catch(Exception ex)
                    {
                        return Result<IEnumerable<PTD_NhanVienKDHCTN>>.Failure(ex.Message);
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
