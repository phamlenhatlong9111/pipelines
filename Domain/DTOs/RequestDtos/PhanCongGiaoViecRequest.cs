
namespace Domain.DTOs.RequestDtos
{
    public class PhanCongGiaoViecRequest
    {
        public string DanhSachNhiemVu { get; set; }
        public int IdNhanVien { get; set; }
    }
    public class GiaoNoiDungNhiemVuRequest
    {
        public string NhiemVuID { get; set; }
        public string NoiDung { get; set; }
        public int IdNhanVien { get; set; }
    }
}
