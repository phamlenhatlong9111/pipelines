
namespace Domain.DTOs.RequestDtos
{
    public class CayXanhThemMoiRequest
    {
        public Guid Id { get; set; }
        public int mappingId { get; set; }
        public float? chieuCao { get; set; }
        public string dactinhsinhhoc { get; set; }
        public string soHieuCay { get; set; }
        public string baoTon { get; set; }
        public int maNhom { get; set; }
        public float? duongKinhTan { get; set; }
        public float? duongKinhThan { get; set; }
        public string ghiChu { get; set; }
        public string kinhDo { get; set; }
        public string viDo { get; set; }
        public int maChungLoaiCay { get; set; }
        public string maPhuongXa { get; set; }
        public int maQuyHoachKhuVucTrong { get; set; }
        public int maTuyen { get; set; }
        public int soHieuTrenTuyen { get; set; }
        public string tenChungLoaiCay { get; set; }
        public string tenPhuongXa { get; set; }
        public Guid? MaThamXanh { get; set; }
        public string daChatHa { get; set; }
        public float? ChuViThan { get; set; }
        public int LoaiCay { get; set; }
        public int? NamTrong { get; set; }

    }
    public class CayXanhRequest
    {
        public int MaPhanLoai { get; set; }
        public int MaNhom { get; set; }
        public int MaTuyen { get; set; }
        public int LoaiCay { get; set; }
        public int QuyHoachKhuVucTrong { get; set; }
        public string TenCay { get; set; }
        public string TenKhoaHoc { get; set; }
        public string HoThucVat { get; set; }
        public string MoTa { get; set; }
        public string SoHieu { get; set; }
        public string BangTen { get; set; }
        public string BoBaoVe { get; set; }
        public string CoThu { get; set; }
        public string BaoTon { get; set; }
        public string SauBenh { get; set; }
        public string NguyHiem { get; set; }
        public float? ChieuCao { get; set; }
        public float? DuongKinhThan { get; set; }
        public float? DuongKinhTan { get; set; }
        public string HinhThucTan { get; set; }
        public string DangLa { get; set; }
        public string MauLa { get; set; }
        public string MauHoa { get; set; }
        public string ThoiKyRungLa { get; set; }
        public string ThoiKyNoHoa { get; set; }
        public string DaChatHa { get; set; }
        public int ViaHe { get; set; }
        public int DaiPhanCach { get; set; }
        public int NutGiaoThong { get; set; }
        public int CongVien { get; set; }
        public int KhuCongCong { get; set; }
        public string GhiChu { get; set; }
        public int MappingID { get; set; }
    }
    public class QLCX_CapNhatThongTinSinhTruongCayXanh
    {
        public Guid ID { get; set; }
        public float? ChieuCao { get; set; }
        public float? DuongKinhThan { get; set; }
        public float? ChuViThan { get; set; }

    }
    public class QLCX_LoaiCayXanh
    {
        public int GiaTri { get; set; }
        public string HienThi { get; set; }
    }
}
