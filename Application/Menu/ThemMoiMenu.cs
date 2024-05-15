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

namespace Application.Menu
{
    public class ThemMoiMenu
    {
        public class Command : IRequest<Result<NhomMenu_Menu>>
        {
            public NhomMenu_Menu Entity { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<NhomMenu_Menu>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<NhomMenu_Menu>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PIDCHA", request.Entity.NhomMenuID);
                        parameters.Add("@PTEN", request.Entity.Ten);
                        parameters.Add("@PICON", request.Entity.Icon);
                        parameters.Add("@PTRANGTHAI", request.Entity.TrangThai);
                        parameters.Add("@PDUONGDAN", request.Entity.DuongDan);
                        var result = await connettion.QueryFirstOrDefaultAsync<NhomMenu_Menu>("SP_MENU_THEMMOI", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        if (result == null)
                        {
                            throw new Exception("Thêm mới không thành công");
                        }

                        return Result<NhomMenu_Menu>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<NhomMenu_Menu>.Failure(ex.Message);
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
