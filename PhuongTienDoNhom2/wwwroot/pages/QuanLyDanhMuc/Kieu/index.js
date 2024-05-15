// ???NG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {

    $('#dataGridDanhMucKieu').DataTable({
        "dom": '<"top area-filter"f>rti<"page-record-custom"lp>',
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
            url: APIURL + "/api/KieuApi/DanhSachKieu",
            type: "GET",
            dataSrc: function (data) {
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].stt = i + 1;

                    }
                    return data;
                }
                return []

            }
        },
        "columnDefs": [
            {
                targets: 3,
                render: function (data, type, row, meta) {
                    return hoatDong(data);
                }
            },
            {
                targets: [4],
                "orderable": false,
            },
            {
                targets: 4,
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
            { data: "tenKieu", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "moTa", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "trangThai", "width": "auto", "class": "center-align dnCustom" },
            { data: "maKieu", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGridDanhMucKieu').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridDanhMucKieu').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
        $('#modalKieuAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucKieu').DataTable().row(id).data();
        $('#tenKieuUpdate').val(data.tenKieu)
        $('#moTaUpdate').val(data.moTa)
        $('#idKieuUpdate').val(data.maKieu)
        if (data.trangThai == 1) {
            $("#hoatDongKieuUpdate_True").prop('checked', true)
        } else {
            $("#dungHoatDongKieuUpdate_False").prop('checked', true)
        }
        $('#modalKieuUpdate').modal('show')
    })

    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucKieu').DataTable().row(id).data();
        $('#titleDel').html(`"${data.tenKieu}"`)
        $('#idKieuDelete').val(data.id)
        $('#modalDeleteKieu').modal('show')

    })
    $('#btn-save-KieuAdd').on('click', function () {
        let tenKieu = $('#tenKieuAdd').val()
        let moTa = $('#moTaAdd').val()
        var checked = $('#hoatDongKieuAdd_True')
        let trangthaiadd
        if (checked[0].checked == true) {
            trangthaiadd = "1"
        } else { trangthaiadd = "0" }
        let reqAdd = {
            "MaKieu": 0,
            "TenKieu": tenKieu,
            "MoTa": moTa,
            "TrangThai": trangthaiadd
        }
        console.log(reqAdd)
        if (checkEmptyBlank(tenKieu)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenKieu) || !checkTagHtml(moTa)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/KieuApi/ThemMoiKieu',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới kiểu phương tiện đo thành công', 'success')
                    $('#modalKieuAdd').modal('hide')
                    $('#dataGridDanhMucKieu').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới kiểu phương tiện đo không thành công!", 'danger')
                }
            });
        }
    })
    $('#btn-save-KieuUpdate').on('click', function () {
        let tenKieu = $('#tenKieuUpdate').val()
        let moTa = $('#moTaUpdate').val()
        var checked = $('#hoatDongKieuUpdate_True')
        let id = $('#idKieuUpdate').val()
        let trangthaiupdate
        if (checked[0].checked == true) {
            trangthaiupdate = "1"
        } else { trangthaiupdate = "0" }
        let reqUpdate = {
            "MaKieu": id,
            "TenKieu": tenKieu,
            "MoTa": moTa,
            "TrangThai": trangthaiupdate
        }
        if (checkEmptyBlank(tenKieu)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenKieu) || !checkTagHtml(moTa)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/KieuApi/CapNhatKieu',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Cập nhập kiểu phương tiện đo thành công', 'success')
                    $('#modalKieuUpdate').modal('hide')
                    $('#dataGridDanhMucKieu').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi cập nhập kiểu phương tiện đo không thành công!", 'danger')
                }
            });
        }
    })

    // XOA
    $('#delete_Kieu').on('click', function () {
        let id = $('#idKieuDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/KieuApi/XoaKieu?Id=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa kiểu phương tiện đo thành công!", 'success')
                $('#modalDeleteKieu').modal('hide')
                $('#dataGridDanhMucKieu').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                showNotify("Lỗi xóa kiểu phương tiện đo không thành công!", 'danger')
            }
        });
    })

})
function hoatDong(data) {
    if (data == 1) {
        return '<i class="icon-ic_fluent_checkmark_24_regular icon-check"></i>'
    }
    if (data == 0) {
        return '<span class="icon-dismiss">-</span>'
    } else {
        return ""
    }
}