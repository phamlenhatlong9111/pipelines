using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_ToChucKDHCTN
    {
        public Guid MaToChuc { get; set; }
        public Guid MaToChucQuanLy { get; set; }
        public string MaDinhDanh { get; set; }
        public string TenToChuc { get; set; }
        public string GioiThieu { get; set; }
        public string DiaChi { get; set; }
        public string DiaDiemThucHien { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string NguoiLienHe { get; set; }
        public string ChucVu { get; set; }
        public string DienTichSuDung { get; set; }
        public string DieuKienMoiTruong { get; set; }
        public string DieuKienKhac { get; set; }
        public string SoGCNCCDV { get; set; }
        public string NoiCapGCN { get; set; }
        public DateTime NgayCapGCN { get; set; }
        public DateTime NgayHetHanGCN { get; set; }
        public int CapLanThu  { get; set; }
        public short LoaiGTPL { get; set; }
        public string SoGTPL { get; set; }
        public DateTime NgayCapGTPL { get; set; }
        public string NoiCapGTPL { get; set; }
        public int TrangThai { get; set; }
    }

    public class PTD_ToChucKDHCTNAddModel
    {
        public Guid MaToChucQuanLy { get; set; }
        public string MaDinhDanh { get; set; }
        public string TenToChuc { get; set; }
        public string GioiThieu { get; set; }
        public string DiaChi { get; set; }
        public string DiaDiemThucHien { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string NguoiLienHe { get; set; }
        public string ChucVu { get; set; }
        public string DienTichSuDung { get; set; }
        public string DieuKienMoiTruong { get; set; }
        public string DieuKienKhac { get; set; }
        public string SoGCNCCDV { get; set; }
        public string NoiCapGCN { get; set; }
        public DateTime NgayCapGCN { get; set; }
        public DateTime NgayHetHanGCN { get; set; }
        public int CapLanThu { get; set; }
        public short LoaiGTPL { get; set; }
        public string SoGTPL { get; set; }
        public DateTime NgayCapGTPL { get; set; }
        public string NoiCapGTPL { get; set; }
        public int TrangThai { get; set; }
    }

    public class PTD_ToChucKDHCTNCheckModel
    {
        public Guid MaToChucQuanLy { get; set; }
        public string MaDinhDanh { get; set; }
    }
}
