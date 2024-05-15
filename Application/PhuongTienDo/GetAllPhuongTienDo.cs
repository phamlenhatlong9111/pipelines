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


namespace Application.PhuongTienDo
{
    public class GetAllPhuongTienDo
    {
        public class Query : IRequest<Result<IEnumerable<PTD_PhuongTienDoGets>>>
        {
            public PTD_PhuongTienDo PhuongTienDo { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_PhuongTienDoGets>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_PhuongTienDoGets>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();

                        var result = await connettion.QueryAsync<PTD_PhuongTienDoGets>("TDC_Gets_PhuongTienDo", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        
                        foreach (var item in result)
                        {
                            item.NuocSanXuat = item.NuocSanXuat.Trim();
                        }
                        return Result<IEnumerable<PTD_PhuongTienDoGets>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_PhuongTienDoGets>>.Failure(ex.Message);
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
