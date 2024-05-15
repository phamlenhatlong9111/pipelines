using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class NhanVien
    {
        public int ID { get; set; }
        public int MaNhom { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; } 
        public int Quyen { get; set; }
        public string TrangThai { get; set; }
        public string AnhDaiDien { get; set; }
        public string VaiTro { get; set; }
        public string TenNhom { get; set; }
        public string Role { get; set; }
        public string RoleId { get; set; }
    }
    public class NhanVienAdd
    {
        public int ID { get; set; }
        public int MaNhom { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public List<string> Quyen { get; set; }
        public string TrangThai { get; set; }
        public string AnhDaiDien { get; set; }
        public string VaiTro { get; set; }

        //public class Command : global::MediatR.IRequest<object>
        //{
        //    public QLKH_NhanSu NhanSu { get; set; }
        //}
    }

    public class NhanVienBasic
    {
        public int ID { get; set; }
        public string HoTen { get; set; }
        public string TenDangNhap { get; set; }
        public string TenNhom { get; set; }
    }
    public class GetToken
    {
        public string Username { get; set; }
        public string PassWord { get; set; }
    }
    public class RequestChangePassWord
    {
        public string Username { get; set; }
        public string PassWordOld { get; set; }
        public string PassWordNew { get; set; }
    }
    public class StringToken
    {
        public string Token { get; set; }
        public int ID { get; set; }
        public int MaNhom { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }        
        public string TrangThai { get; set; }
        public string AnhDaiDien { get; set; }
        public string VaiTro { get; set; }
        public List<RoleModel> Roles { get; set; }
        public string TenNhom { get; set; }

    }
    public class ResultPassWord
    {
        public string Notification { get; set; }
    }
    public class RoleModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
