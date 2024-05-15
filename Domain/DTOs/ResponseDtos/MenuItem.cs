using System.Collections.Generic;

namespace Domain.DTOs.ResponseDtos
{
    public class MenuItem
    {
        public string Id { get; set; }
        public string ParentId { get; set; }
        public string MenuName { get; set; }
        public string Icon { get; set; }
        public string Path { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class MainMenu
    {
        public string Id { get; set; }
        public string TenNhom { get; set; }
        public string TrangThai { get; set; }
        public string DuongDan { get; set; }
        public int ThuTuHienThi { get; set; }
        public string MenuName { get; set; }
        public string Icon { get; set; }
        public string Path { get; set; }
        public string Pathhh { get; set; }
        public int DisplayOrder { get; set; }
        public List<MainMenu> SubMenus { get; set; } = new List<MainMenu>();
    }

    public class SubMenu
    {
        public string MenuName { get; set; }
        public string Icon { get; set; }
        public string Path { get; set; }
        public string Pathhh { get; set; }
        public string ParentId { get; set; }
    }
}
