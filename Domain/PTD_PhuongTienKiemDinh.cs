using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_PhuongTienKiemDinh
    {
        public int MaPhuongTien { get; set; }
        public Guid MaToChuc { get; set; }
        public int MaNhom2 { get; set; }
        public string TenPhuongTien { get; set; }
        public DateTime? NamSanXuat { get; set; }
        public DateTime? NamSuDung { get; set; }
        public string NuocSanXuat { get; set; }
        public string HangSanXuat { get; set; }
        public string SoSanXuat { get; set; }
        public string KieuKyHieu { get; set; }
        public string PhamViDo { get; set; }
        public string CapDoChinhXac { get; set; }
        public string QuyTrinhSuDung { get; set; }
        public short LinhVuc { get; set; }
        public string NoiKiemDinh { get; set; }
        public string SoGiayChungNhan { get; set; }
        public DateTime? NgayCap { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string TepKemTheo { get; set; }   
        public bool TrangThai { get; set; }
    }

    public class PTD_PhuongTienKiemDinhViewModel
    {
        public int MaPhuongTien { get; set; }
        public Guid MaToChuc { get; set; }
        public int MaNhom2 { get; set; }
        public string TenPhuongTien { get; set; }
        public DateTime? NamSanXuat { get; set; }
        public DateTime? NamSuDung { get; set; }
        public string NuocSanXuat { get; set; }
        public string HangSanXuat { get; set; }
        public string SoSanXuat { get; set; }
        public string KieuKyHieu { get; set; }
        public string PhamViDo { get; set; }
        public string CapDoChinhXac { get; set; }
        public string QuyTrinhSuDung { get; set; }
        public short LinhVuc { get; set; }
        public string NoiKiemDinh { get; set; }
        public string SoGiayChungNhan { get; set; }
        public DateTime? NgayCap { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string TepKemTheo { get; set; }
        public bool TrangThai { get; set; }
        public string TenToChuc { get; set; }
        public string PhuongTienNhom2 { get; set; }
        public string TenQuocGia { get; set; }
    }

    public class PTD_PhuongTienKiemDinhAddModel
    {
        public Guid MaToChuc { get; set; }
        public int MaNhom2 { get; set; }
        public string TenPhuongTien { get; set; }
        public DateTime? NamSanXuat { get; set; }
        public DateTime? NamSuDung { get; set; }
        public string NuocSanXuat { get; set; }
        public string HangSanXuat { get; set; }
        public string SoSanXuat { get; set; }
        public string KieuKyHieu { get; set; }
        public string PhamViDo { get; set; }
        public string CapDoChinhXac { get; set; }
        public string QuyTrinhSuDung { get; set; }
        public short LinhVuc { get; set; }
        public string NoiKiemDinh { get; set; }
        public string SoGiayChungNhan { get; set; }
        public DateTime? NgayCap { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string TepKemTheo { get; set; }
        public bool TrangThai { get; set; }
    }
}
