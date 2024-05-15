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
using Domain.DTOs.RequestDtos;


namespace Application.TepKemTheo
{
    public class Insert
    {
        public class Command : IRequest<Result<Domain.TepKemTheo>>
        {
            public Domain.TepKemTheo Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Domain.TepKemTheo>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<Domain.TepKemTheo>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PMADOITUONG", request.Entity.MaDoiTuong);
                        parameters.Add("@PMOTA", request.Entity.MoTa);
                        parameters.Add("@PNOILUUTRU", request.Entity.NoiLuuTru);
                        var result = await connettion.QueryFirstOrDefaultAsync<Domain.TepKemTheo>("SP_TEPKEMTHEO_THEMMOI", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<Domain.TepKemTheo>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<Domain.TepKemTheo>.Failure(ex.Message);
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
