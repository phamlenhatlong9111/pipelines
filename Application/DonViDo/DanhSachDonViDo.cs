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
using System.Reflection.Metadata;

namespace Application.DonViDo
{
    public class DanhSachDonViDo
    {
        public class Query : IRequest<Result<List<PTD_DonViDo>>>
        {
            //public string TuKhoa { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<PTD_DonViDo>>>
        {
            private readonly DataContext _context;
            private readonly IConfiguration _configuration;

            public Handler(DataContext context, IConfiguration configuration)
            {
                _context = context;
                _configuration = configuration;
            }
            public async Task<Result<List<PTD_DonViDo>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        //parameters.Add("@PTenDonVi", request.TuKhoa);

                        var result = await connection.QueryAsync<PTD_DonViDo>("TDC_Gets_DonViDo", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<List<PTD_DonViDo>>.Success(result.ToList());
                    }
                    catch (Exception ex)
                    {
                        return Result<List<PTD_DonViDo>>.Failure(ex.Message);
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
