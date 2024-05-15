
// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    function formatDate(date = new Date()) {
        const year = date.toLocaleString('default', { year: 'numeric' });
        const month = date.toLocaleString('default', {
            month: '2-digit',
        });
        const day = date.toLocaleString('default', { day: '2-digit' });

        return [day, month, year].join('/');
    }
    function simpleTemplating(data) {
        var html = "<ul>";
        for (let i = 0; i < data.length; i++) {

            html += `
        <li class="danhmuccayxanh2">
            <div class='detail-tintuc' data-value=${data[i].id}>
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
        return html;
    }

    function resize() {

        var imgSanPham = $('.detail-tintuc').width();
        var heightImgSanPham = $('.detail-tintuc img');
        var heightsImgSanPham = imgSanPham / 1.5305785124;
        for (var i = 0; i < heightImgSanPham.length; i++) {
            heightImgSanPham[i].style.height = heightsImgSanPham + "px";
        }
        //console.log(imgSanPham)
    }

    window.addEventListener("resize", resize);
    window.onresize = function () {
        resize();
    };
    resize();

    //$("#demo").pagination({
    //    dataSource: function (done) {
    //        // Truy vấn dữ liệu từ API hoặc tài nguyên dữ liệu khác
    //        $.ajax({
    //            type: "get",
    //            url: `${APIURL}/api/BaiVietApi/HienThiDanhSachBaiViet`,
    //            dataType: "json",
    //            success: function (data) {
    //                if (data.length > 0) {
    //                    // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang

    //                    done(data);
    //                }
    //            },
    //        });
    //    },
    //    pageSize: 5,
    //    showSizeChanger: true,
    //    callback: function (data, pagination) {
    //        // template method of yourself
    //        var html = simpleTemplating(data);
    //        $("#data-container").html(html);
    //    },
    //});


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
            <li >
               <a class='chuyenmuc' data-value=${item.id}>${item.tenChuyenMuc}</a>
            </li>
            `;
                    }
                });
                html += "<li><a class='cayCamtrong' href='CayCamTrong'>Cây cấm trồng</a></li><li><a class=' chuyenmuc active' href=/TrangChu/DanhMuc>Chủng loại cây xanh</a></li>";
                //html += "<li><a class='cayCamtrong' href='CayCamTrong'>Cây cấm trồng</a></li><li><a href=/TrangChu/TinTuc>Chuyên mục</a></li><li><a href=/TrangChu/DanhMuc>Danh mục cây xanh</a></li>";
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
                            //console.log("không có dữ liệu");
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
                var html = simpleTemplating(data);
                $("#data-container").html(html);
                resize();
            },
        });
    });
    //$(document).on("click", ".titleChuyenMuc", function (e) {
    //    $("#demo").pagination({
    //        dataSource: function (done) {
    //            // Truy vấn dữ liệu từ API hoặc tài nguyên dữ liệu khác
    //            $.ajax({
    //                type: "get",
    //                url: `${APIURL}/api/BaiVietApi/HienThiDanhSachBaiViet`,
    //                dataType: "json",
    //                success: function (data) {
    //                    if (data.length > 0) {
    //                        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang

    //                        done(data);
    //                    }
    //                },
    //            });
    //        },
    //        pageSize: 5,
    //        showSizeChanger: true,
    //        callback: function (data, pagination) {
    //            // template method of yourself
    //            var html = simpleTemplating(data);
    //            $("#data-container").html(html);
    //        },
    //    });
    //})

    $.ajax({
        type: "get",
        url: `${APIURL}/api/PhanLoaiCayApi/danhsach`,
        dataType: "json",
        success: function (data) {
            console.log(data);
            $("#demo").html("")
            if (data.length > 0) {
                var html = "<ul>";
                data.map((item) => {
                    html += `
                <li class="danhmuccayxanh1">
                    <div class='danhmuccayxanh' data-value=${item.id}>
                        <div class="detail-tintuc1"><img src=${APIURL}/${item.anhDaiDien != null ? item.anhDaiDien : `/upload/bg-cay-alt.png`} alt="Cây cấm trồng"/></div>
                        <div class="contentTinTuc"><span>${item.tenLoaiCay}</span></div>
                    </div>
                    
                </li>
                `;

                });
                html += "</ul>";
                $("#data-container").html(html);
            } else {
                console.log("lỗi");
            }

            // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
        },
        error: function (err) {
            console.log(err);
        },
    });

    if (ID != '') {
        $.ajax({
            type: "get",
            url: `${APIURL}/api/CayXanhApi/cayxanhthongke?MaPhanLoai=${ID}`,
            dataType: "json",
            success: function (data) {
                console.log(data, 32112);
                if (data.isSuccess) {
                    var html = "<ul>";
                    data.value.map((item) => {
                        html += `
                    <li class="danhmuccayxanh1">
                        <div class='detail-cayxanh' data-value=${item.id}>
                            <img src=${APIURL}/${item.avatar != null ? item.avatar : `/upload/bg-cay-alt.png`} alt="Cây cấm trồng"/>
                           <span>${item.tenCay}</span>
                        </div>
                    </li>
                    `;

                    });
                    html += "</ul>";
                    $("#data-container").html(html);
                } else {
                    console.log("không có dữ liệu");
                }
            },
            error: function (err) {
                console.log("lỗi");
            },
        });
    }
    


    $(document).on("click", ".danhmuccayxanh", function (e) {
        var idDanhMucCayXanh = $(this).data("value");
        console.log(idDanhMucCayXanh)
        // Truy vấn dữ liệu từ API hoặc tài nguyên dữ liệu khác
        $.ajax({
            type: "get",
            url: `${APIURL}/api/CayXanhApi/cayxanhthongke?MaPhanLoai=${idDanhMucCayXanh}`,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.isSuccess) {
                    var html = "<ul>";
                    data.value.map((item) => {
                        html += `
                <li class="danhmuccayxanh1">
                    <div class='detail-cayxanh' data-value=${item.id}>
                        <img src=${APIURL}/${item.avatar != null ? item.avatar : `/upload/bg-cay-alt.png`} alt="Cây cấm trồng"/>
                       <span>${item.tenCay}</span>
                    </div>
                </li>
                `;

                    });
                    html += "</ul>";
                    $("#data-container").html(html);
                } else {
                    console.log("không có dữ liệu");
                }
            },
            error: function (err) {
                console.log("lỗi");
            },
        });

    })


    $(document).ready(function () {


        function resize() {

            var imgSanPham = $('.contentNews ul li .detail-tintuc img').width();
            var heightImgSanPham = $('.contentNews ul li .detail-tintuc img');
            var heightsImgSanPham = imgSanPham / 1.5305785124;
            for (var i = 0; i < heightImgSanPham.length; i++) {
                heightImgSanPham[i].style.height = heightsImgSanPham + "px";
            }
        }

        window.addEventListener("resize", resize);
        window.onresize = function () {
            resize();
        };
        resize();

    });
    $("#FilterTinTuc").on("click", function () {
        $("#demo").pagination({
            dataSource: function (done) {
                var tuKhoa = $("#TimKiemTinTuc").val();
                $.ajax({
                    type: "get",
                    url: `${APIURL}/api/BaiVietApi/HienThiDanhSachBaiViet?tukhoa=${tuKhoa}`,
                    data: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.length > 0) {
                            console.log(data);
                            // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
                            done(data);
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
    $("#FilterAllTinTuc").on("click", function () {
        $("#demo").pagination({
            dataSource: function (done) {
                $.ajax({
                    type: "get",
                    url: `${APIURL}/api/BaiVietApi/HienThiDanhSachBaiViet?tukhoa=`,
                    data: "json",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.length > 0) {
                            // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
                            $("#TimKiemTinTuc").val("");
                            done(data);
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
    $(document).on("click", ".gr-docnhieunhat", function (e) {
        var idCay = $(this).data("value");
        window.location.href = Url + `?Id=${idCay}`
    });
    $(document).on("click", ".detail-tintuc", function (e) {
        var idCay = $(this).data("value");
        window.location.href = Url + `?Id=${idCay}`
    });
    $(document).on("click", ".detail-cayxanh", function (e) {
        var idCay = $(this).data("value");
        window.location.href = Url1 + `?IdCayXanh=${idCay}`
    });

})
