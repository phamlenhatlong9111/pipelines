using Application.Core;
using Dapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.HT_ToChucQuanLy
{
    public class GetAll
    {
        public class Query : IRequest<Result<IEnumerable<HT_ToChucQuanLyModel>>>
        {
            public Guid? MaToChuc { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<HT_ToChucQuanLyModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<HT_ToChucQuanLyModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaToChuc", request.MaToChuc);

                        var result = await connettion.QueryAsync<HT_ToChucQuanLyModel>("HT_ToChucQuanLy_GET", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<HT_ToChucQuanLyModel>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<HT_ToChucQuanLyModel>>.Failure(ex.Message);
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
