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


namespace Application.Kieu
{
    public class CapNhat
    {
        public class Command : IRequest<Result<PTD_Kieu>>
        {
            public PTD_Kieu Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_Kieu>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_Kieu>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaKieu", request.Entity.MaKieu);
                        parameters.Add("@PTenKieu", request.Entity.TenKieu);
                        parameters.Add("@PMoTa", request.Entity.MoTa);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_Kieu>("TDC_Update_Kieu", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Cập nhập không thành công");
                        }

                        return Result<PTD_Kieu>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_Kieu>.Failure(ex.Message);
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
