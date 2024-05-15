using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Application.Core;
using Domain;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Application.TepKemTheo
{
    public class ChiTietTepKemTheoByID
    {
        public class Query : IRequest<Result<Domain.TepKemTheo>>
        {
            public int MaTep;
        }

        public class Handler : IRequestHandler<Query, Result<Domain.TepKemTheo>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Domain.TepKemTheo>> Handle(Query request, CancellationToken cancellationToken)
            {
                using(var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    try
                    {
                        await connection.OpenAsync();
                        DynamicParameters parameter = new DynamicParameters();
                        parameter.Add("@PMATEP", request.MaTep);
                        var result = await connection.QueryFirstOrDefaultAsync<Domain.TepKemTheo>("SP_TEPKEMTHEO_CHITIET", parameter, commandType: CommandType.StoredProcedure);
                        return Result<Domain.TepKemTheo>.Success(result);
                    }catch (Exception ex)
                    {
                        return Result<Domain.TepKemTheo>.Failure(ex.Message);
                    }finally
                    {
                        await connection.CloseAsync();
                    }
                }
            }
        }
    }
}
