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
using Microsoft.AspNetCore.Identity;

namespace PhuongTienDoNhom2.ApiController
{
    public class DongBoNhanVienApiController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        public class SuccessResponse
        {
            public string Message { get; set; }
        }
        public DongBoNhanVienApiController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IWebHostEnvironment hostingEnvironment, IConfiguration configuration, DataContext context) : base(hostingEnvironment)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }
        [HttpGet]
        [Route("DongBoNhanVienApi")]
        [AllowAnonymous]
        public async Task<IActionResult> DongBoNhanVienApi()

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
                
                    using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                    {
                        await connection.OpenAsync();
                    var result2 = await connection.ExecuteAsync("SP_NHANVIEN_DONGBO_RESET", commandType: System.Data.CommandType.StoredProcedure);
                    foreach (var item in data)
                    {
                        try
                        {
                            DynamicParameters parameters = new DynamicParameters();

                            parameters.Add("@PUserID", item.UserID);
                            parameters.Add("@PDepartmentId", item.DepartmentId);
                            parameters.Add("@PID", item.ID);
                            parameters.Add("@PFullName", item.FullName);
                            parameters.Add("@PEnabled", item.Enabled);
                            parameters.Add("@PNickName", item.NickName);
                            parameters.Add("@PAvatar", item.Avatar);
                            parameters.Add("@POrganizationId", item.OrganizationId);
                            parameters.Add("@PUsername", item.Username);
                            parameters.Add("@POrganizationName", item.OrganizationName);
                            parameters.Add("@POrganizationUniqueCode", item.OrganizationUniqueCode);
                            parameters.Add("@PDepartmentName", item.DepartmentName);
                            parameters.Add("@PIsLeaderOrg", item.IsLeaderOrg);
                            parameters.Add("@PIsLeaderDep", item.IsLeaderDep);
                            parameters.Add("@PStructOrganizationID", item.StructOrganizationID);
                            parameters.Add("@PStructDepartmentID", item.StructDepartmentID);
                            parameters.Add("@POrgTitle", item.OrgTitle);
                            parameters.Add("@PDepTitle", item.DepTitle);
                            parameters.Add("@POrders", item.Orders);
                            parameters.Add("@PDongBo", 1);
                            var result1 = await connection.QueryFirstOrDefaultAsync<NhanSu>("SP_NHANVIEN_PHONGBAN_DONGBO", parameters, commandType: System.Data.CommandType.StoredProcedure);
                            
                            //tìm user trong hệ thống
                            var user = await _userManager.FindByNameAsync(item.Username);
                            string pass = "Abc@123";
                            //var email = await _userManager.FindByEmailAsync(result.Email);

                            // duy nhất
                            //if (user == null)
                            //{
                            // Nếu tồn tại với username thì đăng nhâp không thì thêm mới
                            if(user == null)
                            {
                                user = new AppUser()
                                {
                                    Email = item.Username,
                                    UserName = item.Username,
                                    GroupId = 1,
                                    ChucDanhId = 1,
                                };
                                var resultAdd = await _userManager.CreateAsync(user, pass);
                            }
                            if (result1 == null)
                            {
                                throw new Exception("Đồng bộ không thành công");
                            }
                            



                            //return Result<DongBo_PhongBan>.Success(result1);
                        }
                        catch (Exception ex)
                        {
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
