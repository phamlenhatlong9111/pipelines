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
    public class ChiTietNhanVienKDHCTN
    {
        public class Query : IRequest<Result<PTD_NhanVienKDHCTN>>
        {
            public Guid MaNhanVien { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PTD_NhanVienKDHCTN>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_NhanVienKDHCTN>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMANHANVIEN", request.MaNhanVien);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_NhanVienKDHCTN>("TDC_Get_NhanVienKDHCTN", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
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
