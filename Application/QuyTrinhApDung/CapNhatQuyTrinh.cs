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


namespace Application.QuyTrinhApDung
{
    public class CapNhatQuyTrinh
    {
        public class Command : IRequest<Result<PTD_QuyTrinhApDung>>
        {
            public PTD_QuyTrinhApDung Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_QuyTrinhApDung>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<PTD_QuyTrinhApDung>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaQuyTrinh", request.Entity.MaQuyTrinh);
                        parameters.Add("@PMaToChuc", request.Entity.MaToChuc);
                        parameters.Add("@PTenQuyTrinh", request.Entity.TenQuyTrinh);
                        parameters.Add("@PSoKyHieu", request.Entity.SoKyHieu);
                        parameters.Add("@PNamBanHanh", request.Entity.NamBanHanh);
                        parameters.Add("@PToChucBanHanh", request.Entity.ToChucBanHanh);
                        parameters.Add("@PLinhVuc", request.Entity.LinhVuc);
                        parameters.Add("@PTepKemTheo", request.Entity.TepKemTheo);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        parameters.Add("@PMoTa", request.Entity.MoTa);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_QuyTrinhApDung>("TDC_Update_QuyTrinhApDung", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_QuyTrinhApDung>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_QuyTrinhApDung>.Failure(ex.Message);
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
