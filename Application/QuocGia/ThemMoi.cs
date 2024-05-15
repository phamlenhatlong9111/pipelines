using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;
using Domain;

namespace Application.QuocGia
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<PTD_QuocGia>>
        {
            public PTD_QuocGia QuocGia { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PTD_QuocGia>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }

            public async Task<Result<PTD_QuocGia>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {

                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMaQuocGia", request.QuocGia.MaQuocGia);
                        parameters.Add("@PTenQuocGia", request.QuocGia.TenQuocGia);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_QuocGia>("TDC_Add_QuocGia", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_QuocGia>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_QuocGia>.Failure(ex.Message);
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
