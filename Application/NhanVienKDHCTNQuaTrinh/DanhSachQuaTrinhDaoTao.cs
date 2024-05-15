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

namespace Application.NhanVienKDHCTNQuaTrinh
{
    public class DanhSachQuaTrinhDaoTao
    {
        public class Query : IRequest<Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>>
        {
            public Guid MaNhanVien;
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMANHANVIEN", request.MaNhanVien);
                        var result = await connection.QueryAsync<PTD_NhanVienKDHCTNQuaTrinh>("TDC_Gets_NhanVienKDHCTN_QuaTrinhDaoTao", parameter, commandType: CommandType.StoredProcedure);
                        return Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_NhanVienKDHCTNQuaTrinh>>.Failure(ex.Message);
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
