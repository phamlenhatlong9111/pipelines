using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{

    public class PTD_DonViDo
    {
        public int MaLinhVuc {  get; set; }
        public int MaDonViDo { get; set; }
        public string Ten { get; set; }
        public string KyHieu { get; set; }
        public string DaiLuong { get; set; }
        public DateTime NgayTao { get; set; }
        public string TuKhoa { get; set; }
        public string TenLinhVuc { get; set; }
        public int TrangThai { get; set; }
    }

    public class PTD_DonViDoADD
    {
        public string Ten { get; set; }
        public string KyHieu { get; set; }
        public string DaiLuong { get; set; }
    }

}
