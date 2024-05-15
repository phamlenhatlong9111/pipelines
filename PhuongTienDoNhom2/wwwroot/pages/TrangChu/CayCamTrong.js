
// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
function simpleTemplating(data) {
    var html = "<ul>";
    for (let i = 0; i < data.length; i++) {
        html += `<li>
        <div class='detail-tintuc detail-click' data-value=${data[i].id}>
          <img src=${APIURL}/${data[i].avatar != null ? data[i].avatar : `/upload/bg-cay-alt.png`
            } alt="Cây cấm trồng"/>
        </div>
        <div class="contentTinTuc">
          <span class='titleNews'>${data[i].tenCay}</span>
          <span class='dateNews'>${data[i].camTrong == 0 ? "Cấm trồng" : "Được trồng"}</span>
          <span class='summaryNews'>${data[i].moTa != "" ? data[i].moTa : ""}</span>
        </div>
        </li>`;
    }
    html += "</ul>";
    return html;
}

function resize() {

    var imgSanPham = $('.detail-tintuc').width();
    var heightImgSanPham = $('.detail-tintuc img');
    var heightsImgSanPham = imgSanPham / 1.5305785124;
    for (var i = 0; i < heightImgSanPham.length; i++) {
        heightImgSanPham[i].style.height = heightsImgSanPham + "px";
    }
    console.log(imgSanPham)
}

window.addEventListener("resize", resize);
window.onresize = function () {
    resize();
};
resize();

$("#demo").pagination({
    dataSource: function (done) {
        // Truy vấn dữ liệu từ API hoặc tài nguyên dữ liệu khác
        $.ajax({
            type: "get",
            url: `${APIURL}/api/CayCamTrongApi/danhsachhienthi?TuKhoa=`,
            dataType: "json",
            success: function (data) {
                if (data.isSuccess) {
                    // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang

                    done(data.value);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    },
    pageSize: 5,
    showSizeChanger: true,
    callback: function (data, pagination) {
        // template method of yourself
        var html = simpleTemplating(data);
        $("#data-container").html(html);
        resize();
    },
});

$.ajax({
    type: "get",
    url: `${APIURL}/api/ChuyenMucApi/danhsach`,
    dataType: "json",
    success: function (data) {
        if (data.length > 0) {
            var html = "<ul>";
            data.map((item) => {
                if (item.trangThai == 1) {
                    html += `
            <li>
               <a  class='chuyenmuc' data-value=${item.id}>${item.tenChuyenMuc}</a>
            </li>
            `;
                }
            });
            html += "<li><a href='/TrangChu/CayCamTrong' class='cayCamtrong chuyenmuc active'>Cây cấm trồng</a></li><li><a href='/TrangChu/DanhMuc'>Chủng loại cây xanh</a></li>";
            html += "</ul>";
            $("#chuyen-muc-tin-tuc").html(html);
        } else {
            console.log("lỗi");
        }

        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
    },
    error: function (err) {
        console.log(err);
    },
});

$(document).on('click', '.chuyenmuc', function () {
    $('.chuyenmuc').removeClass('active');
    $(this).addClass('active');
})

$(document).on("click", ".chuyenmuc", function (e) {
    var idChuyenMuc = $(this).data("value");

    $("#demo").pagination({
        dataSource: function (done) {
            // Truy vấn dữ liệu từ API hoặc tài nguyên dữ liệu khác
            $.ajax({
                type: "get",
                url: `${APIURL}/api/BaiVietApi/HienThiDanhSachBaiViet?chuyenmuc=${idChuyenMuc}`,
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.length > 0) {
                        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
                        done(data);
                    } else {
                        $("#data-container").html("Không có dữ liệu");
                    }
                },
                error: function (err) {
                    console.log("lỗi");
                },
            });
        },
        pageSize: 5,
        showSizeChanger: true,
        callback: function (data, pagination) {
            // template method of yourself
            //var html = simpleTemplating(data);
            var html = "<ul>";
            for (let i = 0; i < data.length; i++) {

                html += `
        <li>
            <div class='detail-tintuc detail-tintuc1' data-value=${data[i].id}>
                <img src=${APIURL}/${data[i].avatar != null ? data[i].avatar : `/upload/bg-cay-alt.png`} alt="Cây cấm trồng"/>
            </div>
            <div class='contentTinTuc'>
                <span class='titleNews'>${data[i].tieuDe}</span>
                <span class='dateNews'>${data[i].ngayTao = formatDate(new Date(data[i].ngayTao))}</span>
                <span class='summaryNews'>${data[i].tomTat}</span>
            </div>
        </li>
        `;

            }
            html += "</ul>";
            $("#data-container").html(html);
        },
    });
});
$("#FilterCayCamTrong").on("click", function () {
    $("#demo").pagination({
        dataSource: function (done) {
            var tuKhoa = $("#TimKiemCayCamTrong").val();
            $.ajax({
                type: "get",
                url: `${APIURL}/api/CayCamTrongApi/danhsachhienthi?TuKhoa=${tuKhoa}`,
                data: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.isSuccess) {
                        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
                        done(data.value);
                    } else {
                        console.log("dữ liệu rỗng");
                    }
                },
                error: function (err) {
                    console.log(err);
                },
            });
        },
        pageSize: 5,
        showSizeChanger: true,
        callback: function (data, pagination) {
            // template method of yourself
            var html = simpleTemplating(data);
            $("#data-container").html(html);
            resize();
        },
    });
});

//FILTER ALL
$("#FilterAllCayCamTrong").on("click", function () {
    $("#demo").pagination({
        dataSource: function (done) {
            $.ajax({
                type: "get",
                url: `${APIURL}/api/CayCamTrongApi/danhsachhienthi?TuKhoa=`,
                data: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.isSuccess) {
                        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
                        $("#TimKiemCayCamTrong").val("");
                        done(data.value);
                    } else {
                        console.log("dữ liệu rỗng");
                    }
                },
                error: function (err) {
                    console.log(err);
                },
            });
        },
        pageSize: 5,
        showSizeChanger: true,
        callback: function (data, pagination) {
            // template method of yourself
            var html = simpleTemplating(data);
            $("#data-container").html(html);
            resize();
        },
    });
});
$(document).on("click", ".detail-click", function (e) {
    $("#modalCayCamTrongDetail").modal("show");
    var idCayCamTrong = $(this).data("value");
    $("#remove").remove()
    $.ajax({
        type: "get",
        url: `${APIURL}/api/CayCamTrongApi/chitiet?id=${idCayCamTrong}`,
        dataType: "json",
        success: function (data) {
            $("#tenCayDetail").text(data.cayCamTrong.tenCay);
            $("#tenKhoaHocDetail").text(data.cayCamTrong.tenKhoaHoc);
            $("#hoThucVatDetail").text(data.cayCamTrong.hoThucVat);
            $("#loaiCayDetail").text(data.cayCamTrong.camTrong == 0 ? "Cấm trồng" : "Được trồng");
            $("#moTaDetail").text(data.cayCamTrong.moTa);
            $("#modalLabel-tree").text(data.cayCamTrong.tenCay);
            var tepDinhKem;
            if (data.tepKemTheo != [] && data.tepKemTheo != '') {
                data.tepKemTheo.map((item) => {
                    tepDinhKem = `<div id="remove"><img src=${APIURL}/${item.noiLuuTru} alt="Cây cấm trồng"/></div>`
                })
            }
            else {
                tepDinhKem = `<div id="remove"><img src=${APIURL}/upload/bg-cay-alt.png alt="Cây cấm trồng"/></div>`
            }
            $("#anhDetails").append(tepDinhKem)


        },
        error: function (err) {
            console.log("lỗi", err);
        },
    });
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
$(document).on("click", ".detail-tintuc1", function (e) {
    var idCay = $(this).data("value");
    window.location.href = Url + `?Id=${idCay}`
});
$(document).on("click", ".gr-docnhieunhat", function (e) {
    var idCay = $(this).data("value");
    window.location.href = Url + `?Id=${idCay}`
});
