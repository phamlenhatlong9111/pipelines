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
    public class GetAll
    {
        public class Query : IRequest<Result<IEnumerable<NhanSu>>>
        {
            //public string TuKhoa { get; set; }
            public Guid? DepartmentId;
            public string FullName;
            public string DepartmentName;
            public bool? Enabled;
            public string Username;
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<NhanSu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }

            public async Task<Result<IEnumerable<NhanSu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PDepartmentId", request.DepartmentId);
                        parameters.Add("@PFullName", request.FullName);
                        parameters.Add("@PDepartmentName", request.DepartmentName);
                        parameters.Add("@PEnabled", request.Enabled);
                        parameters.Add("@PUsername", request.Username);

                        var result = await connettion.QueryAsync<NhanSu>("SP_NHANVIEN_PHONGBAN_DANHSACH", parameters, commandType: System.Data.CommandType.StoredProcedure);

                        return Result<IEnumerable<NhanSu>>.Success(result);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<NhanSu>>.Failure(ex.Message);
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
