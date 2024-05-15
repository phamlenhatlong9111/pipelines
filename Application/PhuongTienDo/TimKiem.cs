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
    public class TimKiem
    {
        public class Query : IRequest<Result<IEnumerable<PTD_PhuongTienDo>>>
        {
            public string TuKhoa { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_PhuongTienDo>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PTD_PhuongTienDo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@TuKhoa", request.TuKhoa);
                        var result = await connettion.QueryAsync<PTD_PhuongTienDo>("", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Không có dữ liêu phù hợp");
                        }

                        return Result<IEnumerable<PTD_PhuongTienDo>>.Success(result.ToList());
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_PhuongTienDo>>.Failure(ex.Message);
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
