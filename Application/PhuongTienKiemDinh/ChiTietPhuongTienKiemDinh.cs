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
    public class ChiTietPhuongTienKiemDinh
    {
        public class Query : IRequest<Result<PTD_PhuongTienKiemDinh>>
        {
            public int MaPhuongTien { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_PhuongTienKiemDinh>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_PhuongTienKiemDinh>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMAPHUONGTIEN", request.MaPhuongTien);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_PhuongTienKiemDinh>("TDC_Get_PhuongTienKiemDinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
                        }

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
