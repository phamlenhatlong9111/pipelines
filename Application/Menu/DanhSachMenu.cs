using System;
using System.Data.SqlClient;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Configuration;
using Dapper;
using Persistence;
using Application.Core;
using Domain;
using System.Collections.Generic;

using System.Linq;
using Domain.DTOs.ResponseDtos;

namespace Application.Menu
{
    public class DanhSachMenu
    {
        public class Query : IRequest<Result<IEnumerable<MainMenu>>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<IEnumerable<MainMenu>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<MainMenu>>> Handle(Query request, CancellationToken cancellationToken)
            {
                using (var connettion = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connettion.OpenAsync();
                    try
                    {
                        DynamicParameters parameters = new DynamicParameters();
                        parameters.Add("@PUserID", request.Id);

                        IEnumerable<MainMenu> lstMenu = await connettion.QueryAsync<MainMenu>("SP_MENU_TRUYVAN_THEONHANVIEN",parameters, commandType: System.Data.CommandType.StoredProcedure);

                        //List<MainMenu> lstResult = new List<MainMenu>();

                        //List<SubMenu> subMenus = new List<SubMenu>();
                        //foreach (MenuItem item in lstMenu)
                        //{
                        //    if (item.Id == null)
                        //    {
                        //        SubMenu sub = new SubMenu
                        //        {
                        //            MenuName = item.MenuName,
                        //            Icon = item.Icon,
                        //            Path = item.Path,
                        //            Pathhh = item.Path,
                        //            ParentId = item.ParentId
                        //        };
                        //        subMenus.Add(sub);
                        //    }
                        //    else
                        //    {
                        //        MainMenu main = new MainMenu
                        //        {
                        //            Id = item.Id,
                        //            MenuName = item.MenuName,
                        //            Icon = item.Icon,
                        //            Path = item.Path,
                        //            Pathhh = item.Path,
                        //            DisplayOrder = item.DisplayOrder
                        //        };
                        //        lstResult.Add(main);
                        //    }
                        //}

                        //foreach (MainMenu mainMenu in lstResult)
                        //{
                        //    mainMenu.SubMenus = new List<SubMenu>();
                        //    foreach (SubMenu sub in subMenus)
                        //    {
                        //        if (sub.ParentId == mainMenu.Id)
                        //            mainMenu.SubMenus.Add(sub);
                        //    }
                        //}

                        return Result<IEnumerable<MainMenu>>.Success(lstMenu);
                    }
                    catch (Exception ex)
                    {
                        return Result<IEnumerable<MainMenu>>.Failure(ex.Message);
                    }
                    finally
                    {
                        await connettion.CloseAsync();
                    }
                }
            }
        }
    }
}
