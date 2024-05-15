using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_PhuongTienDo
    {
        public int MaPhuongTien { get; set; }
        public int? MaCoSo { get; set; }
        public int MaNhom2 { get; set; }
        public Guid? MaToChucTiepNhan { get; set; }
        public string TenPhuongTien { get; set; }
        public string NuocSanXuat { get; set; }
        public string HangSanXuat { get; set; }
        public string NamSanXuat { get; set; }
        public string NamSuDung { get; set; }
        public string SoSanXuat { get; set; }
        public string KieuKyKieu { get; set; }
        public string DacTrungKyThuat { get; set; }
        public string NoiSuDung { get; set; }
        public int TrangThai { get; set; }
        public int MaDonVi { get; set; }
        public int MaKieu { get; set; }
        public int MaLinhVuc { get; set; }
        public int PheDuyetMau { get; set; }
        public int KiemDinhBanDau { get; set; }
        public int KiemDinhDinhKy { get; set; }
        public int KiemDinhSauSuaChua { get; set; }
        public int ChuKyKiemDinh { get; set; }

    }

    public class PTD_PhuongTienDoGets
    {
        public int MaPhuongTien { get; set; }
        public int MaCoSo { get; set; }
        public int MaNhom2 { get; set; }
        public int MaKieu { get; set; }
        public string MaToChucTiepNhan { get; set; }
        public string TenPhuongTien { get; set; }
        public string NuocSanXuat { get; set; }
        public string HangSanXuat { get; set; }
        public DateTime NamSanXuat { get; set; }
        public DateTime NamSuDung { get; set; }
        public string SoSanXuat { get; set; }
        public string KieuKyHieu { get; set; }
        public string DacTrungKyThuat { get; set; }
        public string NoiSuDung { get; set; }
        public int TrangThai { get; set; }
        public string TenKieu { get; set; }
        public int PheDuyetMau { get; set; }
        public int KiemDinhBanDau { get; set; }
        public int KiemDinhDinhKy { get; set; }
        public int KiemDinhSauSuaChua { get; set; }
        public int ChuKyKiemDinh { get; set; }
        public string TenLinhVuc { get; set; }
        public int MaLinhVuc { get; set; }
        public string DonVi { get; set; }
        public int MaDonViDo { get; set; }
    }
}
