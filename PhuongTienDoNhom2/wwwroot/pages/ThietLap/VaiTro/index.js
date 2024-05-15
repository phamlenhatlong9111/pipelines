// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    $('#dataTable-VaiTro').DataTable({
        "dom": 'frti<"page-record-custom"lp>',
        "ordering": false,
        "autoWidth": false,
        "bInfo": false,
        "bLengthChange": true,
        "filter": true,
        //"stateSave": true,
        "async": false,
        "paging": true,
        "pagingType": 'full_numbers',
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Tất cả"]],
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
            "sLoadingRecords": "Đang tải...",
            "sSearchPlaceholder": "Tên vai trò...",
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
            url: `${APIURL}/api/VaiTroApi/DanhSachVaiTro`,
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    let result = data.value;
                    result.map((item, index) => {
                        item.stt = index + 1;
                    })
                    return result;
                }
                return []

            }
        },
        "columnDefs": [
            {
                targets: 2,
                render: function (data, type, row, meta) {
                    return `<div class="edit-delete-detail">
                                <span title="Chỉnh sửa" class="btn-edit edit-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                                <span title="Xóa" class="btn-delete delete-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                            </div>`;

                }
            },

        ],
        "columns": [
            { data: "stt", "width": "40px", "class": "stt-text center-align" },
            { data: "name", "width": "auto", "class": "left-align dnCustom" },
            { data: "", "width": "120px", "class": "center-align" },
            //{ data: "", "width": "120px", "class": "left-align dnCustom" },
            //{ data: "", "width": "120px", "class": "center-align group-icon-action" },
        ]


    });
    $('#dataTable-VaiTro').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataTable-VaiTro').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
            this.data(i++);
        });
    }).draw();
    $('.dataTables_filter').appendTo('.filter-datatable')
    $('.dataTables_filter').addClass('icon-search').addClass('fluent-ui').addClass('fluent-ui-regular')
    $('.dataTables_length select').addClass('form-control')
    $('.dataTables_filter input').addClass('form-control dt-filter')
    $('select').select2({
        placeholder: "Chọn",
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        language: "vi",
        allowClear: true,
        minimumResultsForSearch: Infinity
    });
    let dataKiemTra
    $.ajax({
        url: APIURL + "/api/VaiTroApi/DanhSachVaiTro",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "accept": "*/*"
        },
        success: function (data) {
            if (data.isSuccess && data.value.length > 0) {
                dataKiemTra = data.value
            }
            else {
                dataKiemTra = []
            }

        },
        error: function (err) {
            console.log(err)
        }
    })
    $(document).on('click', '#ThemMoiVaiTro', function () {
        let tenVaiTro = $("#tenVaiTroAdd").val();
        if (checkEmptyBlank(tenVaiTro)) {
            showNotify("Tên vai trò không được để trống", "danger")
        }
        else {
            if (!checkTagHtml(tenVaiTro)) {
                showNotify("Tên vai trò chứa kí tự không phù hợp", "danger")
            }
            else if (dataKiemTra.some(item => item.name.toLowerCase() == tenVaiTro.toLowerCase())) {
                showNotify("Tên vai trò không được trùng với vai trò hiện tại", "danger")
            }
            else {
                $.ajax({
                    url: APIURL + "/api/VaiTroApi/ThemMoiVaiTro",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "accept": "text/plain",
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "name": `${tenVaiTro}`,
                        "normalizedName": `${tenVaiTro}`
                    }),
                    success: function (data) {
                        if (data.isSuccess) {
                            showNotify("Thêm mới thành công", "success"),
                                //ẩn modal
                                $('#modalAddVaiTro').modal('hide');
                            //làm sạch modal
                            $("#tenVaiTroAdd").val("");
                            $('#dataTable-VaiTro').DataTable().ajax.reload().draw();
                        }
                    },
                    error: function (err) {
                        showNotify("Thêm mới không thành công", "danger");
                        console.log(err)
                    }
                })

            }

        }
    })
    //Clear modal
    $("#modalAddVaiTro").on('hidden.bs.modal', function () {
        $("#tenVaiTroAdd").val("");
    })
    //Modal-add
    $(document).on('click', '#ThemVaiTro', function () {
        $('#modalAddVaiTro').modal('show');
    })
    //Modal-update
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataTable-VaiTro').DataTable().row(id).data();
        $('#modalUpdateVaiTro').modal('show');
        $("#IdVaiTroUpdate").val(data.id)
        $("#tenVaiTroUpdate").val(data.name)
    })
    $(document).on('click', '#CapNhatVaiTro', function () {
        let IdVaiTroUpdate = $("#IdVaiTroUpdate").val();
        let tenVaiTroUpdate = $("#tenVaiTroUpdate").val();
        if (checkEmptyBlank(tenVaiTroUpdate)) {
            showNotify("Tên vai trò không được để trống", "danger")
        }
        else {
            if (!checkTagHtml(tenVaiTroUpdate)) {
                showNotify("Tên vai trò chứa kí tự không phù hợp", "danger")
            }
            else if (dataKiemTra.some(item => item.name.toLowerCase() == tenVaiTroUpdate.toLowerCase())) {
                showNotify("Tên vai trò không được trùng với vai trò hiện tại", "danger")
            }
            else {
                $.ajax({
                    url: APIURL + "/api/VaiTroApi/CapNhatVaiTro",
                    "method": "PUT",
                    "timeout": 0,
                    "headers": {
                        "accept": "text/plain",
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "id": `${IdVaiTroUpdate}`,
                        "name": `${tenVaiTroUpdate}`,
                        "normalizedName": `${tenVaiTroUpdate}`,
                    }),
                    success: function (data) {
                        console.log(data);
                        if (data.isSuccess) {

                            showNotify("Cập nhật thành công", "success"),
                                //ẩn modal
                                $('#modalUpdateVaiTro').modal('hide');
                            $('#dataTable-VaiTro').DataTable().ajax.reload().draw();
                        }
                    },
                    error: function (err) {
                        showNotify("Cập nhật thất baị", "danger");
                        console.log(err)
                    }
                })
            }
        }
        
    })
    //Modal-delete
    $(document).on('click', '.btn-delete', function () {
        $('#modalDeleteVaiTro').modal('show');
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataTable-VaiTro').DataTable().row(id).data();
        $("#idVaiTroDelete").val(data.id)
        $("#titleVaiTro").text(`"${data.name}"`)
    })
    $('#delete_VaiTro').on('click', function () {
        let idVaiTro = $('#idVaiTroDelete').val();
        let tenVaiTro = $('#titleVaiTro').val();
        $.ajax({
            type: 'delete',
            url: `${APIURL}/api/VaiTroApi/XoaVaiTro`,
            "method": "PUT",
            "timeout": 0,
            "headers": {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "id": `${idVaiTro}`
            }),
            success: function (data) {
                $('#modalDeleteVaiTro').modal('hide');
                $('#dataTable-VaiTro').DataTable().ajax.reload().draw();
                showNotify(`Xóa ${tenVaiTro} thành công`, 'success')
            },
            error: function (err) {
                console.log(err);
                showNotify(`Xóa ${tenVaiTro} không thành công!, vui lòng liên hệ quản trị viên`, 'danger')
            }

        })
    })
})