using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_NhanVienKDHCTNQuaTrinh
    {
        public int MaQuaTrinh { get; set; }
        public Guid MaNhanVien { get; set; }
        public bool CongTac { get; set; }
        public string NoiDung { get; set; }
        public short LinhVuc {  get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string ToChuc { get; set; }
    }

    public class PTD_NhanVienKDHCTNQuaTrinhAddModel
    {
        public Guid MaNhanVien { get; set; }
        public bool CongTac { get; set; }
        public string NoiDung { get; set; }
        public short LinhVuc { get; set; }
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string ToChuc { get; set; }
    }
}
