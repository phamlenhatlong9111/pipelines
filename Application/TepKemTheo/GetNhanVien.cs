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
using Domain.DTOs.RequestDtos;

namespace Application.TepKemTheo
{
    public class GetNhanVien
    {
        public class Query : IRequest<Result<Domain.NhanVien>>
        {
            public string tendangnhap { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<Domain.NhanVien>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<Domain.NhanVien>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PUSERNAME", request.tendangnhap);
                        var result = await connettion.QueryFirstOrDefaultAsync<Domain.NhanVien>("SP_NHANVIEN_GETBYUSERNAME", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
                        }

                        return Result<Domain.NhanVien>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<Domain.NhanVien>.Failure(ex.Message);
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
