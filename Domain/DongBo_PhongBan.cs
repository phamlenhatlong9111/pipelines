using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class DongBo_PhongBan
    {
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool DongBo { get; set; }
        public bool SuDung { get; set; }
        public DateTime NgayCapNhat { get; set; }
    }
    public class PhongBanModel
    {
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool SuDung { get; set; }
        public bool DongBo { get; set; }
        public DateTime NgayCapNhat { get; set; }
    }
}
