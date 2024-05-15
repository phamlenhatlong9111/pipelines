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
    public class GetChungNhan
    {
        public class Query : IRequest<Result<PTD_ChungNhanKiemDinh>>
        {
            public int ID { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PTD_ChungNhanKiemDinh>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<PTD_ChungNhanKiemDinh>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PID", request.ID);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_ChungNhanKiemDinh>("TDC_Get_ChungNhanKiemDinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liệu");
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
