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


namespace Application.ToChucKDHCTN
{
    public class ThemMoiToChuc
    {
        public class Command : IRequest<Result<PTD_ToChucKDHCTN>>
        {
            public PTD_ToChucKDHCTNAddModel Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_ToChucKDHCTN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_ToChucKDHCTN>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaToChucQuanLy", request.Entity.MaToChucQuanLy);
                        parameters.Add("@PMaDinhDanh", request.Entity.MaDinhDanh);
                        parameters.Add("@PTenToChuc", request.Entity.TenToChuc);
                        parameters.Add("@PGioiThieu", request.Entity.GioiThieu);
                        parameters.Add("@PDiaChi", request.Entity.DiaChi);
                        parameters.Add("@PDiaDiemThuchien", request.Entity.DiaDiemThucHien);
                        parameters.Add("@PDienThoai", request.Entity.DienThoai);
                        parameters.Add("@PHopThu", request.Entity.HopThu);
                        parameters.Add("@PNguoiLienHe", request.Entity.NguoiLienHe);
                        parameters.Add("@PChucVu", request.Entity.ChucVu);
                        parameters.Add("@PDienTichSuDung", request.Entity.DienTichSuDung);
                        parameters.Add("@PDieuKienMoiTruong", request.Entity.DieuKienMoiTruong);
                        parameters.Add("@PDieuKienKhac", request.Entity.DieuKienKhac);
                        parameters.Add("@PSoGCNCCDV", request.Entity.SoGCNCCDV);
                        parameters.Add("@PNoiCapGCN", request.Entity.NoiCapGCN);
                        parameters.Add("@PNgayCapGCN", request.Entity.NgayCapGCN);
                        parameters.Add("@PNgayHetHanGCN", request.Entity.NgayHetHanGCN);
                        parameters.Add("@PCapLanThu", request.Entity.CapLanThu);
                        parameters.Add("@PLoaiGTPL", request.Entity.LoaiGTPL);
                        parameters.Add("@PSoGTPL", request.Entity.SoGTPL);
                        parameters.Add("@PNgayCapGTPL", request.Entity.NgayCapGTPL);
                        parameters.Add("@PNoiCapGTPL", request.Entity.NoiCapGTPL);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ToChucKDHCTN>("TDC_ToChucKDHCTN_ADD", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_ToChucKDHCTN>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_ToChucKDHCTN>.Failure(ex.Message);
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
