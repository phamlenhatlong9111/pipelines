
// ???NGNG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    $('#linhVucUpdate').select2({
        width: "100%",
        language: "vi",
        placeholder: "Lĩnh vực",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#linhVucAdd').select2({
        width: "100%",
        language: "vi",
        placeholder: "Lĩnh vực",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });

    (function loadDuLieuLinhVuc() {
        $.ajax({
            type: 'get',
            async: false,
            url: APIURL + '/api/LinhVucApi/DanhSachLinhVuc',
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            success: function (data) {
                let html = '<option value=""></option>';
                if (data.value.length > 0) {
                    data.value.forEach(function (item, index) {
                        html += `<option value="${item.maLinhVuc}">${item.tenLinhVuc}</option>`;
                    })
                    $('#linhVucAdd').append(html);
                    $('#linhVucUpdate').append(html);
                }
            },
            error: function (err) {
                alert('L?i.');
            }
        });
    })();
    var collapsed1 = {};
    dataGridDMDV = $('#dataGridDanhMucDonVi').DataTable({
        "dom": '<"top area-filter"f>rti<"page-record-custom"lp>',
        "buttons": [
            {

                extend: 'excelHtml5',
                title: 'DANH SÁCH ĐƠN VỊ ĐO',
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
            url: APIURL + "/api/DonViDoApi/DanhSachDonViDo",
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
            { data: "ten", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "kyHieu", "width": "100px", "class": "left-align dnCustom", searchable: true },
            { data: "tenLinhVuc", "width": "300px", "class": "left-align dnCustom", searchable: true },
            { data: "trangThai", "width": "100px", "class": "center-align dnCustom" },
            { data: "maDonViDo", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ],
        rowGroup: {
            dataSrc: function (row) {
                return `${row.tenLinhVuc ?? ""}`;
            },
            startRender: function (rows, group) {
                var collapsed = !!collapsed1[group];
                var title = group ;
                rows.nodes().each(function (r) {
                    r.style.display = '';
                    if (!!collapsed) {
                        r.style.display = 'none';
                    }
                });

                return $('<tr/>')
                    .append(`<th colspan="7" class="th-nonpadding">
                        <div class="collapse-icon">
                            <i class="icon-ic_fluent_chevron_down_24_regular chevronDown"></i>
                            <div class="title-SPDV">${title}</div>
                        </div>
                        </th>`)
                    .attr('data-name', group)
                    .toggleClass('collapsed', collapsed);
            },
        },

    });
    $('#dataGridDanhMucDonVi tbody').on('click', 'tr.dtrg-level-0', function () {
        var name = $(this).data('name');
        collapsed1[name] = !collapsed1[name];
        dataGridDMDV.draw(false);
    });
    $('#dataGridDanhMucDonVi').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridDanhMucDonVi').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
        $('#modalDonViDoAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucDonVi').DataTable().row(id).data();
        console.log(data)
        $('#donViDoUpdate').val(data.ten)
        $('#idDVDUpdate').val(data.maDonViDo)
        $('#kyHieuUpdate').val(data.kyHieu)
        $('#linhVucUpdate').val(data.maLinhVuc).trigger('change')
        if (data.trangThai == 1) {
            $("#hoatDongDVDUpdate_True").prop('checked', true)
        } else {
            $("#dungHoatDongDVDUpdate_False").prop('checked', true)
        }
        $('#modalDonViDoUpdate').modal('show')
    })

    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridDanhMucDonVi').DataTable().row(id).data();
        $('#titleDel').html(`"${data.ten}"`)
        $('#idDVDDelete').val(data.maDonViDo)
        $('#modalDeleteDonViDo').modal('show')
    })

    $('#btn-save-DVDAdd').on('click', function () {
        let ten = $('#donViDoAdd').val()
        let kyHieu = $('#kyHieuAdd').val()
        let linhVuc = $('#linhVucAdd').val()
        var checked = $('#hoatDongDVDAdd_True')
        let trangthaiadd
        if (checked[0].checked == true) {
            trangthaiadd = "1"
        } else { trangthaiadd = "0" }
        let reqAdd = {
            "MaDonViDo": 0,
            "Ten": ten,
            "KyHieu": kyHieu,
            "MaLinhVuc": linhVuc,
            "DaiLuong": "",
            "TrangThai": trangthaiadd
        }
        if (checkEmptyBlank(ten)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (linhVuc == null || linhVuc == '') {
            showNotify("Yêu cầu phải chọn lĩnh vực đo!", 'danger')
        }
        else if (!checkTagHtml(ten)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/DonViDoApi/ThemMoiDonViDo',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới đơn vị đo thành công', 'success')
                    $('#modalDonViDoAdd').modal('hide')
                    $('#dataGridDanhMucDonVi').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới đơn vị đo không thành công!", 'danger')
                }
            });
        }
    })
    $('#btn-save-DVDUpdate').on('click', function () {
        let ten = $('#donViDoUpdate').val()
        let kyHieu = $('#kyHieuUpdate').val()
        let linhVuc = $('#linhVucUpdate').val()
        var checked = $('#hoatDongDVDUpdate_True')
        let id = $('#idDVDUpdate').val()
        let trangthaiupdate
        if (checked[0].checked == true) {
            trangthaiupdate = "1"
        } else { trangthaiupdate = "0" }
        let reqUpdate = {
            "MaDonViDo": id,
            "Ten": ten,
            "KyHieu": kyHieu,
            "MaLinhVuc": linhVuc,
            "DaiLuong": "",
            "TrangThai": trangthaiupdate
        }
        if (checkEmptyBlank(ten)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (linhVuc == null || linhVuc == '') {
            showNotify("Yêu cầu phải chọn lĩnh vực đo!", 'danger')
        }
        else if (!checkTagHtml(ten)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/DonViDoApi/CapNhatDonViDo',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Chỉnh sửa đơn vị đo thành công', 'success')
                    $('#modalDonViDoUpdate').modal('hide')
                    $('#dataGridDanhMucDonVi').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi chỉnh sửa đơn vị đo không thành công!", 'danger')
                }
            });
        }
    })

    // XOA
    $('#delete_Kieu').on('click', function () {
        let id = $('#idDVDDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/DonViDoApi/XoaDonViDo?Id=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa đơn vị đo thành công!", 'success')
                $('#modalDeleteDonViDo').modal('hide')
                $('#dataGridDanhMucDonVi').DataTable().ajax.reload().draw();
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
function checkEmptyBlank(str) {
    if (str == null || str.trim().length === 0) {
        return true
    }
    return false
}