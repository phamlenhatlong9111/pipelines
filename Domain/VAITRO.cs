using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class VAITRO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }

    }
    public class VAITRO_BY_ID
    {
        public int UserId { get; set; }
        public int  RoleId { get; set; }
        public string Name { get; set; }

    }
    public class CHUCNANG_BY_ID
    {
        public int UserId { get; set; }
        public int MenuId { get; set; }
        public string TenNhom { get; set; }
        public string DuongDan { get; set; }
        public string Name { get; set; }

    }
    public class VAITRO_NHANVIEN
    {

        public int UserId { get; set; }
        public string RoleId { get; set; }
    }
    public class CHUCNANG_NHANVIEN
    {
        public int UserId { get; set; }
        public string MenuIds { get; set; }
    }
}
