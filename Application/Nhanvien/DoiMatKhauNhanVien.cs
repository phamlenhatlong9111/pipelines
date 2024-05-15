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
    public class DoiMatKhauNhanVien
    {
        public class Command : IRequest<Result<NhanSu>>
        {
     
        public string Username { get; set; }
        public string NewPassword { get; set; }
   
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
                        
                        parameters.Add("@PUsername", request.Username);
                        parameters.Add("@PMatKhau", request.NewPassword); 
                        var result = await connettion.QueryFirstOrDefaultAsync<NhanSu>("SP_DOIMATKHAU_NHANVIEN_PHONGBAN", parameters, commandType: System.Data.CommandType.StoredProcedure);
                        if (result == null)
                        {
                            throw new Exception("Cập nhật nhân viên không thành công");
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
