using System;
using System.Data;
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


namespace Application.ToChucKDHCTNChungChi
{
    public class ThemMoiChungChi
    {
        public class Command : IRequest<Result<PTD_ToChucKDHCTNChungChi>>
        {
            public PTD_ToChucKDHCTNChungChiAddModel Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_ToChucKDHCTNChungChi>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_ToChucKDHCTNChungChi>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaToChuc", request.Entity.MaToChuc);
                        parameters.Add("@PLoai", request.Entity.Loai);
                        parameters.Add("@PTongSo", request.Entity.TongSo);
                        parameters.Add("@PSuDung", request.Entity.SuDung);
                        parameters.Add("@PHuHong", request.Entity.HuHong);
                        parameters.Add("@PTonKho", request.Entity.TonKho);
                        parameters.Add("@PGhiChu", request.Entity.GhiChu);
                        parameters.Add("@PTepKemTheo", request.Entity.TepKemTheo);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_ToChucKDHCTNChungChi>("TDC_Add_ToChucKDHCTN_ChungChi", parameters, commandType: CommandType.StoredProcedure);

                        return Result<PTD_ToChucKDHCTNChungChi>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_ToChucKDHCTNChungChi>.Failure(ex.Message);
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
