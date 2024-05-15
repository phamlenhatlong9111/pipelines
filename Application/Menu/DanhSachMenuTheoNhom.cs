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
    public class DanhSachMenuTheoNhom
    {
        public class Query : IRequest<Result<IEnumerable<NhomMenu_Menu>>>
        {
            public int nhomid { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<NhomMenu_Menu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<NhomMenu_Menu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PIDCHA", request.nhomid);
                        var result = await connettion.QueryAsync<NhomMenu_Menu>("SP_MENU_TRUYVAN", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<NhomMenu_Menu>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<NhomMenu_Menu>>.Failure(ex.Message);
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
