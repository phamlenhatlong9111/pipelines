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

namespace Application.PhongBan
{
    public class GetAll
    {
        public class Query : IRequest<Result<IEnumerable<PhongBanModel>>>
        {
            public string DepartmentName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<PhongBanModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<PhongBanModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PDepartmentName", request.DepartmentName);

                        var result = await connettion.QueryAsync<PhongBanModel>("SP_PHONGBAN_DANHSACH", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PhongBanModel>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PhongBanModel>>.Failure(ex.Message);
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
