using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class PTD_QuocGia
    {
        public string Id {  get; set; }
        public string MaQuocGia { get; set; }
        public string TenQuocGia { get; set; }        

    }
    public class PTD_QuocGiaThemMoi
    {
        public string TenQuocGia { get; set; }
    }
}
