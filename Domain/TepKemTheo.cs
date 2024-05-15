using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain
{
    public class TepKemTheo
    {
        public int MaTep { get; set; }
        public Guid MaDoiTuong { get; set; }
        public string MoTa { get; set; }
        public string NoiLuuTru { get; set; }
        public DateTime NgayCapNhat { get; set; }
    }

    public class FileUploadInfo
    {
        public IFormFile File { get; set; }
        public string MoTa { get; set; }
    }
}
