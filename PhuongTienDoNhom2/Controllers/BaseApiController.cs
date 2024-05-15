//using CayXanhAPI.BAL;
//using CayXanhAPI.BAL.Interfaces;
//using CayXanhAPI.Domain;
//using CayXanhAPI.Domain.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using MediatR;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using Application.TepKemTheo;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text.RegularExpressions;
using System.Diagnostics;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace API.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        private const string authUrl = "https://user.thuathienhue.gov.vn/";
        //private const string authUrl = "https://demouser.thuathienhue.gov.vn/";
        private const string authCitizenUrl = "https://tuongtac.thuathienhue.gov.vn/";
        //private UserInfo _userInfo;
        //private UserInfo _user;
        private bool _IsValid;
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        private int _userCount;
        private string AuthenticationType;
        private static readonly Encoding TextEncoder = Encoding.UTF8;
        private static readonly HashAlgorithm Hasher = SHA384.Create();
        private readonly Application.TepKemTheo.DanhSachFile _tepKemTheoRepository;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private const int ClockSkew = 5; // in minutes; default for clock skew
        private const int SessionTokenTtl = 60; // in minutes = 1 hour
        private const int RenewalTokenTtl = 14; // in days = 2 weeks
        private const string SessionClaimType = "sid";
        //private readonly UserManager<ApplicationUser> userManager;

        //private static readonly ILog Logger = LoggerSource.Instance.GetLogger(typeof(BaseServiceController));
        public const string AuthScheme = "Bearer";
        public string SchemeType => "JWT";

        public BaseApiController( IWebHostEnvironment hostingEnvironment)//, UserManager<ApplicationUser> userManager)
                                                                          //ITepKemTheoRepository tepKemTheoRepository

        {
            //_tepKemTheoRepository = tepKemTheoRepository;
            //this.userManager = userManager;
            _hostingEnvironment = hostingEnvironment;
        }

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null)
                return NotFound();
            if (result.IsSuccess && result.Value != null)
            {
                return Ok(result.Value);
            }
            if (result.IsSuccess && result.Value == null)
                return NotFound();

            return BadRequest(result.Error);
        }

        protected async Task<string> SaveSingleFileUpload(IFormFile _file, string subDirectory)
        {
            var target = Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory);
            Directory.CreateDirectory(target);

            if (_file.Length <= 0)
                return string.Empty;
            string fileName = _file.FileName;
            string filePath = Path.Combine(target, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await _file.CopyToAsync(stream);
            }

            return $"{subDirectory}\\{fileName}";
        }
        protected async Task<List<TepKemTheo>> SaveFileUpload(List<IFormFile> files, Guid idObj, string targetDirectory, string pathdb, string MoTa)
        {
            var uploadedFiles = new List<TepKemTheo>();

            foreach (var file in files)
            {
                if (file.Length <= 0) continue;

                string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString() + DateTimeOffset.UtcNow.Millisecond;
                string fileName = file.FileName;
                int idx = fileName.LastIndexOf('.');
                string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
                var filePath = Path.Combine(targetDirectory, newFileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);

                    TepKemTheo e = new TepKemTheo
                    {
                        MaDoiTuong = idObj,
                        MoTa = MoTa,
                        NoiLuuTru = $"{pathdb}/{newFileName}"
                    };

                    uploadedFiles.Add(e);
                }
            }

            return uploadedFiles;
        }
        //
        //protected async Task<List<QLCX_TepKemTheo>> SaveFileUploadNew(List<IFormFile> files, Guid idObj, string targetDirectory, string pathdb, Guid BaoCaoID, string tennhanvien)
        //{
        //    var uploadedFiles = new List<QLCX_TepKemTheo>();

        //    foreach (var file in files)
        //    {
        //        if (file.Length <= 0) continue;

        //        string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
        //        string fileName = file.FileName;
        //        int idx = fileName.LastIndexOf('.');
        //        string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
        //        var filePath = Path.Combine(targetDirectory, newFileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);

        //            QLCX_TepKemTheo e = new QLCX_TepKemTheo
        //            {
        //                MaDoiTuong = idObj,
        //                TenTep = file.FileName,
        //                NoiLuuTru = $"{pathdb}/{newFileName}",
        //                BaoCaoID = BaoCaoID,
        //                TenNhanVien = tennhanvien
        //            };

        //            uploadedFiles.Add(e);
        //        }
        //    }

        //    return uploadedFiles;
        //}

        //savefilesingle
        protected async Task<string> SaveFileUploadSingleMain(IFormFile file, string targetDirectory, string pathdb)
        {
            if(file==null) return null;
            string noiluutru = "";
            string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();
            
            string fileName = file.FileName;
            int idx = fileName.LastIndexOf('.');
            string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
            var filePath = Path.Combine(targetDirectory, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);

                noiluutru = $"{pathdb}/{newFileName}";
            }

            return noiluutru;
        }

        protected async Task<int> DeletePhysicalFile (Guid ID)
        {
            var result = await Mediator.Send(new DanhSachFile.Query { IdDoiTuong = ID });
            var resultObj = result.Value.ToList();
            var vanbanPath = "wwwroot";
            if (resultObj.Count > 0 && resultObj != null)
            {
                foreach (var item in resultObj)
                {
                    await Mediator.Send(new Delete.Command { ID = item.MaTep });
                    string fullPath = item.NoiLuuTru;
                    if (fullPath != null)
                    {
                        string oldFilePath = Path.Combine(vanbanPath, fullPath);
                        if (System.IO.File.Exists(oldFilePath))
                        {
                            // Nếu tồn tại, xóa file cũ
                            System.IO.File.Delete(oldFilePath);
                        }
                    }
                }
                return 0;
            }
            return 1;
        }
        //public async Task<Result<QLCX_TepKemTheo>> SaveFileUpload(List<IFormFile> files, Guid idObj, string subDirectory,string pathdb)
        //{
        //    var target = Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory);
        //    Directory.CreateDirectory(target);
        //    QLCX_TepKemTheo results = new QLCX_TepKemTheo();
        //    for (int i = 0; i < files.Count; i++)
        //    {
        //        IFormFile file = files[i];
        //        if (file.Length <= 0) continue;
        //        string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

        //        string fileName = file.FileName;
        //        int idx = fileName.LastIndexOf('.');
        //        string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
        //        var filePath = Path.Combine(target, newFileName);

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);

        //            QLCX_TepKemTheo e = new QLCX_TepKemTheo
        //            {
        //                DoiTuongSoHuu = idObj,
        //                TenTep = file.FileName,
        //                NoiLuuTru = $"{pathdb}\\{newFileName}"
        //            };
        //            var cc = await Mediator.Send(new Application.TepKemTheo.Insert.Command { Entity = e });

        //            if (!cc.IsSuccess)
        //            {
        //                // Nếu việc lưu dữ liệu vào cơ sở dữ liệu không thành công, bạn có thể xử lý lỗi tại đây.
        //                // Ví dụ: Ghi log, trả về lỗi, hoặc xử lý tùy theo logic ứng dụng của bạn.

        //            }

        //            results.Add(e);
        //        }
        //    }
        //    return Result<QLCX_TepKemTheo>.Success(results);
        //    //files.ForEach(async file =>
        //    //{
        //    //    if (file.Length <= 0) return;
        //    //    string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

        //    //    string fileName = file.FileName;
        //    //    int idx = fileName.LastIndexOf('.');
        //    //    string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
        //    //    var filePath = Path.Combine(target, $"{newFileName}");

        //    //    using (var stream = new FileStream(filePath, FileMode.Create))
        //    //    {
        //    //        await file.CopyToAsync(stream);

        //    //        QLCX_TepKemTheo e = new QLCX_TepKemTheo
        //    //        {
        //    //            DoiTuongSoHuu = idObj,
        //    //            TenTep = file.FileName,
        //    //            NoiLuuTru = $"{pathdb}\\{newFileName}"
        //    //        };
        //    //        await Mediator.Send(new Insert.Command {Entity =e});
        //    //    }
        //    //});
        //}


        //protected void OverWriteFileUpload(List<IFormFile> files, Guid idObj, string subDirectory)
        //{
        //    var target = Path.Combine(_hostingEnvironment.ContentRootPath, subDirectory);
        //    Directory.CreateDirectory(target);

        //    files.ForEach(async file =>
        //    {
        //        if (file.Length <= 0) return;
        //        string pre = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds().ToString();

        //        string fileName = file.FileName;
        //        int idx = fileName.LastIndexOf('.');
        //        string newFileName = $"{fileName.Substring(0, idx)}_{pre}{fileName.Substring(idx)}";
        //        var filePath = Path.Combine(target, $"{newFileName}");

        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await file.CopyToAsync(stream);

        //            QLCX_TepKemTheo e = new QLCX_TepKemTheo
        //            {
        //                MaDoiTuong = idObj,
        //                NoiLuuTru = $"{subDirectory}\\{newFileName}"
        //            };
        //            await Mediator.Send(new Application.TepKemTheo.OverWrite.Command { Entity = e });
        //            //await _tepKemTheoRepository.OverWrite(e);
        //        }
        //    });
        //}
        

        protected async Task<Result<int>> DeleteFile(int ID)
        {   
   
            return await Mediator.Send(new Application.TepKemTheo.Delete.Command {ID=ID});
            //return _tepKemTheoRepository.Delete(ID);
        }
        //[Authorize]
        //[HttpGet("api/accounts/GetProfile", Name = "GetProfile")]
        //public async Task<IActionResult> GetProfile()
        //{
        //    var userName = ((ClaimsIdentity)User.Identity).FindFirst("UserName").Value;
        //    var user = await userManager.FindByNameAsync(userName);
        //    //ClaimsPrincipal currentUser = this.User;
        //    //var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;


        //    return new OkObjectResult(user);
        //}

        //[Authorize]
        //[HttpGet]
        //public async Task<IActionResult> GetProfile()
        //{
        //    var userID = ((ClaimsIdentity)User.Identity).Name;
        //    var user = await userManager.FindByNameAsync(userID);
        //    //ClaimsPrincipal currentUser = this.User;
        //    //var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;


        //    return Ok(new
        //    {
        //        name = user.UserName

        //    });
        //}

        protected async Task<Result<Domain.NhanVien>> GetProfile()
        {
            var name = ((ClaimsIdentity)User.Identity).Name;
            var nhanvien = await Mediator.Send(new Application.TepKemTheo.GetNhanVien.Query {tendangnhap= name});
            //QLCX_NhanVien nhanvien = await _tepKemTheoRepository.GetNhanVien(name);
            return nhanvien;
        }
        protected string VerifyUserFromToken(HttpRequest Request)
        {

            var re = Request;
            var headers = re.Headers;
            string token = string.Empty;

            string appCode = string.Empty;
            if (headers.ContainsKey("token"))
            {
                token = Request.Headers.FirstOrDefault(x => x.Key == "token").Value.FirstOrDefault();
            }

            //token = "8E-B9-49-56-83-D3-13-6B-DE-A8-E7-9F-39-9E-18-25-08-0C-20-19";
            if (!string.IsNullOrEmpty(token))
            {
                //token = "hienta.ttcntt";
                // thực hiện kiểm tra token xem có đúng giá trị trả về hay không?
                HttpClient client = new HttpClient();
                string url = string.Empty;
                if (appCode.Equals("HueS"))
                {
                    client.BaseAddress = new Uri(authCitizenUrl);
                    url = "dichvu/AuthenToken/Validate";
                }
                else
                {
                    client.BaseAddress = new Uri(authUrl);
                    url = "api/AuthenToken/Validate";
                }
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Add("token", token.ToString());
                //ServicePointManager.Expect100Continue = true;
                //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls
                //       | SecurityProtocolType.Tls11
                //       | SecurityProtocolType.Tls12
                //       | SecurityProtocolType.Ssl3;
                HttpResponseMessage response = client.GetAsync(url).Result;
                string value = "";
                if (response.IsSuccessStatusCode)
                {
                    using (HttpContent content = response.Content)
                    {
                        Task<string> result = content.ReadAsStringAsync();
                        value = result.Result;
                        if (value != "")
                        {
                            JObject o = JObject.Parse(value);
                            bool sucessToken = (bool)o["Success"];
                            if (sucessToken)
                            {
                                string username = "";
                                username = (string)o["Token"];
                                return username;
                            }
                            else
                                return null;// Request.CreateResponse(HttpStatusCode.OK, new ErrorCode() { Id = "1", Message = "Token của bạn không hợp lệ!" }, "application/json");
                        }
                        return null;// Request.CreateResponse(HttpStatusCode.OK, "");
                    }
                }
                else
                    return null;// Request.CreateResponse(HttpStatusCode.OK, new ErrorCode() { Id = "2", Message = "" }, "application/json");
            }
            else
                return null;// Request.CreateRe
        }

        //test get polygon
        protected  double[][] ConvertPolygon(string input)
        {
            string polygonString = input;

            // Loại bỏ các ký tự không cần thiết
            string cleanPolygon = Regex.Replace(polygonString, @"[^0-9\s.,-]", "");

            // Phân tách chuỗi thành các cặp tọa độ
            string[] coordinates = cleanPolygon.Split(new char[] { ' ', ',' }, StringSplitOptions.RemoveEmptyEntries);

            // Chuyển đổi và tạo mảng hai chiều
            List<double[]> polygonArray = new List<double[]>();

            for (int i = 0; i < coordinates.Length; i += 2)
            {
                double x = double.Parse(coordinates[i]);
                double y = double.Parse(coordinates[i + 1]);
                polygonArray.Add(new double[] { x, y });
            }

            // In ra mảng kết quả
            return polygonArray.ToArray();
        }

    }
}
