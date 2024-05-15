using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class HT_ToChucQuanLyModel
    {
        public Guid MaToChuc { get; set; }
        public string MaDinhDanh { get; set; }
        public string TenToChuc { get; set; }
        public string GioiThieu { get; set; }
        public string DiaChi { get; set; }
        public string DienThoai { get; set; }
        public string HopThu { get; set; }
        public string NguoiLienHe { get; set; }
        public string ChucVu { get; set; }
        public bool TrangThai { get; set; }   
    }
}
