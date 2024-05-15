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
using Domain.DTOs.ResponseDtos;

namespace Application.Menu
{
    public class DanhSachCayMenu
    {
        public class Query : IRequest<Result<IEnumerable<MainMenu>>>
        {

        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<MainMenu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<MainMenu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        var result = await connettion.QueryAsync<MainMenu>("SP_MENU_DANHSACHCAY", param: null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<MainMenu>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<MainMenu>>.Failure(ex.Message);
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
