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
    public class Add
    {
        public class Command : IRequest<Result<NhanSu>>
        {
            public NhanSu NhanSu { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<NhanSu>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<NhanSu>> Handle(Command request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PDepartmentId", request.NhanSu.DepartmentId);
                        parameters.Add("@PFullName", request.NhanSu.FullName);
                        parameters.Add("@PEnabled", request.NhanSu.Enabled);
                        parameters.Add("@PAvatar", request.NhanSu.Avatar);
                        parameters.Add("@POrganizationId", request.NhanSu.OrganizationId);
                        parameters.Add("@PUsername", request.NhanSu.Username);
                        parameters.Add("@POrganizationName", request.NhanSu.OrganizationName);
                        parameters.Add("@PIsLeaderOrg", request.NhanSu.IsLeaderOrg);
                        parameters.Add("@PIsLeaderDep", request.NhanSu.IsLeaderDep);
                        parameters.Add("@POrganizationUniqueCode", request.NhanSu.OrganizationUniqueCode);
                        parameters.Add("@PDepartmentName", request.NhanSu.DepartmentName);
                        parameters.Add("@POrgTitle", request.NhanSu.OrgTitle);
                        parameters.Add("@PDepTitle", request.NhanSu.DepTitle);
                        parameters.Add("@PDongBo", 0);
                        parameters.Add("@PMatKhau", request.NhanSu.MatKhau);
                        var result = await connettion.QueryFirstOrDefaultAsync<NhanSu>("SP_NHANVIEN_PHONGBAN_THEMMOI", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Thêm mới nhân viên không thành công");
                        }
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
