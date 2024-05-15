// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
#nullable disable

using System.ComponentModel.DataAnnotations;
using Application.JwtCommon;
//using Application.Nhanvien;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using QuanLyCayXanh.Common;


namespace QuanLyCayXanh.Areas.Identity.Pages.Account
{
    public class LoginModel : PageModel
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserStore<AppUser> _userStore;
        private readonly IUserEmailStore<AppUser> _emailStore;
        private readonly ILogger<LoginModel> _logger;
        private readonly IConfiguration _configuration;
        private readonly IMediator _mediator;
        private readonly RoleManager<AppRole> _roleManager;

        public LoginModel(SignInManager<AppUser> signInManager, ILogger<LoginModel> logger, UserManager<AppUser> userManager, IUserStore<AppUser> userStore, IConfiguration configuration, IMediator mediator, RoleManager<AppRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _userStore = userStore;
            _configuration = configuration;
            _logger = logger;
            _mediator = mediator;
            _roleManager = roleManager;

        }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [BindProperty]
        public InputModel Input { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public IList<AuthenticationScheme> ExternalLogins { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public string ReturnUrl { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        [TempData]
        public string ErrorMessage { get; set; }

        /// <summary>
        ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
        ///     directly from your code. This API may change or be removed in future releases.
        /// </summary>
        public class InputModel
        {
            /// <summary>
            ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
            ///     directly from your code. This API may change or be removed in future releases.
            /// </summary>
            [Required(ErrorMessage = "Tài khoản không được bỏ trống!")]
            public string Email { get; set; }

            /// <summary>
            ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
            ///     directly from your code. This API may change or be removed in future releases.
            /// </summary>
            [Required(ErrorMessage = "Mật khẩu không được bỏ trống!")]
            [DataType(DataType.Password)]
            public string Password { get; set; }

            /// <summary>
            ///     This API supports the ASP.NET Core Identity default UI infrastructure and is not intended to be used
            ///     directly from your code. This API may change or be removed in future releases.
            /// </summary>
            public int SSO { get; set; }
        }

        public async Task OnGetAsync(string returnUrl = null)
        {
            if (!string.IsNullOrEmpty(ErrorMessage))
            {
                ModelState.AddModelError(string.Empty, ErrorMessage);
            }

            returnUrl ??= Url.Content("~/");

            // Clear the existing external cookie to ensure a clean login process
            await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            ReturnUrl = returnUrl;
        }

        public async Task<IActionResult> OnPostAsync(string returnUrl = null)
        {
            returnUrl ??= Url.Content("~/CMS");

            ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList();

            /*AppUser user1 = new AppUser
            {
                Email = Input.Email,
                UserName = Input.Email,
                GroupId = 1,
                ChucDanhId = 1,
              
            };

            await _userStore.SetUserNameAsync(user1, Input.Email, CancellationToken.None);
            *//*await _emailStore.SetEmailAsync(user1, Input.Email, CancellationToken.None);*//*
            var result1 = await _userManager.CreateAsync(user1, Input.Password);
            if(result1 != null)
            {
                _logger.LogInformation("Tao thanh cong");
            }*/
            if (Input.SSO == 0)
            {
                if (ModelState.IsValid)
                {
                    // Đăng nhập bằng API HueS 
                    var result = SSOHueSCommon.DangNhap(new LoginSSOHueSModel
                    {
                        Username = Input.Email,
                        Password = Input.Password,
                        AppCode = "HSCV",
                    });

                    if (result != null)
                    {
                        // Tạo mới người dùng
                        //string mauser = $"{DateTime.Now.ToString("yyyyMMddHHmmss").Trim()}";
                        var user = await _userManager.FindByNameAsync(Input.Email);
                        string pass = "Abc@123";
                        //var email = await _userManager.FindByEmailAsync(result.Email);

                        // duy nhất
                        //if (user == null)
                        //{
                            // Nếu tồn tại với username thì đăng nhâp không thì thêm mới
                            if (user != null)
                            {
                                await _signInManager.SignInAsync(user, true, null);
                                //GetToken e = new GetToken();
                                //e.Username = Input.Email;
                                //e.PassWord = "Abc@123";
                                _logger.LogInformation("Đăng nhập thành công");
                            //var randomValue = Guid.NewGuid().ToString();

                            //HttpContext.Response.Cookies.Append("TokenJWT", randomValue, new CookieOptions
                            //{
                            //    Expires = DateTimeOffset.Now.AddMinutes(30),
                            //    HttpOnly = true,
                            //    Secure = true
                            //});
                            //var api = await _mediator.Send(new GenerateToken.Command { Entity = e });
                            //var TokenJWT = api.Value.Token;
                            ////string TokenJWT = "123";
                            //HttpContext.Response.Cookies.Append("TokenJWT", TokenJWT, new CookieOptions
                            //{
                            //    //Expires = DateTimeOffset.Now.AddHours(1), // Thời gian sống của cookie (ví dụ: 1 giờ)
                            //    Expires = DateTimeOffset.Now.AddMinutes(30),
                            //    HttpOnly = true, // Đảm bảo cookie chỉ được truy cập bằng HTTP (không được truy cập từ mã JavaScript)
                            //    Secure = true // Đảm bảo cookie chỉ được gửi qua HTTPS (nếu trang web được gửi qua HTTPS)
                            //});
                        }
                            else
                            {
                                // Create User
                                user = new AppUser()
                                {
                                    Email = result.Email,
                                    UserName = Input.Email,
                                    GroupId = 1,
                                    ChucDanhId = 1,
                                };
                            // Tao Nhan vien
                            var resultAdd = await _userManager.CreateAsync(user, pass);
                                //dang nhap sau khi tao
                                if (resultAdd.Succeeded)
                                {
                                    await _signInManager.SignInAsync(user, true, null);
                                    //GetToken e = new GetToken();
                                    //e.Username = Input.Email;
                                    //e.PassWord = "Abc@123"; 
                                    _logger.LogInformation("Đăng nhập thành công");
                                //var randomValue = Guid.NewGuid().ToString();

                                //HttpContext.Response.Cookies.Append("TokenJWT", randomValue, new CookieOptions
                                //{
                                //    Expires = DateTimeOffset.Now.AddMinutes(30),
                                //    HttpOnly = true,
                                //    Secure = true
                                //});
                                //var api = await _mediator.Send(new GenerateToken.Command { Entity = e });
                                //var TokenJWT = api.Value.Token;
                                ////string TokenJWT = "123";
                                //HttpContext.Response.Cookies.Append("TokenJWT", TokenJWT, new CookieOptions
                                //{
                                //    //Expires = DateTimeOffset.Now.AddHours(1), // Thời gian sống của cookie (ví dụ: 1 giờ)
                                //    Expires = DateTimeOffset.Now.AddMinutes(30),
                                //    HttpOnly = true, // Đảm bảo cookie chỉ được truy cập bằng HTTP (không được truy cập từ mã JavaScript)
                                //    Secure = true // Đảm bảo cookie chỉ được gửi qua HTTPS (nếu trang web được gửi qua HTTPS)
                                //});
                                /*var role = await _roleManager.FindByIdAsync("3");
                                if (role != null)
                                {
                                    await _userManager.AddToRoleAsync(user, role.Name);
                                }*/
                                //QLCX_NhanVienAdd nhanVienAdd = new QLCX_NhanVienAdd();
                                //nhanVienAdd.HoTen = result.FullName;
                                //nhanVienAdd.TenDangNhap = result.Email;
                                //nhanVienAdd.MatKhau = pass;
                                //nhanVienAdd.DiaChi = result.Address;
                                //nhanVienAdd.DienThoai = result.CellPhone;
                                //nhanVienAdd.HopThu = result.Email;
                                //nhanVienAdd.VaiTro = "1";
                                //nhanVienAdd.TrangThai = "1";
                                //Thêm mới user tương ứng 
                                //var insertNhanVien = await _mediator.Send(new InsertNhanVien.Command { Entity = nhanVienAdd });


                                //if (insertNhanVien != null)
                                //{
                                //    // Đăng nhập                                      
                                //    await _signInManager.SignInAsync(user, true, null);
                                //}
                            }
                                
                            //}
                           
                        }
                        return LocalRedirect(returnUrl);
                    }
                   
                }
            }
            else
            {
                if (ModelState.IsValid)
                {
                    var user = await _userManager.FindByNameAsync(Input.Email);
                    if (user != null)
                    {
                        // This doesn't count login failures towards account lockout
                        // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                        var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, true, lockoutOnFailure: false);
                        if (result.Succeeded)
                        {
                            _logger.LogInformation("Đăng nhập thành công");
                            //var randomValue = Guid.NewGuid().ToString();

                            //HttpContext.Response.Cookies.Append("TokenJWT", randomValue, new CookieOptions
                            //{
                            //    Expires = DateTimeOffset.Now.AddMinutes(30),
                            //    HttpOnly = true,
                            //    Secure = true
                            //});
                            //GetToken e = new GetToken();
                            //e.Username = Input.Email;
                            //e.PassWord = Input.Password;
                            //_logger.LogInformation("Đăng nhập thành công");

                            //var api = await _mediator.Send(new GenerateToken.Command { Entity = e });
                            //var TokenJWT = api.Value.Token;
                            ////string TokenJWT = "123";
                            //HttpContext.Response.Cookies.Append("TokenJWT", TokenJWT, new CookieOptions
                            //{
                            //    //Expires = DateTimeOffset.Now.AddHours(1), // Thời gian sống của cookie (ví dụ: 1 giờ)
                            //    Expires = DateTimeOffset.Now.AddMinutes(30),
                            //    HttpOnly = true, // Đảm bảo cookie chỉ được truy cập bằng HTTP (không được truy cập từ mã JavaScript)
                            //    Secure = true // Đảm bảo cookie chỉ được gửi qua HTTPS (nếu trang web được gửi qua HTTPS)
                            //});
                            return LocalRedirect(returnUrl);
                        }
                        if (result.RequiresTwoFactor)
                        {
                            return RedirectToPage("./LoginWith2fa", new { ReturnUrl = returnUrl, RememberMe = true });
                        }
                        if (result.IsLockedOut)
                        {
                            _logger.LogWarning("Tài khoản của bạn bị khoá!");
                            return RedirectToPage("./Login");
                        }
                        else
                        {
                            ModelState.AddModelError(string.Empty, "Sai tên đăng nhập hoặc mật khẩu!");
                            return Page();
                        }
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, "Sai tên đăng nhập hoặc mật khẩu!");
                        return Page();
                    }
                }

            }

            // If we got this far, something failed, redisplay form
            return Page();
        }
    }
}
