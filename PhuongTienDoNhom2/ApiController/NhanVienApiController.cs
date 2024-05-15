using Application.Core;
using Application.NhanVien;
using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NhanVien.ApiController
{
    public class ChangePasswordModel
    {
        public string Username { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
    
    public class NhanVienApiController : BaseApiController
    {
        public class SuccessResponse
        {
            public string Message { get; set; }
        }
        private readonly UserManager<AppUser> _userManager;
        public NhanVienApiController(IWebHostEnvironment hostingEnvironment, UserManager<AppUser> userManager) : base(hostingEnvironment)
        {
            _userManager = userManager;
        }
        [HttpGet]
        [Route("KiemTraNhanVien")]
        [AllowAnonymous]

        public async Task<Result<IEnumerable<Check_NhanSu>>> KiemTraNhanVien(string UserName)
        {
            return await Mediator.Send(new Check.Query { UserName = UserName });
        }
        [HttpGet]
        [Route("KiemTraNhanVienPhongBan")]
        [AllowAnonymous]
        public async Task<Result<IEnumerable<NhanSu>>> KiemTraNhanVienPhongBan(string UserName)
        {
            return await Mediator.Send(new CheckNhanVienPhongBan.Query { UserName = UserName });
        }
        [HttpGet]
        [Route("DanhSachNhanVien")]
        [AllowAnonymous]

        public async Task<Result<IEnumerable<NhanSu>>> DanhSachNhanVien( Guid? DepartmentId,string FullName,string DepartmentName, string Username, bool? Enabled=null) 
        {
            return await Mediator.Send(new GetAll.Query {DepartmentId= DepartmentId, FullName=FullName, DepartmentName = DepartmentName, Enabled = Enabled, Username = Username });
        }
        [HttpPost]
        [Route("ThemMoiNhanVien")]

        public async Task<Result<NhanSu>> ThemNhanVien([FromForm] RequestUploadFileUpdateSingle _request)
        {
            NhanSu NhanSu = JsonConvert.DeserializeObject<NhanSu>(_request.data);
            const string avatarPath = "wwwroot\\upload\\avatar";
            const string pathdb = "upload\\avatar";
            var uploadedFiles = await SaveFileUploadSingleMain(_request.file, avatarPath, pathdb);
            NhanSu.Avatar = uploadedFiles;
            var themMoiNhanVien =  await Mediator.Send(new Add.Command { NhanSu = NhanSu });
            if (themMoiNhanVien.IsSuccess)
            {
                var user = await _userManager.FindByNameAsync(themMoiNhanVien.Value.Username);
            //await _userManager.AddToRolesAsync(user, new List<string>{ "Admin", "acv"});
            //await _userManager.RemoveFromRolesAsync(user, new List<string>{ "Admin", "acv"});
            //    await _userManager.AddToRoleAsync(user, "Admin");
                if (user != null)
                {
                    return Result<NhanSu>.Failure("Tên đăng nhập đã tồn tại");
                }
                else
                {
                    // Create User
                    user = new AppUser()
                    {
                        Email = NhanSu.Username,
                        UserName = NhanSu.Username
                    };
                    var resultAdd = await _userManager.CreateAsync(user, themMoiNhanVien.Value.MatKhau);
                    if (resultAdd.Succeeded)
                    {
                        return Result<NhanSu>.Success(themMoiNhanVien.Value);
                    }
                    else
                    {
                        return Result<NhanSu>.Failure("Thêm mới nhân viên không thành không");
                    }

                }

            }
            return Result<NhanSu>.Failure("Thêm mới nhân viên không thành không");
            // kiểm tra nhân viên ở bảng nhân viên với bảng user có tồn tại không


        }
        [HttpPut]
        [Route("CapNhatNhanVienKhongFile")]
        public async Task<Result<NhanSu>> CapNhatNhanVienKhongFile(NhanSu NhanSu)
        {
            var resultOld = await Mediator.Send(new Detail.Query { ID = NhanSu.ID });
            var user = await _userManager.FindByNameAsync(NhanSu.Username);
            var rs = await _userManager.ChangePasswordAsync(user, resultOld.Value.MatKhau, NhanSu.MatKhau);
            return await Mediator.Send(new Update.Command { NhanSu = NhanSu });
        
        }
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            var user = await _userManager.FindByNameAsync(model.Username);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Thực hiện xác thực mật khẩu cũ
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            var result1= await Mediator.Send(new DoiMatKhauNhanVien.Command {Username= model.Username, NewPassword= model.NewPassword});
            if (result.Succeeded && result1.IsSuccess)
            {
                return Ok(new SuccessResponse { Message = "Đổi mật khẩu thành công" });
            }

            return BadRequest(new SuccessResponse { Message = "Đổi mật khẩu thất bại" });
        }
        [HttpPut]
        [Route("CapNhatNhanVienCoFile")]
        public async Task<Result<NhanSu>> CapNhatNhanVien([FromForm] RequestUploadFileUpdateSingle _request)
        {
            NhanSu NhanSu = JsonConvert.DeserializeObject<NhanSu>(_request.data);
            const string avatarPath = "wwwroot\\upload\\avatar";
            const string pathdb = "upload\\avatar";
            var resultOld = await Mediator.Send(new Detail.Query { ID = NhanSu.ID });
            string fullPath = resultOld.Value.Avatar;
            string fileName = Path.GetFileName(fullPath);

            if (fullPath != null)
            {
                string oldFilePath = Path.Combine(avatarPath, fileName);
                if (System.IO.File.Exists(oldFilePath))
                {
                    // Nếu tồn tại, xóa file cũ
                    System.IO.File.Delete(oldFilePath);
                }
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, avatarPath, pathdb);
                NhanSu.Avatar = uploadedFiles;
            }
            else
            {
                var uploadedFiles = await SaveFileUploadSingleMain(_request.file, avatarPath, pathdb);
                NhanSu.Avatar = uploadedFiles;
                // Cập nhật thông tin vào cơ sở dữ liệu
            }
            var user = await _userManager.FindByNameAsync(NhanSu.Username);
            var rs =    await _userManager.ChangePasswordAsync(user, resultOld.Value.MatKhau, NhanSu.MatKhau);
            return await Mediator.Send(new Update.Command { NhanSu = NhanSu });
        }
        [HttpDelete]
        [Route("XoaNhanVien")]
        public async Task<Result<int>> XoaNhanVien(Guid ID)
        {
            try
            {
                var resultOld = await Mediator.Send(new Detail.Query { ID = ID });
                var user = await _userManager.FindByNameAsync(resultOld.Value.Username);
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);
                    if (result.Succeeded)
                    {
                        return await Mediator.Send(new Xoa.Command { ID = ID });
                        // Người dùng đã được xóa thành công
                    }
                    else
                    {
                        throw new Exception("Xóa người dùng không thành công");
                        // Xử lý lỗi khi không thể xóa người dùng
                    }
                }
                return await Mediator.Send(new Xoa.Command { ID = ID });
            }
            catch (Exception ex)
            {

                throw;
            }
        }
        [HttpGet]
        [Route("ChiTietNhanVien")]
        public async Task<Result<NhanSu>> ChiTietNhanVien(Guid ID)
        {
            return await Mediator.Send(new Detail.Query { ID = ID });
        }
    }

}
