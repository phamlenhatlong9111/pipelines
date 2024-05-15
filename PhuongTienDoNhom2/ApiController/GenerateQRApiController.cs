using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;

namespace QuanLyCayXanh.ApiController
{
    public class GenerateQRApiController : BaseApiController
    {
        public GenerateQRApiController(IWebHostEnvironment hostingEnvironment) : base(hostingEnvironment)
        {
        }
        [HttpPost]
        public async Task<IActionResult> GenerateQR(string qRCode)
        {
            try
            {
                QRCodeGenerator QrGenerator = new QRCodeGenerator();
                QRCodeData QrCodeInfo = QrGenerator.CreateQrCode(qRCode, QRCodeGenerator.ECCLevel.Q);
                QRCode QrCode = new QRCode(QrCodeInfo);
                Bitmap QrBitmap = QrCode.GetGraphic(60);
                byte[] BitmapArray = QrBitmap.BitmapToByteArray();
                string QrUri = string.Format("data:image/png;base64,{0}", Convert.ToBase64String(BitmapArray));

                return Ok(QrUri);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
        public static class BitmapExtension
        {
            public static byte[] BitmapToByteArray(this Bitmap bitmap)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    bitmap.Save(ms, ImageFormat.Png);
                    return ms.ToArray();
                }
            }
        }
}
