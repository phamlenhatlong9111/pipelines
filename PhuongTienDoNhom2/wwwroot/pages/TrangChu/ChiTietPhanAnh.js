console.log(Id);
function resize1() {
    var imgSanPham1 = $('.view-detal-tree .content-tree .text-detail #anh img').width();
    var heightImgSanPham1 = $('.view-detal-tree .content-tree .text-detail #anh img');
    var heightsImgSanPham1 = imgSanPham1 / 0.75294117647;
    for (var i = 0; i < heightImgSanPham1.length; i++) {
        heightImgSanPham1[i].style.height = heightsImgSanPham1 + "px";
    }
}
const runOwlCarouselbanner = () => {
    $(".owl-carousel-detailThamXanh").owlCarousel({
        items: 1,
        loop: false,
        //center: true,
        margin: 24,
        autoplay: 5000,
        dots: false,
        nav: false,
        navigation: true,
        responsiveClass: true,
    });
}
$.ajax({
    "url": `https://tuongtac.thuathienhue.gov.vn/dttm/phananh/chitiet?id=${Id}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
    },
    dataType: "json",
    success: function (data) {
        console.log(data);
        var img = []
        var video = []
        data.data.DanhSachFileDinhKem.map((item) => {
            
            const isImage =
                item.FileName.endsWith('.jpg') ||
                item.FileName.endsWith('.png');
            const isVideo = item.FileName.endsWith('.mp4');
            //console.log(isImage);
            if (isImage) {
                img.push(item)
              
            }
            if (isVideo) {
                video.push(item)
            }
            
         
        })
        console.log(img, video)
        var html = ""
        html += `<div class='tieudephananh'>
                    <span>${data.data.TieuDe}</span>
                </div>
                <div class='ngayphananh'>
                    <span>${data.data.NgayPhanAnh}</span>
                </div>
                <div class='diachi-chuyenmuc'>
                    <div class='diachiphananh'>
                        <span>Địa chỉ: ${data.data.DiaChiSuKien}</span>
                    </div>
                    <div class='chuyenmucphananh'>
                        <span>Tên chuyên mục: ${data.data.TenChuyenMuc}</span>
                    </div>
                </div>
                <div class='donvithuli'>
                    <span>Đơn vị thụ lý: ${data.data.DonViThuLy}</span>
                </div>
                <div class='noidungphananh'>
                    <span>${data.data.NoiDungPhanAnh}</span>
                </div>
                <div class='anh-video-phananh'>
                    <div class="anh-PhanAnh">
                        <div class='titleAnhPhanAnh'>Ảnh phản ánh:</div>
                        <div id="anh" class="owl-carousel owl-carousel-detailThamXanh">
                            ${img.map((item) => {
                                return `<img src=${item.FileName} alt="Cây cấm trồng"/>`
                            }).join('') }   
                        </div>
                    </div>
                     ${video.map((item) => {
                         return ` 
                         <div class='video-PhanAnh'>
                            <div class='titleVideoPhanAnh'>Video phản ánh:</div>
                             <video width="100%" height="100%" controls>
                                <source src=${item.FileName} type="video/mp4">
                             </video>
                         </div>
                            `
                     }).join('') }   
                   
                </div>
                <div class='noidungtraloi'>
                    ${data.data.NoiDungTraLoi}
                </div>
                `;


        $("#data-container").html(html);
        runOwlCarouselbanner()
        resize1()
    },
    error: function (err) {
        console.log(err);
    },
})
checkImgFile = (data) => {
    for (var i = 0; i < data.length; i++) {
        let dotIndex = data[i].FileName.lastIndexOf('.');
        var ext = data[i].FileName.substring(dotIndex);
        if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".gif") {
            return `<img src=${data[i].FileName} />`
        } else {
            if (i == (data.length - 1)) {
                return `<img src="/upload/bg-cay-alt.png" />`
            }
        }
    }
}
$.ajax({
    url: `https://tuongtac.thuathienhue.gov.vn/dttm/phananh/theochuyenmuc?chuyenmucid=0&page=1&perpage=5&search`,
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
    },
    dataType: "json",
    success: function (data) {

        /*   console.log(data);*/
        if (data.data.length > 0) {
            var html = "<div class='gr-cacphananhganday'>";
            data.data.forEach((item) => {
                html += `<div class='img-phanAnh'><div class="item-options" data-value=${item.PhanAnhID}>
                                ${item.DanhSachFileDinhKem.length > 0 ? checkImgFile(item.DanhSachFileDinhKem) : `<img src="/upload/bg-cay-alt.png" />`}
                                 </div>
                                 <div class="cacPhanAnhGanDay">
                                        <div class="categories hidden-if-overflow">${item.TenChuyenMu}</div>
                                        <div class="address">${item.TieuDe}</div>
                                        <div class="date hidden-if-overflow">${item.NgayPhanAnh}</div>
                                </div></div>`
            });

            html += "</div>";
            $("#chuyen-muc-tin-tuc").html(html);
            //$(".loader").remove();
            // Initialize pagination.js

        }
    },
    error: function (err) {
        console.log("lỗi", err);
    },
});

$(function () {
    var url = window.location.pathname;
    if (url != '') {
            $('.groupbgMenu').addClass('custom-menu')
            $('.groupbgMenu').find('.change-container').removeClass('container-new').addClass('container-new1');
        }
    });
$(function () {
    var url = window.location.pathname;
    $('.menu').find(`a[href="/TrangChu/PhanAnh"]`).addClass('active');
});

$(document).on("click", ".item-options", function (e) {
    var PhanAnhID = $(this).data("value");
    window.location.href = Url + `?Id=${PhanAnhID}`
});
$('.btn-menu').click(function () {
    $(".col-cmnews").toggleClass("show")
})
$('.btn-close-menu').click(function () {
    $(".col-cmnews").toggleClass("show")
})