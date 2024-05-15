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


namespace Application.PhuongTienKiemDinh
{
    public class DanhSachPhuongTienKiemDinh
    {
        public class Query : IRequest<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>>
        {
            
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        var result = await connettion.QueryAsync<PTD_PhuongTienKiemDinhViewModel>("TDC_Gets_PhuongTienKiemDinh", null, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<PTD_PhuongTienKiemDinhViewModel>>.Failure(ex.Message);
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
