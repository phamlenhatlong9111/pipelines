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
    public class DanhSachFiles
    {
        public class Query : IRequest<Result<IEnumerable<Domain.TepKemTheo>>>
        {
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<Domain.TepKemTheo>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<Domain.TepKemTheo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        var result = await connettion.QueryAsync<Domain.TepKemTheo>("SP_GETFILEALLS", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<Domain.TepKemTheo>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<Domain.TepKemTheo>>.Failure(ex.Message);
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
