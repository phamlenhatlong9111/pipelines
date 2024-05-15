﻿using System;
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


namespace Application.LinhVuc
{
    public class ThemMoi
    {
        public class Command : IRequest<Result<PTD_LinhVuc>>
        {
            public PTD_LinhVuc Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<PTD_LinhVuc>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<PTD_LinhVuc>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PTENLINHVUC", request.Entity.TenLinhVuc);
                        parameters.Add("@PMoTa", request.Entity.MoTa);
                        parameters.Add("@PTrangThai", request.Entity.TrangThai);
                        var result = await connettion.QueryFirstOrDefaultAsync<PTD_LinhVuc>("TDC_Add_LinhVuc", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<PTD_LinhVuc>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<PTD_LinhVuc>.Failure(ex.Message);
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
