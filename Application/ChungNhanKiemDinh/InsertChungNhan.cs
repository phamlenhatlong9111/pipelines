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


namespace Application.ChungNhanKiemDinh
{
    public class InsertChungNhan
    {
        public class Command : IRequest<Result<PTD_ChungNhanKiemDinh>>
        {
            public PTD_ChungNhanKiemDinh Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_ChungNhanKiemDinh>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_ChungNhanKiemDinh>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaPhuongTien", request.Entity.MaPhuongTien);
                        parameters.Add("@PQuyTrinhSuDung", request.Entity.QuyTrinhSuDung);
                        parameters.Add("@PKetQua", request.Entity.KetQua);
                        parameters.Add("@PDatYeuCau", request.Entity.DatYeuCau);
                        parameters.Add("@PLinhVuc", request.Entity.LinhVuc);
                        parameters.Add("@PMaToChuc", request.Entity.MaToChuc);
                        parameters.Add("@PSoGiayChungNhan", request.Entity.SoGiayChungNhan);
                        parameters.Add("@PNgayCap", request.Entity.NgayCap);
                        parameters.Add("@PNgayHetHan", request.Entity.NgayHetHan);
                        parameters.Add("@PSoTemKiemDinh", request.Entity.SoTemKiemDinh);
                        parameters.Add("@PNgayKiemDinh", request.Entity.NgayKiemDinh);
                        parameters.Add("@PNguoiKiemDinh", request.Entity.NguoiKiemDinh);
                        parameters.Add("@PTemKemTheo", request.Entity.TepKemTheo);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ChungNhanKiemDinh>("TDC_Add_ChungNhanKiemDinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_ChungNhanKiemDinh>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_ChungNhanKiemDinh>.Failure(ex.Message);
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
