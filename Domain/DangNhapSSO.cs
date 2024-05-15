using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class DangNhapSSO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string AppCode { get; set; }
    }
    public class LoginSSOHueSResponse
    {
        public bool Success { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public string Message { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string CellPhone { get; set; }
        public string Address { get; set; }
        public string OwnerCode { get; set; }
        public bool Gender { get; set; }
        public string Avatar { get; set; }
        public bool Verifyed { get; set; }
        public object IdentifierCode { get; set; }
        public int ErrCode { get; set; }
    }
    public class LoginSSOHueSModel
    {
        public string Username { get; set;}
        public string Password { get; set;}
        public string AppCode { get; set;}
    }
}
