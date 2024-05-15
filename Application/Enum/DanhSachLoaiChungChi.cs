using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Core;
using Domain.Common;
using Domain;
using HueCIT.Modules.QLNVKHCN.Commons;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace Application.Enum
{
    public class DanhSachLoaiChungChi
    {
        public class Query : IRequest<Result<IEnumerable<EnumModel>>>
        {

        }

        public class Handler : IRequestHandler<Query, Result<IEnumerable<EnumModel>>>
        {
            private readonly IConfiguration _configuration;

            public Handler(IConfiguration configuration)
            {
                _configuration = configuration;
            }
            public async Task<Result<IEnumerable<EnumModel>>> Handle(Query request, CancellationToken cancellationToken)
            {
                IEnumerable<EnumModel> list = null; // Thay đổi kiểu dữ liệu của list thành IEnumerable<EnumModel>
                await Task.Run(() =>
                {
                    list = typeof(PTD_Enum_LoaiChungChi).GetEnumValues()
                    .Cast<PTD_Enum_LoaiChungChi>()
                    .Select(ee => new EnumModel
                    {
                        Text = StringEnum.GetStringValue(ee),
                        ValueString = ee.ToString(),
                        Value = (int)ee,
                    });
                });

                return Result<IEnumerable<EnumModel>>.Success(list);
            }
        }
    }
}
