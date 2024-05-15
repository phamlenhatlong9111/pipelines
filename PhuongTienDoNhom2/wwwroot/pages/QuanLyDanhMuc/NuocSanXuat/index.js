// ???NG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    $('#dataGridDanhMucNoiSanXuat').DataTable({
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
            url: APIURL + "/api/QuocGiaApi/DanhSachQuocGia",
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
            //{
            //    targets: [1],
            //    searchable: true
            //},
            {
                targets: [3],
                "orderable": false,
            },
            {
                targets: 3,
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
            { data: "maQuocGia", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "tenQuocGia", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "maQuocGia", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGridDanhMucNoiSanXuat').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridDanhMucNoiSanXuat').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
        $('#modalQuocGiaAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucNoiSanXuat').DataTable().row(id).data();
        $('#maQuocGiaUpdate').val(data.maQuocGia)
        $('#tenQuocGiaUpdate').val(data.tenQuocGia)
        $('#idQuocGiaUpdate').val(data.maQuocGia)
        $('#modalQuocGiaUpdate').modal('show')
    })

    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucNoiSanXuat').DataTable().row(id).data();
        $('#titleDel').html(`<span class="cusTitleDel">"${data.tenQuocGia}"</span>`)
        $('#idQuocGiaDelete').val(data.maQuocGia)
        $('#modalDeleteQuocGia').modal('show')
    })

    $('#btn-save-QuocGiaAdd').on('click', function () {
        let maQuocGia = $('#maQuocGiaAdd').val()
        let tenQuocGia = $('#tenQuocGiaAdd').val()
        let reqAdd = {
            "Id": "",
            "MaQuocGia": maQuocGia,
            "TenQuocGia": tenQuocGia,

        }
        if (checkEmptyBlank(maQuocGia) || checkEmptyBlank(tenQuocGia)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(maQuocGia) || !checkTagHtml(tenQuocGia)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/QuocGiaApi/ThemMoiQuocGia',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới nơi sản xuất thành công', 'success')
                    $('#modalQuocGiaAdd').modal('hide')
                    $('#dataGridDanhMucNoiSanXuat').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới nơi sản xuất không thành công!", 'danger')
                }
            });
        }
    })
    $('#btn-save-QuocGiaUpdate').on('click', function () {
        let id = $('#idQuocGiaUpdate').val()
        let maQuocGia = $('#maQuocGiaUpdate').val()
        let tenQuocGia = $('#tenQuocGiaUpdate').val()
        let reqUpdate = {
            "Id": id,
            "MaQuocGia": maQuocGia,
            "TenQuocGia": tenQuocGia,

        }
        if (checkEmptyBlank(maQuocGia) || checkEmptyBlank(tenQuocGia)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(maQuocGia) || !checkTagHtml(tenQuocGia)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/QuocGiaApi/CapNhatQuocGia',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Cập nhập nơi sản xuất thành công', 'success')
                    $('#modalQuocGiaUpdate').modal('hide')
                    $('#dataGridDanhMucNoiSanXuat').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi cập nhập nơi sản xuất không thành công!", 'danger')
                }
            });
        }
    })

    // XOA
    $('#delete_QuocGia').on('click', function () {
        let id = $('#idQuocGiaDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/QuocGiaApi/XoaQuocGia?MaQuocGia=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa nước sản xuất thành công!", 'success')
                $('#modalDeleteQuocGia').modal('hide')
                $('#dataGridDanhMucNoiSanXuat').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                showNotify("Lỗi xóa nước sản xuất  không thành công!", 'danger')
            }
        });
    })

})