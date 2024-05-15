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
    public class Delete
    {
        public class Command : IRequest<Result<int>>
        {
            public VAITRO VAITRO { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<int>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<int>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PId", request.VAITRO.Id);

                        var result = await connettion.ExecuteAsync("SP_XoaVaiTro", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result <= 0)
                        {
                            throw new Exception("Xóa người vai trò không thành công");
                        }

                        return Result<int>.Success(result);
 
                    }
                    catch (Exception ex)
                    {
                        return Result<int>.Failure(ex.Message);
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
