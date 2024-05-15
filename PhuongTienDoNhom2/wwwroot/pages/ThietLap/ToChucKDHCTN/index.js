// ???NG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {

    $('#dataGridToChucKDTCTN').DataTable({
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
            url: APIURL + "/api/HT_ToChucQuanLyApiControllercs/DanhSachToChucHeThong",
            type: "GET",
            dataSrc: function (data) {        
                if (data.isSuccess && data.value.length > 0) {
                    data.value.map((item, index) => {
                        item.stt = index + 1
                
                    })       
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
                        return `<span>${row?.dienThoai}</span><br/>
                                    <span>${row?.hopThu}</span><br/>
                                    <span>${row?.diaChi}</span>`
                   
                 

                }
            },
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    if (data === true) {
                        return `<i class="icon icon-ic_fluent_checkmark_24_regular icon-check"></i>`
                    }
                    else {
                        return `<i class="icon icon-ic_fluent_dismiss_24_regular icon-dismiss"></i>`
                    }

                }
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
            { data: "maDinhDanh", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "tenToChuc", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "", "width": "auto", "class": "center-align dnCustom" },
            { data: "trangThai", "width": "auto", "class": "center-align dnCustom" },
            { data: "", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGridToChucKDTCTN').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridToChucKDTCTN').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridToChucKDTCTN').DataTable().row(id).data();
        $('#maToChucUpdate').val(data.maToChuc)
        $('#maDinhDanhUpdate').val(data.maDinhDanh)
        $('#tenToChucUpdate').val(data.tenToChuc)
        $('#gioiThieuUpdate').val(data.gioiThieu)
        $('#dienThoaiUpdate').val(data.dienThoai)
        $('#hopThuUpdate').val(data.hopThu)
        $('#diaChiUpdate').val(data.diaChi)
        $('#nguoiLienHeUpdate').val(data.nguoiLienHe)
        $('#chucVuUpdate').val(data.chucVu)
        $("#suDungToChucKDTCTNUpdate").prop("checked", data.trangThai)
        $('#modalToChucKDTCTNUpdate').modal('show')
    })
    $('#btn-save-KDTCTNUpdate').on('click', function () {
        let maToChucUpdate = $('#maToChucUpdate').val()
        let maDinhDanhUpdate = $('#maDinhDanhUpdate').val()
        let tenToChucUpdate = $('#tenToChucUpdate').val()
        let gioiThieuUpdate = $('#gioiThieuUpdate').val()
        let dienThoaiUpdate = $('#dienThoaiUpdate').val()
        let hopThuUpdate = $('#hopThuUpdate').val()
        let diaChiUpdate = $('#diaChiUpdate').val()
        let nguoiLienHeUpdate = $('#nguoiLienHeUpdate').val()
        let chucVuUpdate = $('#chucVuUpdate').val()
        let suDungUpdate = $("#suDungToChucKDTCTNUpdate").is(':checked');
        let reqUpdate = {
          "maToChuc": maToChucUpdate,
          "maDinhDanh": maDinhDanhUpdate,
          "tenToChuc": tenToChucUpdate,
          "gioiThieu": gioiThieuUpdate,
          "diaChi": diaChiUpdate,
          "dienThoai": dienThoaiUpdate,
          "hopThu": hopThuUpdate,
          "nguoiLienHe": nguoiLienHeUpdate,
          "chucVu": chucVuUpdate,
          "trangThai": suDungUpdate
        }
        if (checkEmptyBlank(tenToChucUpdate)) {
            showNotify("Vui lòng nhập tên tổ chức!", 'danger')
            $("#tenToChucUpdate").focus();
        }
        else if (!checkTagHtml(tenToChucUpdate)) {
            showNotify('Vui lòng nhập dữ liệu tổ chức đúng định dạng!', "danger")
            $("#tenToChucUpdate").focus();
        }
        else if (!phonenumber(dienThoaiUpdate)) {
        
            showNotify('Vui lòng nhập số điện thoại có độ dài tối thiểu 10 kí tự!', "danger")
            $("#dienThoaiUpdate").focus();
        }
        else if (!checkEmail(hopThuUpdate)) {
            showNotify('Hộp thư không hợp lệ!', "danger");
            $("#hopThuUpdate").focus();
        }
         else {
            $.ajax({
                type: 'put',
                async: false,
                url: `${APIURL}/api/HT_ToChucQuanLyApiControllercs/CapNhatToChucHeThong`,
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Cập nhập tổ chức kiểm định hiệu chuẩn thử nghiệm thành công', 'success')
                    $('#modalToChucKDTCTNUpdate').modal('hide')
                    $('#dataGridToChucKDTCTN').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    console.log(err);
                    showNotify("Lỗi cập nhập tổ chức kiểm định hiệu chuẩn thử nghiệm không thành công!", 'danger')
                }
            });
        }
    })

    $('#btn-themmoi').on('click', function () {
        $('#modalToChucKDTCTNAdd').modal('show')
    })
    $('#btn-save-KDTCTNAdd').on('click', function () {
        let maDinhDanhAdd = $('#maDinhDanhAdd').val()
        let tenToChucAdd = $('#tenToChucAdd').val()
        let gioiThieuAdd = $('#gioiThieuAdd').val()
        let dienThoaiAdd = $('#dienThoaiAdd').val()
        let hopThuAdd = $('#hopThuAdd').val()
        let diaChiAdd = $('#diaChiAdd').val()
        let nguoiLienHeAdd = $('#nguoiLienHeAdd').val()
        let chucVuAdd = $('#chucVuAdd').val()
        let suDungAdd = $("#suDungToChucKDTCTNAdd").is(':checked');
        let reqAdd = {
            "maDinhDanh": maDinhDanhAdd,
            "tenToChuc": tenToChucAdd,
            "gioiThieu": gioiThieuAdd,
            "diaChi": diaChiAdd,
            "dienThoai": dienThoaiAdd,
            "hopThu": hopThuAdd,
            "nguoiLienHe": nguoiLienHeAdd,
            "chucVu": chucVuAdd,
            "trangThai": suDungAdd
        }
        if (checkEmptyBlank(tenToChucAdd)) {
            showNotify("Vui lòng nhập tên tổ chức!", 'danger')
            $("#tenToChucUpdate").focus();
        }
        else if (!checkTagHtml(tenToChucAdd)) {
            showNotify('Vui lòng nhập dữ liệu tổ chức đúng định dạng!', "danger")
            $("#tenToChucUpdate").focus();
        }
        else if (!phonenumber(dienThoaiAdd)) {

            showNotify('Vui lòng nhập số điện thoại có độ dài tối thiểu 10 kí tự!', "danger")
            $("#dienThoaiUpdate").focus();
        }
        else if (!checkEmail(hopThuAdd)) {
            showNotify('Hộp thư không hợp lệ!', "danger");
            $("#hopThuUpdate").focus();
        }
        else {
            $.ajax({
                type: 'post',
                async: false,
                url: `${APIURL}/api/HT_ToChucQuanLyApiControllercs/ThemMoiToChucHeThong`,
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    showNotify('Thêm mới tổ chức kiểm định hiệu chuẩn thử nghiệm thành công', 'success')
                    $('#modalToChucKDTCTNAdd').modal('hide')
                    $('#dataGridToChucKDTCTN').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    console.log(err);
                    showNotify("Lỗi thêm mới tổ chức kiểm định hiệu chuẩn thử nghiệm không thành công!", 'danger')
                }
            });
        }
    })
    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridToChucKDTCTN').DataTable().row(id).data();
        $('#titleDel').html(`"${data.tenToChuc}"`)
        $('#idToChucDelete').val(data.maToChuc)
        $('#modalDeleteToChuc').modal('show')

    })

    // XOA
    $('#delete_ToChuKDHCTN').on('click', function () {
        let id = $('#idToChucDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: `${APIURL}/api/HT_ToChucQuanLyApiControllercs/XoaToChucHeThong?MaToChuc=${id}`,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log(data);
                //console.log('1')
                showNotify("Xóa tổ chức kiểm định hiệu chuẩn thử nghiệm thành công!", 'success')
                $('#modalDeleteToChuc').modal('hide')
                $('#dataGridToChucKDTCTN').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                console.log(err);
                showNotify("Lỗi xóa tổ chức kiểm định hiệu chuẩn thử nghiệm không thành công!", 'danger')
            }
        });
    })

})
function hoatDong(data) {
    if (data == 1) {
        return '<i class="icon-ic_fluent_checkmark_24_regular icon-check"></i>'
    }
    if (data == 0) {
        return '<i class="icon-ic_fluent_dismiss_24_regular icon-dismiss"></i>'
    } else {
        return ""
    }
}