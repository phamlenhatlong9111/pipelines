// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
//select 
$(document).ready(function () {

    //Format date
    function formatDate(date = new Date()) {
        const year = date.toLocaleString('default', { year: 'numeric' });
        const month = date.toLocaleString('default', {
            month: '2-digit',
        });
        const day = date.toLocaleString('default', { day: '2-digit' });

        return [day, month, year].join('/');
    }
    $('#dataTable-HopDong').DataTable({
        "ordering": false,
        "autoWidth": false,
        "bInfo": false,
        "bLengthChange": true,
        "filter": true,
        "stateSave": true,
        "async": false,
        "paging": true,
        "pagingType": 'full_numbers',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "responsive": true,
        "order": [0, 'asc'],
        "language": {
            "sProcessing": "Đang xử lý...",
            "sLengthMenu": "_MENU_",
            "sZeroRecords": "Không có dữ liệu",
            "sEmptyTable": "Bảng trống",
            "sInfo": "Hiện dòng _START_ đến _END_ trong tổng _TOTAL_ dòng",
            "sInfoEmpty": "Hiện dòng 0 đến 0 trong tổng 0 dòng",
            "sSearch": "",
            "sSearchPlaceholder": "Tên hợp đồng...",
            "sLoadingRecords": "Đang tải...",
            paginate: {
                first: '<a class="fluent-ui fluent-ui-filled icon-firt-chevron-right"></a>',
                next: '<a class="fluent-ui fluent-ui-filled icon-paging-chevron-right"></a>',
                previous: '<a class="fluent-ui fluent-ui-filled icon-paging-chevron-left"></a>',
                last: '<a class="fluent-ui fluent-ui-filled icon-last-chevron-right"></a>'
            }
        },
        "ajax": {
            url: `${APIURL}/api/HopDongApi/danhsachhopdong`,
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    let result = data.value;
                    result.map((item, index) => {
                        item.stt = index + 1;
                        let ngayKyFormat = formatDate(new Date(item.ngayKy))
                        let ngayKetThucFormat = formatDate(new Date(item.ngayKetThuc))
                        let ngayHetHanBaoHanh = new Date((formatDateUpdate(new Date(item.ngayHetBaoHanh))))
                        let ngayNghiemThu = new Date((formatDateUpdate(new Date(item.ngayNghiemThu))))
                        item.ngayKyFormat = formatDate(new Date(item.ngayKy))
                        item.ngayBatDauFormat = formatDate(new Date(item.ngayBatDau))
                        item.ngayHetBaoHanhFormat = formatDate(new Date(item.ngayHetBaoHanh))
                        item.ngayNghiemThuFormat = formatDate(new Date(item.ngayNghiemThu))
                        item.ngayKetThucFormat = formatDate(new Date(item.ngayKetThuc))
                        item.ngayKyFormatUpdate = formatDateUpdate(new Date(item.ngayKy))
                        item.ngayBatDauFormatUpdate = formatDateUpdate(new Date(item.ngayBatDau))
                        item.ngayNghiemThuFormatUpdate = formatDateUpdate(new Date(item.ngayNghiemThu))
                        item.ngayKetThucFormatUpdate = formatDateUpdate(new Date(item.ngayKetThuc))
                        item.giaTriFormat = formatVND(item.giaTri)
                        item.giaTriConLaiFormat = formatVND(item.giaTriConLai)
                        item.thoiGianHD = `${ngayKyFormat} - ${ngayKetThucFormat}`
                        item.thoiHanBaoHanh = Math.abs((ngayHetHanBaoHanh.getFullYear() - ngayNghiemThu.getFullYear()) * 12 + ngayHetHanBaoHanh.getMonth() - ngayNghiemThu.getMonth());

                    })
                    return result;
                }
                return []

            }
        },
        "columnDefs": [
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    return `<span id="n-${meta.row}" class="tenHopDongDetails">${data}</span>`;

                }
            },
            {
                targets: 8,
                render: function (data, type, row, meta) {

                    return `<div class="edit-delete-detail">
                                <span title = "Chi tiết" class="btn-changeNhanSu detail-icon fluent-ui fluent-ui-filled" id = n-"${meta.row}" ></span >
                                <span title="Cập nhật" class="btn-edit edit-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                                <span title="Xóa" class="btn-delete delete-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                            </div>`;
                }
            },

        ],
        "columns": [

            { data: "stt", "width": "40px", "class": "stt-text center-align" },
            { data: "tenHopDong", "width": "150px", "class": "stt-text left-align" },
            { data: "tenLoai", "width": "120px", "class": "stt-text left-align" },
            { data: "tenSanPham", "width": "150px", "class": "left-align dnCustom" },
            { data: "tenKhachHang", "width": "auto", "class": "left-align dnCustom" },
            { data: "giaTriFormat", "width": "100px", "class": "center-align dnCustom" },
            { data: "thoiGianHD", "width": "100px", "class": "center-align group-icon-action" },
            { data: "tenBuoc", "width": "120px", "class": "center-align group-icon-action" },
        ]


    });

    $('.dataTables_filter').appendTo('.filter-datatable')
    $('.dataTables_filter').addClass('icon-search').addClass('fluent-ui').addClass('fluent-ui-regular')
    $('.dataTables_length').appendTo('#page-record')
    $('.dataTables_length select').addClass('form-control')
    $('.dataTables_paginate').appendTo('#page-record')
    $('.dataTables_filter input').addClass('form-control dt-filter')
    
})








