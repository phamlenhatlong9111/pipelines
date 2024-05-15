using System;

namespace Domain.DTOs.RequestDtos
{
    public class ThemMoiNhiemVuRequest
    {
        public int LoaiNhiemVu { get; set; }
        public Guid? CayXanh { get; set; }
        public Guid HoatDong { get; set; }
        public string NgayKetThuc { get; set; }
        public int DoUuTien { get; set; }
        public string TenNhiemVu { get; set; }
        public string MoTa { get; set; }
        public int MaTuyen { get; set; }
    }
    public class ThemMoiNhiemVuRequestLapLich
    {
        public int LoaiNhiemVu { get; set; }
        public Guid? CayXanh { get; set; }
        public Guid HoatDong { get; set; }
        public string NgayKetThuc { get; set; }
        public string NgayBatDau { get; set; }
        public int DoUuTien { get; set; }
        public string TenNhiemVu { get; set; }
        public string MoTa { get; set; }
        public int MaLoai { get; set; }
        public string NguoiTao { get; set; }
        public int LaNhanVienThucHien { get; set; }
        public string DoiTuongDuocGiao { get; set; }
        public int MaTuyen { get; set; }
        public string DonViThoiGian { get; set; }
        public int KhoangLapLai { get; set; }
    }
}
