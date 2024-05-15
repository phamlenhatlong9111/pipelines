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


namespace Application.Menu
{
    public class CapNhatNhomMenu
    {
        public class Command : IRequest<Result<NhomMenu>>
        {
            public NhomMenu Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<NhomMenu>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<NhomMenu>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.Entity.ID);
                        parameters.Add("@PTENNHOM", request.Entity.TenNhom);
                        parameters.Add("@PICON", request.Entity.Icon);
                        parameters.Add("@PKICHHOAT", request.Entity.TrangThai);
                        parameters.Add("@PDUONGDAN", request.Entity.DuongDan);
                        parameters.Add("@PTHUTU", request.Entity.ThuTuHienThi);
                        var result = await connettion.QueryFirstOrDefaultAsync<NhomMenu>("SP_NHOMMENU_CAPNHAT", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<NhomMenu>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<NhomMenu>.Failure(ex.Message);
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
