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


namespace Application.DonViDo
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<PTD_DonViDo>>
        {
            public PTD_DonViDo DonViDo { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PTD_DonViDo>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<PTD_DonViDo>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {

                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PTenDonVi", request.DonViDo.Ten);
                        parameters.Add("@PKyHieu", request.DonViDo.KyHieu);
                        parameters.Add("@PDaiLuong", request.DonViDo.DaiLuong);
                        parameters.Add("@PTrangThai", request.DonViDo.TrangThai);
                        parameters.Add("@PMaLinhVuc", request.DonViDo.MaLinhVuc);
                        var result = await connection.QueryFirstOrDefaultAsync<PTD_DonViDo>("TDC_Add_DonViDo", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Cập nhật không thành công");
                        }

                        return Result<PTD_DonViDo>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_DonViDo>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connection.CloseAsync();
                    }
                }
            }
        }
    }
}
