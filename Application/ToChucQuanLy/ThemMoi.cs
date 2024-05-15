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
    public class ThemMoi
    {
        public class Command : IRequest<Result<PTD_ToChucQuanLy>>
        {
            public PTD_ToChucQuanLy Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_ToChucQuanLy>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_ToChucQuanLy>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaDinhDanh", request.Entity.MaDinhDanh);
                        parameters.Add("@PTenToChuc", request.Entity.TenToChuc);
                        parameters.Add("@PGioiThieu", request.Entity.GioiThieu);
                        parameters.Add("@PDiaChi", request.Entity.DiaChi);
                        parameters.Add("@PDienThoai", request.Entity.DienThoai);
                        parameters.Add("@PHopThu", request.Entity.HopThu);
                        parameters.Add("@PNguoiLienHe", request.Entity.NguoiLienHe);
                        parameters.Add("@PChucVu", request.Entity.ChucVu);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ToChucQuanLy>("TDC_Add_ToChucQuanLy", parameters, commandType: System.Data.CommandType.StoredProcedure);

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
