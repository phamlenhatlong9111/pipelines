using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Domain
{
    public class RequestUploadFile
    {
        public string Data { get; set; }
        public List<IFormFile> AnhBieuTuong { get; set; } = new List<IFormFile>();
        public int AnhBieuTuongElementID { get; set; }
        public List<IFormFile> AnhDaiDien { get; set; } = new List<IFormFile>();
        public int AnhDaiDienElementID { get; set; }

    }

    //hieuupdate addcayxanh
    public class RequestUploadFileUpdate
    {
        public List<IFormFile> files { get; set; } = new List<IFormFile>();
        public string data { get; set; }
        public List<string> moTa { get; set; }
    }
    public class RequestUploadFileUpdateSingle
    {
        public IFormFile file { get; set; }
        public string data { get; set; }
    }
    public class RequestUploadFileUpdateCongViec
    {
        public List<IFormFile> files { get; set; } = new List<IFormFile>();
        public string noiDung { get; set; }
        public string nhiemVuID { get; set; }
        public int trangThai { get; set; }

    }

}
