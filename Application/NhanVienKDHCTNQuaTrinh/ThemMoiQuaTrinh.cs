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

namespace Application.NhanVienKDHCTNQuaTrinh
{
    public class ThemMoiQuaTrinh
    {
        public class Command : IRequest<Result<PTD_NhanVienKDHCTNQuaTrinh>>
        {
            public PTD_NhanVienKDHCTNQuaTrinhAddModel Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_NhanVienKDHCTNQuaTrinh>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_NhanVienKDHCTNQuaTrinh>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaNhanVien", request.Entity.MaNhanVien);
                        parameters.Add("@PCongTac", request.Entity.CongTac);
                        parameters.Add("@PNoiDung", request.Entity.NoiDung);
                        parameters.Add("@PLinhVuc", request.Entity.LinhVuc);
                        parameters.Add("@PTuNgay", request.Entity.TuNgay);
                        parameters.Add("@PDenNgay", request.Entity.DenNgay);
                        parameters.Add("@PToChuc", request.Entity.ToChuc);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_NhanVienKDHCTNQuaTrinh>("TDC_Add_NhanVienKDHCTN_QuaTrinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_NhanVienKDHCTNQuaTrinh>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_NhanVienKDHCTNQuaTrinh>.Failure(ex.Message);
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
