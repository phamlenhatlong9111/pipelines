﻿using System;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Application.Core;

namespace Application.PhuongTienDoNhom2
{
    public class Delete
    {
        public class Command : IRequest<Result<int>>
        {
            public int ID { get; set; }
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
                        parameters.Add("@PMaPhuongTien", request.ID);
                        var result = await connettion.ExecuteAsync("TDC_DELETE_PhuongTienDoNhom2", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result <= 0)
                        {
                            throw new Exception("Xóa không thành công");
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
