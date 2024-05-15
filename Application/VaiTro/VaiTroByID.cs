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

namespace Application.VaiTro
{
    public class VaiTroByID
    {
        public class Query : IRequest<Result<IEnumerable<VAITRO_BY_ID>>>
        {
            public long UserId { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<VAITRO_BY_ID>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<VAITRO_BY_ID>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PUserId", request.UserId);
                        var result = await connettion.QueryAsync<VAITRO_BY_ID>("SP_GET_QUYEN_THEO_USER", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<VAITRO_BY_ID>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<VAITRO_BY_ID>>.Failure(ex.Message);
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
