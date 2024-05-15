using Domain;
using Newtonsoft.Json;
using System.Net;

namespace QuanLyCayXanh.Common
{
    public class SSOHueSCommon
    {
        public static LoginSSOHueSResponse? DangNhap(LoginSSOHueSModel model)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("https://user.thuathienhue.gov.vn/api/AuthenToken/login");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                var input = new
                {
                    username = model.Username,
                    password = model.Password,
                    appCode = model.AppCode,
                };
                string json = System.Text.Json.JsonSerializer.Serialize(input);
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
                
            }

            var httpResponse = (HttpWebResponse)httpWebRequest.GetResponse();

            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var resultObj = streamReader.ReadToEnd();
                LoginSSOHueSResponse json2 = JsonConvert.DeserializeObject<LoginSSOHueSResponse>(resultObj);
                if (json2.Success)
                    return json2;
            }

            return null;
        }
    }
}
