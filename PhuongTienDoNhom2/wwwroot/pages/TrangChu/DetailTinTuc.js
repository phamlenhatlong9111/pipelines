
// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$.ajax({
    type: "get",
    url: `${APIURL}/api/ChuyenMucApi/danhsach`,
    dataType: "json",
    success: function (data) {
        console.log(data)
        if (data.length > 0) {
            var html = "<ul>";
            data.map((item) => {
                if (item.trangThai == 1) {
                    html += `
            <li >
               <a class='chuyenmuc' data-value=${item.id}>${item.tenChuyenMuc}</a>
            </li>
            `;
                }
            });
            //html += "<li><a class='cayCamtrong' href='CayCamTrong'>Cây cấm trồng</a></li><li><a href=/TrangChu/TinTuc>Chuyên mục</a></li><li><a href=/TrangChu/DanhMuc>Danh mục cây xanh</a></li>";
            html += "<li><a class='cayCamtrong' href='CayCamTrong'>Cây cấm trồng</a></li><li><a href=/TrangChu/DanhMuc>Chủng loại cây xanh</a></li>";
            html += "</ul>";
            $("#chuyen-muc-tin-tuc").html(html);
            $('.chuyenmuc').first().addClass('active');
        } else {
            console.log("lỗi");
        }

        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
    },
    error: function (err) {
        console.log(err);
    },
});
$(document).on("click", ".chuyenmuc", function (e) {
    var idChuyenMuc = $(this).data("value");
    window.location.href = Url1 + `?ID=${idChuyenMuc}`
});
function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [day, month, year].join('/');
}

$.ajax({
    type: "get",
    url: `${APIURL}/api/BaiVietApi/ThongTinChiTiet?Id=${ID}`,
    dataType: "json",
    success: function (data) {
        console.log(data)
        var tepDinhKem = "";
        if (data.isSuccess) {
            if (data.value.tepKemTheo != [] && data.value.tepKemTheo != '') {
                data.value.tepKemTheo.map((item) => {
                    tepDinhKem += `<img src=${APIURL}/${item.noiLuuTru} alt="Cây cấm trồng"/>`
                })
            }
            else {
                tepDinhKem = `<img src=${APIURL}/upload/bg-cay-alt.png alt="Cây cấm trồng"/>`
            }
            var html = "";
            console.log(tepDinhKem);
            html += `<div>
                    <div class="tieude-bv"><span>${data.value.tieuDe}</span></div>
                    <div class="ngaytao-bv"><span>${data.value.ngayTao = formatDate(new Date(data.value.ngayTao))}</span></div>
                    <div class="tomtat-bv"><span>${data.value.tomTat}</span></div>
                    <div class='detail-img-tintuc'>${tepDinhKem}</div>
                    <div class='noidung-bv'><span>${data.value.noiDung}</span></div>
                    <div class='nguon-bv'>Nguồn:<span> ${data.value.nguonTin}</span></div>
                </div>`;
            html += "";
            $("#chitiettintuc").html(html);
        }
        
        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang <div class="tencm-bv"><span>${data.baiViet.tenChuyenMuc}</span></div>
    },
    error: function (err) {
        console.log(err);
    },
});
$.ajax({
    type: "get",
    url: `${APIURL}/api/BaiVietApi/DanhSachDocNhieuNhat`,
    data: "json",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        if (data.length > 0) {
            console.log(data);
            var html = "";
            data.map((item) => {
                html += `
                <div class="gr-docnhieunhat" data-value=${item.id}>
                                    <div class="anhdaidien">
                                        <img src=${APIURL}/${item.avatar != null ? item.avatar : `/upload/bg-cay-alt.png`} alt="Cây cấm trồng"/>
                                    </div>
                                    <div class="name-day">
                                        <div class="name-bv">${item.tieuDe}</div>
                                        <div class="day-bv">${item.ngayTao = formatDate(new Date(item.ngayTao))}</div>
                                    </div>
                                </div>
                `;
            });
            $("#render-baidocnhieunhat").html(html);
            // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
            //$("#TimKiemTinTuc").val("");
            //done(data);
        } else {
            console.log("dữ liệu rỗng");
        }
    },
    error: function (err) {
        console.log(err);
    },
});

$(function () {
    var url = window.location.pathname;
    $('.menu').find(`a[href="/TrangChu/TinTuc"]`).addClass('active');
});
$(document).on('click', '.chuyenmuc', function () {
    $('.chuyenmuc').removeClass('active');
    $(this).addClass('active');
})
$(document).on("click", ".gr-docnhieunhat", function (e) {
    var idCay = $(this).data("value");
    window.location.href = Url + `?Id=${idCay}`
});
$('.btn-menu').click(function () {
    $(".col-cmnews").toggleClass("show")
})
$('.btn-close-menu').click(function () {
    $(".col-cmnews").toggleClass("show")
})