
using Application.Menu;
using Domain;
using Domain.DTOs.ResponseDtos;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

namespace QuanLyCayXanh.Components
{
    public class Menuleft : ViewComponent
    {
        private readonly DanhSachMenu danhSachMenu;
        private readonly IMediator _mediator;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<AppRole> _roleManager;
        public Menuleft(IMediator mediator, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            //danhSachMenu = new DanhSachMenu();
            _mediator = mediator;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public static class MenuHelper
        {
            public static IEnumerable<MainMenu> OrganizeMenuTree(IEnumerable<MainMenu> menus)
            {
                Dictionary<string, MainMenu> menuDictionary = new Dictionary<string, MainMenu>();

                foreach (var item in menus)
                {
                    item.SubMenus = new List<MainMenu>(); // Khởi tạo danh sách submenu

                    // Thêm vào từ điển
                    menuDictionary[item.DuongDan] = item;

                    // Tìm menu cha
                    var parentPath = FindParentPath(menuDictionary.Keys, item.DuongDan);

                    if (!string.IsNullOrEmpty(parentPath))
                    {
                        // Nếu có menu cha, thêm vào submenu của menu cha
                        menuDictionary[parentPath].SubMenus.Add(item);

                    }
                }

                // Lấy ra danh sách menu gốc (menu không có menu cha)
                List<MainMenu> menuTree = menuDictionary.Values.Where(menu => string.IsNullOrEmpty(FindParentPath(menuDictionary.Keys, menu.DuongDan))).ToList();

                return menuTree;
            }

            private static string FindParentPath(IEnumerable<string> paths, string currentPath)
            {
                foreach (var path in paths)
                {
                    // Kiểm tra xem currentPath có chứa path và khác với path
                    if (currentPath.StartsWith(path + "/") && currentPath != path)
                    {
                        return path;
                    }
                }

                return null;
            }
        }
        public async Task<IViewComponentResult> InvokeAsync()
        {
            
            List<MainMenu> model = new List<MainMenu>();

            var username = ((ClaimsIdentity)User.Identity).Name;
            var userIdClaim = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier).Value;


            var roles = await _userManager.GetRolesAsync(await _userManager.FindByNameAsync(username));

            //foreach (var role in roles)
            //{
                //var ro = await _roleManager.FindByNameAsync(role);
                var api = await _mediator.Send(new DanhSachMenu.Query { Id = userIdClaim });
                //var apiDanhMuc = await _mediator.Send(new TruyVanDanhMuc.Query { });
                if (api.IsSuccess)
                {
                    var organizedMenus = MenuHelper.OrganizeMenuTree(api.Value);
                    foreach (var item in organizedMenus)
                    {

                        List<SubMenu> submenu = new List<SubMenu>();
                        foreach (var c in item.SubMenus)
                        {
                            //if(c.TenNhom != "Thiết lập" && username == "admin")
                            submenu.Add(new SubMenu { MenuName = c.TenNhom, Icon = c.Icon, Path = c.DuongDan, Pathhh = c.Pathhh });
                        }
                        //if (item.Id == "7")
                        //{
                        //    foreach (var i in apiDanhMuc.Value)
                        //    {
                        //        submenu.Add(new SubMenu { MenuName = i.TenDanhMuc, Path = "/DanhMuc/DanhMucCon/" + i.ID, Pathhh = i.KichHoat.ToString(), ParentId = i.ID.ToString(), Icon = null });

                        //    }
                        //}

                        if(item.TenNhom == "Thiết lập" && username != "admin")
                        {
                            continue;
                        // bỏ qua index hiện tại thôi
                        }else
                        {
                        model.Add(new MainMenu { Id = item.Id, MenuName = item.TenNhom, Icon = item.Icon, Path = item.DuongDan, DisplayOrder = item.DisplayOrder, SubMenus = item.SubMenus });
                        }
                        
                    }

                }
            //}

            return await Task.Run(() =>
                 View("_Menuleft", model)
            );
        }
    }
}
