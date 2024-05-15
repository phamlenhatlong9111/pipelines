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


namespace Application.NhanVienKDHCTN
{
    public class CapNhatNhanVienKDHCTN
    {
        public class Command : IRequest<Result<PTD_NhanVienKDHCTN>>
        {
            public PTD_NhanVienKDHCTN Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_NhanVienKDHCTN>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<PTD_NhanVienKDHCTN>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaNhanVien", request.Entity.MaNhanVien);
                        parameters.Add("@PMaToChuc", request.Entity.MaToChuc);
                        parameters.Add("@PHoTen", request.Entity.HoTen);
                        parameters.Add("@PGioiTinh", request.Entity.GioiTinh);
                        parameters.Add("@PNamSinh", request.Entity.NamSinh);
                        parameters.Add("@PNguyenQuan", request.Entity.NguyenQuan);
                        parameters.Add("@PNoiCuTru", request.Entity.NoiCuTru);
                        parameters.Add("@PVienChuc", request.Entity.VienChuc);
                        parameters.Add("@PTrinhDo", request.Entity.TrinhDo);
                        parameters.Add("@PKinhNghiem", request.Entity.KinhNghiem);
                        parameters.Add("@PSoHieuKDV", request.Entity.SoHieuKDV);
                        parameters.Add("@PNoiCap", request.Entity.NoiCap);
                        parameters.Add("@PNgayCap", request.Entity.NgayCap);
                        parameters.Add("@PNgayHetHan", request.Entity.NgayHetHan);
                        parameters.Add("@PTepKemTheo", request.Entity.TepKemTheo);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_NhanVienKDHCTN>("TDC_Update_NhanVienKDHCTN", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_NhanVienKDHCTN>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_NhanVienKDHCTN>.Failure(ex.Message);
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
