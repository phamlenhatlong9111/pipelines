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


namespace Application.PhuongTienKiemDinh
{
    public class CapNhatPhuongTienKiemDinh
    {
        public class Command : IRequest<Result<PTD_PhuongTienKiemDinh>>
        {
            public PTD_PhuongTienKiemDinh Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_PhuongTienKiemDinh>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<PTD_PhuongTienKiemDinh>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaPhuongTien", request.Entity.MaPhuongTien);
                        parameters.Add("@PMaToChuc", request.Entity.MaToChuc);
                        parameters.Add("@PMaNhom2", request.Entity.MaNhom2);
                        parameters.Add("@PTenPhuongTien", request.Entity.TenPhuongTien);
                        parameters.Add("@PNuocSanXuat", request.Entity.NuocSanXuat);
                        parameters.Add("@PHangSanXuat", request.Entity.HangSanXuat);
                        parameters.Add("@PNamSanXuat", request.Entity.NamSanXuat);
                        parameters.Add("@PNamSuDung", request.Entity.NamSuDung);
                        parameters.Add("@PSoSanXuat", request.Entity.SoSanXuat);
                        parameters.Add("@PKieuKyHieu", request.Entity.KieuKyHieu);
                        parameters.Add("@PPhamViDo", request.Entity.PhamViDo);
                        parameters.Add("@PCapDoChinhXac", request.Entity.CapDoChinhXac);
                        parameters.Add("@PQuyTrinhSuDung", request.Entity.QuyTrinhSuDung);
                        parameters.Add("@PLinhVuc", request.Entity.LinhVuc);
                        parameters.Add("@PNoiKiemDinh", request.Entity.NoiKiemDinh);
                        parameters.Add("@PSoGiayChungNhan", request.Entity.SoGiayChungNhan);
                        parameters.Add("@PNgayCap", request.Entity.NgayCap);
                        parameters.Add("@PNgayHetHan", request.Entity.NgayHetHan);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        parameters.Add("@PTepKemTheo", request.Entity.TepKemTheo);

                        var result = await connection.QueryFirstOrDefaultAsync<PTD_PhuongTienKiemDinh>("TDC_Update_PhuongTienKiemDinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                       

                        return Result<PTD_PhuongTienKiemDinh>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_PhuongTienKiemDinh>.Failure(ex.Message);
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
