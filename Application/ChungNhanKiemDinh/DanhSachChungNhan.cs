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
    public class DanhSachChungNhan
    {
        public class Query : IRequest<Result<IEnumerable<PTD_ChungNhanKiemDinh>>>
        {
            public PTD_ChungNhanKiemDinh? chungNhanKiemDinh { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_ChungNhanKiemDinh>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_ChungNhanKiemDinh>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        
                        var result = await connettion.QueryAsync<PTD_ChungNhanKiemDinh>("TDC_Gets_ChungNhanKiemDinh", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_ChungNhanKiemDinh>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_ChungNhanKiemDinh>>.Failure(ex.Message);
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
