
// ĐƯỜNGNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {

    $('#dataGridPhuongPhapDo').DataTable({
        "dom": '<"top area-filter"f>Brti<"page-record-custom"lp>',
        "buttons": [
            {

                extend: 'excelHtml5',
                title: 'DANH SÁCH PHƯƠNG PHÁP ĐO',
                text: 'Xuất file Excel',
                className: 'btn btn-outline-success d-none',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },


        ],
        "ordering": false,
        "autoWidth": false,
        "bInfo": false,
        "bLengthChange": true,
        "filter": true,
        //"stateSave": true,
        "async": false,
        "paging": true,
        "pagingType": 'full_numbers',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        //"scrollY": 650,
        //"scrollCollapse": true,
        "responsive": true,
        "order": [0, 'asc'],
        "language": {
            "sProcessing": "Đang xử lý...",
            "sLengthMenu": "_MENU_",
            "sZeroRecords": "Không có dữ liệu",
            "sEmptyTable": "Không có dữ liệu",
            "sInfo": "Hiện dòng _START_ đến _END_ trong tổng _TOTAL_ dòng",
            "sInfoEmpty": "Hiện dòng 0 đến 0 trong tổng 0 dòng",
            "sSearch": "",
            "sLoadingRecords": "Đang tải...",
            "sSearchPlaceholder": "Từ khóa tìm kiếm...",
            paginate: {
                first: '<a class="fluent-ui fluent-ui-filled icon-firt-chevron-right"></a>',
                next: '<a class="fluent-ui fluent-ui-filled icon-paging-chevron-right"></a>',
                previous: '<a class="fluent-ui fluent-ui-filled icon-paging-chevron-left"></a>',
                last: '<a class="fluent-ui fluent-ui-filled icon-last-chevron-right"></a>'
            }
        },
        "drawCallback": function (data) {
            if (data && data.aoData && data.aoData.length == 0) {
                $(data.nTableWrapper).find('.page-record-custom').addClass('d-none');
            } else {
                $(data.nTableWrapper).find('.page-record-custom').removeClass('d-none');
            }
            if (data && (data._iDisplayLength == -1 || (data.aoData && data.aoData.length <= data._iDisplayLength))) {
                $(data.nTableWrapper).find('.page-record-custom .dataTables_paginate').addClass('d-none');
            } else {
                $(data.nTableWrapper).find('.page-record-custom .dataTables_paginate').removeClass('d-none');
            }
        },
        "ajax": {
            url: APIURL + "/api/QuyTrinhApDungApi/DanhSachQuyTrinhApDung",
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    for (let i = 0; i < data.value.length; i++) {
                        data.value[i].stt = i + 1;

                    }
                    return data.value;
                }
                return []

            }
        },
        "columnDefs": [
            //{
            //    targets: [1],
            //    searchable: true
            //},
            /*{
                targets: 3,
                render: function (data, type, row, meta) {
                    return linhVuc(data);
                }
            },*/
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    return hoatDong(data);
                }
            },
            {
                targets: [5],
                "orderable": false,
            },
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    return `<div class="edit-delete-detail">
                                <span title="Cập nhật" class="btn-edit edit-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                                <span title="Xóa" class="btn-delete delete-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                            </div>`;

                }
            },
        ],
        "columns": [

            { data: "stt", "width": "40px", "class": "stt-text center-align", searchable: false },
            { data: "soKyHieu", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "tenQuyTrinh", "width": "auto", "class": "left-align dnCustom", searchable: true },
            //{ data: "linhVuc", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "moTa", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "trangThai", "width": "auto", "class": "left-align dnCustom" },
            { data: "maQuyTrinh", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGridPhuongPhapDo').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridPhuongPhapDo').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();
    $('.area-filter').appendTo('.filterDT')
    $('.dataTables_filter').appendTo('.filter-datatable')
    $('.dataTables_filter').addClass('icon-search').addClass('fluent-ui').addClass('fluent-ui-regular')
    $('.dataTables_length select').addClass('form-control')
    $('.dataTables_filter input').addClass('form-control dt-filter')

    $('select').select2({
        placeholder: "Tất cả",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
    });
    $('#btn-themmoi').on('click', function () {
        $('#modalPhuongPhapDoAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridPhuongPhapDo').DataTable().row(id).data();
        console.log(data)
        $('#maSoUpdate').val(data.soKyHieu)
        $('#phuongPhapDoUpdate').val(data.tenQuyTrinh)
        $('#moTaUpdate').val(data.moTa)
        $('#idPPDUpdate').val(data.maQuyTrinh)
        $('#modalPhuongPhapDoUpdate').modal('show')
        if (data.trangThai == 1) {
            $("#hoatDongPPDUpdate_True").prop('checked', true)
        } else {
            $("#dungHoatDongPPDUpdate_False").prop('checked', true)
        }
    })

    $(document).on('click', '.btn-delete', function () {

        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucDonVi').DataTable().row(id).data();
        $('#idPPDDelete').val(data.maQuyTrinh)
        $('#modalDeletePhuongPhapDo').modal('show')
    })

    $('#btn-save-PPDAdd').on('click', function () {
        let maSo = $('#maSoAdd').val()
        let ten = $('#phuongPhapDoAdd').val()
        let moTa = $('#moTaAdd').val()

        var checked = $('#hoatDongPPDAdd_True')
        let trangthaiadd
        if (checked[0].checked == true) {
            trangthaiadd = "1"
        } else { trangthaiadd = "0" }
        let reqAdd = {
            "MaQuyTrinh": 0,
            "MaToChuc": null,
            "SoKyHieu": maSo,
            "TenQuyTrinh": ten,
            "NamBanHanh": null,
            "ToChucBanHanh": "",
            "LinhVuc": null,
            "MoTa": moTa,
            "TepKemTheo": "",
            "TrangThai": trangthaiadd
        }
        if (checkEmptyBlank(maSo) || checkEmptyBlank(ten)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(maSo) || !checkTagHtml(ten)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/QuyTrinhApDungApi/ThemMoiQuyTrinhApDung',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới phương pháp đo thành công', 'success')
                    $('#modalPhuongPhapDoAdd').modal('hide')
                    $('#dataGridPhuongPhapDo').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới phương pháp đo không thành công!", 'danger')
                }
            });
        }
    })
    $('#btn-save-PPDUpdate').on('click', function () {
        let maSo = $('#maSoUpdate').val()
        let ten = $('#phuongPhapDoUpdate').val()
        let moTa = $('#moTaUpdate').val()
        var checked = $('#hoatDongPPDUpdate_True')
        let id = $('#idPPDUpdate').val()
        let trangthaiadd
        if (checked[0].checked == true) {
            trangthaiadd = "1"
        } else { trangthaiadd = "0" }
        let reqUpdate = {
            "MaQuyTrinh": id,
            "MaToChuc": null,
            "SoKyHieu": maSo,
            "TenQuyTrinh": ten,
            "NamBanHanh": null,
            "ToChucBanHanh": "",
            "LinhVuc": null,
            "MoTa": moTa,
            "TepKemTheo": "",
            "TrangThai": trangthaiadd
        }
        if (checkEmptyBlank(maSo) || checkEmptyBlank(ten)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(maSo) || !checkTagHtml(ten)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/QuyTrinhApDungApi/CapNhatQuyTrinhApDung',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Chỉnh sửa phương pháp đo thành công', 'success')
                    $('#modalPhuongPhapDoUpdate').modal('hide')
                    $('#dataGridPhuongPhapDo').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi chỉnh sửa phương pháp đo không thành công!", 'danger')
                }
            });
        }
    })

    // XOA
    $('#delete_PPD').on('click', function () {
        let id = $('#idPPDDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/QuyTrinhApDungApi/XoaQuyTrinhApDung?Id=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa phương pháp đo thành công!", 'success')
                $('#modalDeletePhuongPhapDo').modal('hide')
                $('#dataGridPhuongPhapDo').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                showNotify("Lỗi xóa phương pháp đo không thành công!", 'danger')
            }
        });
    })


})
function hoatDong(data) {
    if (data == 1) {
        return '<i class="icon icon-ic_fluent_checkmark_24_regular icon-check"></i>'
    }
    if (data == 0) {
        return '<span class="icon-dismiss">-</span>'
    } else {
        return ""
    }
}
function linhVuc(data) {
    if (data == 1) {
        return 'Kiểm định'
    }
    if (data == 2) {
        return 'Hiệu chuẩn'
    } if (data == 3) {
        return "Thử nghiệm"
    } else {
        return ""
    }
}