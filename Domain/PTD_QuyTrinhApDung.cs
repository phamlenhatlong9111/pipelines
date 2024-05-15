using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_QuyTrinhApDung
    {
        public int MaQuyTrinh { get; set; }
        public Guid MaToChuc { get; set; }
        public string TenQuyTrinh { get; set; }
        public string SoKyHieu { get; set; }
        public DateTime NamBanHanh { get; set; }
        public string ToChucBanHanh { get; set; }
        public short? LinhVuc { get; set; }
        public bool TrangThai { get; set; }
        public string MoTa { get; set; }
        public string TepKemTheo { get; set; }
    }

    public class PTD_QuyTrinhApDungAddModel 
    {
        public Guid MaToChuc { get; set; }
        public string TenQuyTrinh { get; set; }
        public string SoKyHieu { get; set; }
        public DateTime? NamBanHanh { get; set; }
        public string ToChucBanHanh { get; set; }
        public int? LinhVuc { get; set; }
        public bool TrangThai { get; set; }
        public string MoTa { get; set; }
        public string TepKemTheo { get; set; }
    }

    public class PTD_QuyTrinhApDungViewModel
    {
        public int MaQuyTrinh { get; set; }
        public Guid MaToChuc { get; set; }
        public string TenQuyTrinh { get; set; }
        public string SoKyHieu { get; set; }
        public DateTime? NamBanHanh { get; set; }
        public string ToChucBanHanh { get; set; }
        public int? LinhVuc { get; set; }
        public bool TrangThai { get; set; }
        public string MoTa { get; set; }
        public string TepKemTheo { get; set; }
        public string TenToChuc { get; set; }
    }

    public class PTD_QuyTrinhApDungCheckModel
    {
        public Guid MaToChuc { get; set; }
        public string SoKyHieu { get; set; }
    }
}
