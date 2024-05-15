using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_NhanVienKDHCTN
    {
        public Guid MaNhanVien { get; set; }
        public Guid MaToChuc { get; set; }
        public string HoTen { get; set; }
        public short GioiTinh { get; set; }
        public DateTime? NamSinh { get; set; }
        public string NguyenQuan { get; set; }
        public string NoiCuTru { get; set; }
        public bool VienChuc { get; set; }
        public string TrinhDo { get; set; }
        public string KinhNghiem { get; set; }
        public string SoHieuKDV { get; set; }
        public string NoiCap { get; set; }
        public DateTime? NgayCap { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string TepKemTheo { get; set; }
        public bool TrangThai { get; set; }
    }

    public class PTD_NhanVienKDHCTNAddModel
    {
        public Guid MaToChuc { get; set; }
        public string HoTen { get; set; }
        public short GioiTinh { get; set; }
        public DateTime? NamSinh { get; set; }
        public string NguyenQuan { get; set; }
        public string NoiCuTru { get; set; }
        public bool VienChuc { get; set; }
        public string TrinhDo { get; set; }
        public string KinhNghiem { get; set; }
        public string SoHieuKDV { get; set; }
        public string NoiCap { get; set; }
        public DateTime? NgayCap { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string TepKemTheo { get; set; }
        public bool TrangThai { get; set; }
    }

    public class PTD_NhanVienKDHCTNCheckModel
    {
        public Guid MaToChuc { get; set; }
        public string SoHieuKDV { get; set; }
    }

}
