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

namespace Application.Menu
{
    public class DanhSachNhomMenu
    {
        public class Query : IRequest<Result<IEnumerable<NhomMenu>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<NhomMenu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<NhomMenu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        var result = await connettion.QueryAsync<NhomMenu>("SP_NHOMMENU_TRUYVAN", param: null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<NhomMenu>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<NhomMenu>>.Failure(ex.Message);
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
