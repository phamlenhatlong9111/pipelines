
// ???NGNG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {

    $('#dataGridDanhMucLinhVuc').DataTable({
        "dom": '<"top area-filter"f>rti<"page-record-custom"lp>',
        "buttons": [
            {

                extend: 'excelHtml5',
                title: 'DANH SÁCH LĨNH VỰĐO',
                text: 'Xu?t file Excel',
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
            url: APIURL + "/api/LinhVucApi/DanhSachLinhVuc",
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
            { data: "tenLinhVuc", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "moTa", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "trangThai", "width": "auto", "class": "center-align dnCustom" },
            { data: "maLinhVuc", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGridDanhMucLinhVuc').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridDanhMucLinhVuc').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
        $('#modalLinhVucAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucLinhVuc').DataTable().row(id).data();
        $('#tenLinhVucUpdate').val(data.tenLinhVuc)
        $('#moTaUpdate').val(data.moTa)
        $('#idLVDUpdate').val(data.maLinhVuc)
        if (data.trangThai == 1) {
            $("#hoatDongLVDUpdate_True").prop('checked', true)
        } else {
            $("#dungHoatDongLVDUpdate_False").prop('checked', true)
        }
        $('#modalLinhVucUpdate').modal('show')
    })

    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucLinhVuc').DataTable().row(id).data();
        $('#titleDel').html(`"${data.tenLinhVuc}"`)
        $('#idLVDDelete').val(data.maLinhVuc)
        $('#modalDeleteLVD').modal('show')
    })

    $('#btn-save-LVDAdd').on('click', function () {
        let tenLinhVuc = $('#tenLinhVucAdd').val()
        let moTa = $('#moTaAdd').val()
        var checked = $('#hoatDongLVDAdd_True')
        let trangthaiadd
        if (checked[0].checked == true) {
            trangthaiadd = "1"
        } else { trangthaiadd = "0" }
        let reqAdd = {
            "MaLinhVuc": 0,
            "TenLinhVuc": tenLinhVuc,
            "MoTa": moTa,
            "TrangThai": trangthaiadd
        }
        console.log(reqAdd)
        if (checkEmptyBlank(tenLinhVuc)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenLinhVuc) || !checkTagHtml(moTa)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/LinhVucApi/ThemMoiLinhVuc',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới lĩnh vực đo thành công', 'success')
                    $('#modalLinhVucAdd').modal('hide')
                    $('#dataGridDanhMucLinhVuc').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới lĩnh vực đo không thành công!", 'danger')
                }
            });
        }
    })
    $('#btn-save-LVDUpdate').on('click', function () {
        let tenLinhVuc = $('#tenLinhVucUpdate').val()
        let moTa = $('#moTaUpdate').val()
        var checked = $('#hoatDongLVDUpdate_True')
        let id = $('#idLVDUpdate').val()
        let trangthaiupdate
        if (checked[0].checked == true) {
            trangthaiupdate = "1"
        } else { trangthaiupdate = "0" }
        let reqUpdate = {
            "MaLinhVuc": id,
            "TenLinhVuc": tenLinhVuc,
            "MoTa": moTa,
            "TrangThai": trangthaiupdate
        }
        if (checkEmptyBlank(tenLinhVuc)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenLinhVuc) || !checkTagHtml(moTa)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/LinhVucApi/CapNhatLinhVuc',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Cập nhập lĩnh vực đo thành công', 'success')
                    $('#modalLinhVucUpdate').modal('hide')
                    $('#dataGridDanhMucLinhVuc').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi cập nhập lĩnh vực đo không thành công!", 'danger')
                }
            });
        }
    })

    // XOA
    $('#delete_LVD').on('click', function () {
        let id = $('#idLVDDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/LinhVucApi/XoaLinhVuc?Id=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa lĩnh vực đo thành công!", 'success')
                $('#modalDeleteLVD').modal('hide')
                $('#dataGridDanhMucLinhVuc').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                showNotify("Lỗi xóa lĩnh vực đo không thành công!", 'danger')
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