using Application.Core;
using API.Controllers;
using Dapper;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using System.Net;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace PhuongTienDoNhom2.ApiController
{
    public class DongBoPhongBanApiController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        public class SuccessResponse
        {
            public string Message { get; set; }
        }
        public DongBoPhongBanApiController(IWebHostEnvironment hostingEnvironment, IConfiguration configuration, DataContext context) : base(hostingEnvironment)
        {
            _configuration = configuration;
            _context = context;
        }
        [HttpGet]
        [Route("DongBoApi")]
        [AllowAnonymous]
        public async Task<IActionResult> DongBoApi()

        {
            //ServicePointManager.Expect100Continue = true;
            //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
            //       | SecurityProtocolType.Tls11
            //       | SecurityProtocolType.Tls12
            //       | SecurityProtocolType.Ssl3;

            // call api Thống kê số sản phẩm có tham gia sàn
            //orgobj.ID;
            var idOrg = "00.59.H57";
            var client = new RestClient("https://egovapi.thuathienhue.gov.vn/v3/API/eGovData/EmployeeAPI/getEmployeeInOrganizationByUniqueCode?UniqueCode=" + idOrg);
            client.Timeout = -1;
            var request = new RestRequest(Method.GET);
            request.AddHeader("Cookie", ".ASPXANONYMOUS=tCM6C_NBynenC96xsCDk2Z1mBkfmWCktFNhvGEhiKQ5BoX7X9NT6-OoQS_SEGu1LOYJEX_vBIMfi-5-NhCCVOevrHqPrq1mBNo1ObFfQK5HCbaJm0; dnn_IsMobile=False; language=vi-VN");
            IRestResponse response = client.Execute(request);
            if (response.StatusCode == HttpStatusCode.OK)
            {
                string result = response.Content;

                var json = JsonConvert.DeserializeObject<NhanSuViewModel>(result);
                var data = json.data;
                var uniqueArray = data

            .GroupBy(item => item.DepartmentId)
            .Select(group => group.First())
            .ToList();

                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();
                    var result2 = await connection.ExecuteAsync("SP_PHONGBAN_DONGBO_RESET", commandType: System.Data.CommandType.StoredProcedure);
                    foreach (var item in uniqueArray)
                    {
                        try
                        {
                            DynamicParameters parameters = new DynamicParameters();

                            parameters.Add("@PDepartmentId", item.DepartmentId != null ? item.DepartmentId : Guid.NewGuid());
                            parameters.Add("@PDepartmentName", item.DepartmentName != null ? item.DepartmentName : "Phòng Giám Đốc");
                            parameters.Add("@PDongBo", true);
                            parameters.Add("@PSuDung", true);

                            var result1 = await connection.QueryFirstOrDefaultAsync<DongBo_PhongBan>("SP_PHONGBAN_DONGBO", parameters, commandType: System.Data.CommandType.StoredProcedure);

                            if (result1 == null)
                            {
                                throw new Exception("Đồng bộ không thành công");
                            }


                            //return Result<DongBo_PhongBan>.Success(result1);
                        }
                        catch (Exception ex)
                        {
                            throw new Exception("Đồng bộ không thành công");
                            //return Result<DongBo_PhongBan>.Failure(ex.Message);
                        }
                        finally
                        {
                            await connection.CloseAsync();
                        }
                    }
                }
                return Ok(new SuccessResponse { Message = "Đồng bộ thành công" });
            }
            else
            {
                return BadRequest();

            }



            //string result = response.Content;
            //var json = JsonConvert.DeserializeObject<QLKH_NhanSu>(result);

        }
    }
}
