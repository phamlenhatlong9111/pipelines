using Application.Core;
using Dapper;
using Domain;
using Domain.DTOs.ResponseDtos;
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
    public class GetsAllChucNang
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
                        DynamicParameters parameters = new DynamicParameters();

                        var result = await connettion.QueryAsync<MainMenu>("SP_DanhSachChucNang", commandType: System.Data.CommandType.StoredProcedure);

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
