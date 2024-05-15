//using System;
//using System.Data.SqlClient;
//using System.Threading;
//using System.Threading.Tasks;
//using MediatR;
//using Microsoft.Extensions.Configuration;
//using Dapper;
//using Persistence;
//using Application.Core;
//using Domain;
//using System.Collections.Generic;

//using System.Linq;
//using Domain.DTOs.RequestDtos;

//namespace Application.TepKemTheo
//{
//    public class OverWrite
//    {
//        public class Command : IRequest<Result<QLCX_TepKemTheo>>
//        {
//            public QLCX_TepKemTheo Entity { get; set; }
//        }
//        public class Handler : IRequestHandler<Command, Result<QLCX_TepKemTheo>>
//        {
//            private readonly IConfiguration _configuration;

//            public Handler(IConfiguration configuration)
//            {
//                _configuration = configuration;
//            }
//            public async Task<Result<QLCX_TepKemTheo>> Handle(Command request, CancellationToken cancellationToken)
//            {
//                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
//                {
//                    await connettion.OpenAsync();
//                    try
//                    {
//                        DynamicParameters parameters = new DynamicParameters();
//                        parameters.Add("@PDOITUONGSOHUU", request.Entity.DoiTuongSoHuu);
//                        parameters.Add("@PTENTEP", request.Entity.TenTep);
//                        parameters.Add("@PNOILUUTRU", request.Entity.NoiLuuTru);
//                        var result = await connettion.QueryFirstOrDefaultAsync<QLCX_TepKemTheo>("SP_TEPKEMTHEO_GHIDE", parameters, commandType: System.Data.CommandType.StoredProcedure);

//                        if (result == null)
//                        {
//                            throw new Exception("Thêm mới không thành công");
//                        }

//                        return Result<QLCX_TepKemTheo>.Success(result);
//                    }
//                    catch (Exception ex)
//                    {
//                        return Result<QLCX_TepKemTheo>.Failure(ex.Message);
//                    }
//                    finally
//                    {
//                        await connettion.CloseAsync();
//                    }
//                }
//            }
//        }
//    }
//}
