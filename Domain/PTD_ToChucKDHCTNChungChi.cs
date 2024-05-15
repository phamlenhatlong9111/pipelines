using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_ToChucKDHCTNChungChi
    {
        public int MaChungChi { get; set; }
        public Guid MaToChuc { get; set; }
        public short Loai { get; set; }
        public int TongSo { get; set; }
        public int SuDung { get; set; }
        public int HuHong { get; set; }
        public int TonKho { get; set; }
        public string GhiChu { get; set; }
        public string TepKemTheo { get; set; }
        
    }
    public class PTD_ToChucKDHCTNChungChiAddModel
    {
        public Guid MaToChuc { get; set; }
        public short Loai { get; set; }
        public int TongSo { get; set; }
        public int SuDung { get; set; }
        public int HuHong { get; set; }
        public int TonKho { get; set; }
        public string GhiChu { get; set; }
        public string TepKemTheo { get; set; }

    }


}
