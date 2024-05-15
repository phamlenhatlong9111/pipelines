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


namespace Application.PhuongTienDo
{
    public class Insert
    {
        public class Command : IRequest<Result<PTD_PhuongTienDo>>
        {
            public PTD_PhuongTienDo PhuongTienDo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PTD_PhuongTienDo>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_PhuongTienDo>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters1 = new DynamicParameters();
                        parameters1.Add("@PTenPhuongTien", request.PhuongTienDo.TenPhuongTien);
                        parameters1.Add("@PPheDuyetMau", request.PhuongTienDo.PheDuyetMau);
                        parameters1.Add("@PKiemDinhBanDau", request.PhuongTienDo.KiemDinhBanDau);
                        parameters1.Add("@PKiemDinhDinhKy", request.PhuongTienDo.KiemDinhDinhKy);
                        parameters1.Add("@PChuKyKiemDinh", request.PhuongTienDo.ChuKyKiemDinh);
                        parameters1.Add("@PKiemDinhSauSuaChua", request.PhuongTienDo.KiemDinhSauSuaChua);
                        parameters1.Add("@PMaDonViDo", request.PhuongTienDo.MaDonVi);
                        parameters1.Add("@PTrangThai", request.PhuongTienDo.TrangThai);
                        var result1 = await connettion.QueryFirstOrDefaultAsync<PTD_PhuongTienDoNhom2>("TDC_Add_PhuongTienDoNhom02", parameters1, commandType: System.Data.CommandType.StoredProcedure);
                        if(result1 != null)
                        {
                            DynamicParameters parameters = new DynamicParameters();
                            parameters.Add("@PMaCoSo", request.PhuongTienDo.MaCoSo);
                            parameters.Add("@PMaNhom2", result1.MaPhuongTien);
                            parameters.Add("@PMaToChucTiepNhan", request.PhuongTienDo.MaToChucTiepNhan);
                            parameters.Add("@PTenPhuongTien", request.PhuongTienDo.TenPhuongTien);
                            parameters.Add("@PNuocSanXuat", request.PhuongTienDo.NuocSanXuat);
                            parameters.Add("@PHangSanXuat", request.PhuongTienDo.HangSanXuat);
                            parameters.Add("@PNamSanXuat", request.PhuongTienDo.NamSanXuat);
                            parameters.Add("@PNamSuDung", request.PhuongTienDo.NamSuDung);
                            parameters.Add("@PSoSanXuat", request.PhuongTienDo.SoSanXuat);
                            parameters.Add("@PKieuKyHieu", request.PhuongTienDo.KieuKyKieu);
                            parameters.Add("@PDacTrungKyThuat", request.PhuongTienDo.DacTrungKyThuat);
                            parameters.Add("@PNoiSuDung", request.PhuongTienDo.NoiSuDung);
                            parameters.Add("@PTrangThai", request.PhuongTienDo.TrangThai);
                            parameters.Add("@PMaDonViDo", request.PhuongTienDo.MaDonVi);
                            parameters.Add("@PMaKieu", request.PhuongTienDo.MaKieu);
                            parameters.Add("@PMaLinhVuc", request.PhuongTienDo.MaLinhVuc);
                            var result = await connettion.QueryFirstOrDefaultAsync<PTD_PhuongTienDo>("TDC_Add_PhuongTienDo", parameters, commandType: System.Data.CommandType.StoredProcedure);
                            if (result == null)
                            {
                                throw new Exception("Thêm mới phương tiện đo không thành công(tạo thành công nhom02)");
                            }
                            return Result<PTD_PhuongTienDo>.Success(result);
                        }
                        else
                        {
                            return Result<PTD_PhuongTienDo>.Failure("Thêm mới không thành công (thêm không thành công phương tiện đo nhom2 chưa tạo được)");
                        }
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_PhuongTienDo>.Failure(ex.Message);
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
