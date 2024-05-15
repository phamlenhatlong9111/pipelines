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


namespace Application.PhuongTienDoNhom2
{
    public class Insert
    {
        public class Command : IRequest<Result<PTD_PhuongTienDo>>
        {
            public PTD_PhuongTienDoNhom2 PhuongTienDo { get; set; }
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
                        DynamicParameters parametersdl = new DynamicParameters();
                        parametersdl.Add("@PMaPhuongTien", request.PhuongTienDo.MaPhuongTien);
                        var resultdl = await connettion.ExecuteAsync("TDC_DELETE_PhuongTienDoNhom2", parametersdl, commandType: System.Data.CommandType.StoredProcedure);
                        
                        DynamicParameters parameters = new DynamicParameters();
                        if (resultdl > 0)
                        {
                            //parameters.Add("@PMaPhuongTien", request.PhuongTienDo.MaPhuongTien);
                            parameters.Add("@PTenPhuongTien", request.PhuongTienDo.TenPhuongTien);
                            parameters.Add("@PPheDuyetMau", request.PhuongTienDo.PheDuyetMau);
                            parameters.Add("@PKiemDinhBanDau", request.PhuongTienDo.KiemDinhBanDau);
                            parameters.Add("@PKiemDinhDinhKy", request.PhuongTienDo.KiemDinhDinhKy);
                            parameters.Add("@PChuKyKiemDinh", request.PhuongTienDo.ChuKyKiemDinh);
                            parameters.Add("@PKiemDinhSauSuaChua", request.PhuongTienDo.KiemDinhSauSuaChua);
                            parameters.Add("@PMaDonViDo", request.PhuongTienDo.MaDonViDo);
                            parameters.Add("@PTrangThai", request.PhuongTienDo.TrangThai);
                            var result = await connettion.QueryFirstOrDefaultAsync<PTD_PhuongTienDo>("TDC_Add_PhuongTienDoNhom02", parameters, commandType: System.Data.CommandType.StoredProcedure);
                            if (result == null)
                            {
                                throw new Exception("Thêm mới không thành công (đã xóa thành công chưa tạo được)");
                            }

                            return Result<PTD_PhuongTienDo>.Success(result);
                        }
                        else
                        {
                            return Result<PTD_PhuongTienDo>.Failure("Thêm mới không thành công (xóa không thành công chưa tạo được)");
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
