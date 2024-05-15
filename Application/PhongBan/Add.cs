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
    public class Add
    {
        public class Command : IRequest<Result<PhongBanModel>>
        {
            public PhongBanModel PhongBan { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PhongBanModel>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PhongBanModel>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PDepartmentName", request.PhongBan.DepartmentName);
                        parameters.Add("@PSuDung", request.PhongBan.SuDung);
                        parameters.Add("@PDongBo", false);

                        var result = await connettion.QueryFirstOrDefaultAsync<PhongBanModel>("SP_PHONGBAN_THEMMOI", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Thêm mới phòng ban không thành công");
                        }
                        return Result<PhongBanModel>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PhongBanModel>.Failure(ex.Message);
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
