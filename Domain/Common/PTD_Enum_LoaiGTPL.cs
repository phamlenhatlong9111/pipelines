using HueCIT.Modules.QLNVKHCN.Commons;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public enum PTD_Enum_LoaiGTPL : byte
    {
        [StringValue(@"Quyết định thành lập")]
        QDTL = 1,
        [StringValue(@"Giấy chứng nhận đăng ký kinh doanh")]
        GCNDKKD = 2,
        [StringValue(@"Giấy chứng nhận đăng ký hoạt động KHCN")]
        GCNDKHDKHCN = 3,
        [StringValue(@"Giấy chứng nhận đầu tư")]
        GCNDT = 4,
    }

    public enum PTD_Enum_LinhVuc : byte
    {
        [StringValue(@"Kiểm định")]
        KD = 1,
        [StringValue(@"Hiệu chuẩn")]
        HC = 2,
        [StringValue(@"Thử nghiệm")]
        TN = 3,
    }

    public enum PTD_Enum_LoaiChungChi : byte
    {
        [StringValue(@"Tem")]
        T = 1,
        [StringValue(@"Dấu")]
        D = 2,
        [StringValue(@"Giấy chứng nhận")]
        GCN = 3,
    }
}
