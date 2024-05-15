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
    public class GetsAll
    {
        public class Query : IRequest<Result<IEnumerable<VAITRO>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<VAITRO>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<VAITRO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();

                        var result = await connettion.QueryAsync<VAITRO>("SP_DanhSachVaiTro", commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<VAITRO>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<VAITRO>>.Failure(ex.Message);
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
