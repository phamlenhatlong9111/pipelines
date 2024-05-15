using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class NhomMenu
    {
        public int ID { get; set; }
        public string TenNhom { get; set; }
        public string Icon { get; set; }
        public string TrangThai { get; set; }
        public string DuongDan { get; set; }
        public int ThuTuHienThi { get; set; }
        
    }
    public class NhomMenu_Menu
    {
        public int ID { get; set; }
        public int NhomMenuID { get; set; }
        public string Ten { get; set; }
        public string Icon { get; set; }
        public string TrangThai { get; set; }
        public string DuongDan { get; set; }

    }

    public class NhomMenuView : NhomMenu
    {
        public IEnumerable<NhomMenu_Menu> MenuDetail { get; set; }

    }
}
