using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.HT_ToChucQuanLy
{
    public class Update
    {
        public class Command : IRequest<Result<HT_ToChucQuanLyModel>>
        {
            public HT_ToChucQuanLyModel HT_ToChucQuanLy { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<HT_ToChucQuanLyModel>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<HT_ToChucQuanLyModel>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaToChuc", request.HT_ToChucQuanLy.MaToChuc);
                        parameters.Add("@PMaDinhDanh", request.HT_ToChucQuanLy.MaDinhDanh);
                        parameters.Add("@PTenToChuc", request.HT_ToChucQuanLy.TenToChuc);
                        parameters.Add("@PGioiThieu", request.HT_ToChucQuanLy.GioiThieu);
                        parameters.Add("@PDiaChi", request.HT_ToChucQuanLy.DiaChi);
                        parameters.Add("@PDienThoai", request.HT_ToChucQuanLy.DienThoai);
                        parameters.Add("@PHopThu", request.HT_ToChucQuanLy.HopThu);
                        parameters.Add("@PNguoiLienHe", request.HT_ToChucQuanLy.NguoiLienHe);
                        parameters.Add("@PChucVu", request.HT_ToChucQuanLy.ChucVu);
                        parameters.Add("@PTrangThai", request.HT_ToChucQuanLy.TrangThai);
            
                        var result = await connettion.QueryFirstOrDefaultAsync<HT_ToChucQuanLyModel>("HT_ToChucQuanLy_UPDATE", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Cập nhật tổ chức hệ thống không thành công");
                        }
                        return Result<HT_ToChucQuanLyModel>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<HT_ToChucQuanLyModel>.Failure(ex.Message);
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
