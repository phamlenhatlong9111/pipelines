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

namespace Application.NhanVien
{
    public class Detail
    {
        public class Query : IRequest<Result<NhanSu>>
        {
            //public string TuKhoa { get; set; }
            public Guid ID { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<NhanSu>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<NhanSu>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();

                        parameters.Add("@PID", request.ID);

                        var result = await connettion.QueryFirstOrDefaultAsync<NhanSu>("SP_NHANVIEN_PHONGBAN_CHITIET", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<NhanSu>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<NhanSu>.Failure(ex.Message);
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
