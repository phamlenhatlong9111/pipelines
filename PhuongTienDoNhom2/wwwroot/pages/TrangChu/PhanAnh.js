// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
let pageIndex = 1
let sothutu = 0
let table = null
let arrDataPhanAnh = []
$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "https://tuongtac.thuathienhue.gov.vn/dttm/phananh/chuyenmuc",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
        },
        dataType: "json",
        success: function (data) {
            console.log(data)
            if (data.data.length > 0) {
                var html = "<ul><li><a class='chuyenmuc active' data-value='0'>Tất cả</a ></li>";
                data.data.map((item) => {
                html += `
                        <li >
                           <a class='chuyenmuc' data-value=${item.ChuyenMucID}>${item.TenChuyenMuc}</a>
                        </li>
                        `;
                });
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
    $('#pagination-container').pagination({
        dataSource: function (done) {
            $.ajax({
                url: `https://tuongtac.thuathienhue.gov.vn/dttm/phananh/theochuyenmuc?chuyenmucid=0&page=1&perpage=12&search=`,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
                },
                dataType: "json",
                success:  function (data) {
                    console.log(data);
                    //done(data)
                    const totalPages = data.totalrow; // Replace with your actual data

                    // Create an array of page numbers from 1 to totalPages
                    const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
                    
                    done(pageArray); 
                },
                error: function (err) {
                    console.log("lỗi", err);
                },
            })
            // You can fetch the total number of pages from your API response
           
        },
        pageSize: 1, // Number of pages to show
        showPageNumbers: true,
        showNavigator: true,
        callback: function (newPageNumber, done) {
            console.log(newPageNumber);
            // Load data for the selected page
            loadData(newPageNumber, idChuyenMuc= 0, done);
        }
    });
    var idChuyenMuc
    $(document).on("click", ".chuyenmuc", function (e) {
        $(".mini-preloader").css("z-index", "0");
        idChuyenMuc = $(this).data("value");

        $('#pagination-container').pagination({
            dataSource: async function (done) {
                $.ajax({
                    url: `https://tuongtac.thuathienhue.gov.vn/dttm/phananh/theochuyenmuc?chuyenmucid=${idChuyenMuc}&page=1&perpage=12&search=`,
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        
                        //done(data)
                        const totalPages = data.totalrow; // Replace with your actual data

                        // Create an array of page numbers from 1 to totalPages
                        const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);
                     
                        done(pageArray);
                    },
                    error: function (err) {
                        console.log("lỗi", err);
                    },
                })
                // You can fetch the total number of pages from your API response
                $(".mini-preloader").css("z-index", "-1");
            },
            pageSize: 1, // Number of pages to show
            showPageNumbers: true,
            showNavigator: true,
            callback: function (newPageNumber) {
                console.log(newPageNumber);
            
                // Load data for the selected page
                loadData(newPageNumber, idChuyenMuc);
               
            }
        });
        $(".col-cmnews").toggleClass("show")
    });
     function loadData(pageNumber, idChuyenMuc) {
        /*$(".container-new2").append(`<div class="loader"></div>`);*/
        console.log();
        $.ajax({
            url: `https://tuongtac.thuathienhue.gov.vn/dttm/phananh/theochuyenmuc?chuyenmucid=${idChuyenMuc}&page=${pageNumber}&perpage=12&search=`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Token": "20-EA-F8-89-71-E8-13-59-2D-AA-DE-BF-ED-CD-B0-D4-EA-53-DE-31"
            },
            dataType: "json",
            success: function (data) {
                
                /*   console.log(data);*/
                if (data.data.length > 0) {
                    var html = "<div class='images'>";
                    data.data.forEach((item) => {
                        html += `<div class="phan-anh-wrapper">
                                <div class="item-content" data-value=${item.PhanAnhID}>
                                ${item.DanhSachFileDinhKem.length > 0 ?
                                checkImgFile(item.DanhSachFileDinhKem) :
                                `<img src="/upload/bg-cay-alt.png" />`}
                                    <div class="item-options">
                                        <div class="under-img-wrapper">
                                            <div class="categories hidden-if-overflow">${item.TenChuyenMu}</div>
                                            <div class="address">${item.TieuDe}</div>
                                            <div class="date-time-xuly">
                                            <div class="date hidden-if-overflow"><span>${item.NgayPhanAnh}</span></div>
                                            <div class="status hidden-if-overflow">${xuLyText(item.TrangThai)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                    });
                    
                    html += "</div>";
                    $("#data-container").html(html);
                    $(".mini-preloader").css("z-index", "-1");
                    resize();
                    // Initialize pagination.js
                }
            },
            error: function (err) {
                console.log("lỗi", err);
            },
        });
     }

    $(document).on('click', '.chuyenmuc', function () {
        $("#data-container .images").remove();
        $(".mini-preloader").css("z-index", "0");
        $('.chuyenmuc').removeClass('active');
        $(this).addClass('active');
    })

    function xuLyText(data) {
        if (data == 'Đang xử lý') {
            return '<span class="dangXuLy">Đang xử lý</span>'
        }
        if (data == 'Đã xử lý') {
            return '<span class="daXuLy">Đã xử lý</span>'
        }
        if (data == 'Đã tiếp nhận') {
            return '<span class="daTiepNhanXuLy">Đã tiếp nhận</span>'
        }

    }
    function resize() {

        var imgPhanAnh = $('.item-content').width();
        var heightImgPhanAnh = $('.item-content img');
        var heightsImgPhanAnh = imgPhanAnh / 1.65957446809;
        for (var i = 0; i < heightImgPhanAnh.length; i++) {
            heightImgPhanAnh[i].style.height = heightsImgPhanAnh + "px";
        }

    }
    window.addEventListener("resize", resize);
    window.onresize = function () {
        resize();
    };
    resize();

    $(document).on("click", ".item-content", function (e) {
        var PhanAnhID = $(this).data("value");
        window.location.href = Url + `?Id=${PhanAnhID}`
    });

    $('.btn-menu').click(function () {
        $(".col-cmnews").toggleClass("show")
    })
    $('.btn-close-menu').click(function () {
        $(".col-cmnews").toggleClass("show")
    })

})
