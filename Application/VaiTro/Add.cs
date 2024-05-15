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
    public class Add
    {
        public class Command : IRequest<Result<VAITRO>>
        {
            public VAITRO VAITRO { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<VAITRO>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<VAITRO>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PName", request.VAITRO.Name);
                        parameters.Add("@PNormalizedName", request.VAITRO.NormalizedName);

                        var result = await connettion.QueryFirstOrDefaultAsync<VAITRO>("SP_ThemMoiVaiTro", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Thêm mới vai trò không thành công");
                        }
                        return Result<VAITRO>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<VAITRO>.Failure(ex.Message);
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
