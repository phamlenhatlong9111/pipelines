using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class NhanSuViewModel
    {

        public List<NhanSu> data { get; set; }
        public string message { get; set; }
        public int code { get; set; }

    }
    public class Check_NhanSu
    { 
        public string DisplayName { get; set; }
        public int Id { get; set; }
        public string UserName { get; set; }


    }
        public class NhanSu
    {
        public Guid ID { get; set; }
        public string FullName { get; set; }
        public bool? Enabled { get; set; }
        public string NickName { get; set; }
        public string Avatar { get; set; }
        public Guid? OrganizationId { get; set; }
        public Guid? DepartmentId { get; set; }
        public string Username { get; set; }
        public int UserID { get; set; }
        public string OrganizationName { get; set; }
        public string OrganizationUniqueCode { get; set; }
        public string DepartmentName { get; set; }
        public int? IsLeaderOrg { get; set; }
        public int? IsLeaderDep { get; set; }
        public Guid? StructOrganizationID { get; set; }
        public Guid? StructDepartmentID { get; set; }
        public string OrgTitle { get; set; }
        public string DepTitle { get; set; }
        public int? Orders { get; set; }
        public bool? DongBo { get; set; }
        public DateTime NgayCapNhat { get; set; }
        public int? Quyen { get; set; }
        public string MatKhau { get; set; }
    }
    public class NhanSu1
    {
        public Guid ID { get; set; }
        public string FullName { get; set; }
        public bool? Enabled { get; set; }
        public string Username { get; set; }
        public bool? DongBo { get; set; }
        public string DepartmentName { get; set; }
        public int? Quyen { get; set; }
        public string MatKhau { get; set; }
    }
}
