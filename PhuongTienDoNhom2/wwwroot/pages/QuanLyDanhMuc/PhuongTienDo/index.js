// ???NG D?N M?C ??NH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    $('#linhVucAdd').select2({
        width: "100%",
        language: "vi",
        placeholder: "Lĩnh vực",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#linhVucUpdate').select2({
        width: "100%",
        language: "vi",
        placeholder: "Lĩnh vực",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#donViDoAdd').select2({
        width: "100%",
        language: "vi",
        placeholder: "Đơn vị đo",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#donViDoUpdate').select2({
        width: "100%",
        language: "vi",
        placeholder: "Đơn vị đo",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#kieuAdd').select2({
        width: "100%",
        language: "vi",
        placeholder: "Kiểu phương tiện đo",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#kieuUpdate').select2({
        width: "100%",
        language: "vi",
        placeholder: "Kiểu phương tiện đo",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#nuocSanXuatAdd').select2({
        width: "100%",
        language: "vi",
        placeholder: "Nước sản xuất",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#nuocSanXuatUpdate').select2({
        width: "100%",
        language: "vi",
        placeholder: "Nước sản xuất",
        allowClear: true,
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
    });
    $('#linhVucAdd').on('change', function () {
        $('#donViDoAdd').removeAttr("disabled");
        let idLinhVuc = $('#linhVucAdd').val();

        $('#donViDoAdd').empty();
        if (idLinhVuc != "" && idLinhVuc != null) {
            $.ajax({
                type: 'get',
                async: false,
                url: APIURL + '/api/DonViDoApi/DanhSachDonViDoTheoLinhVuc?LinhVucID=' + idLinhVuc,
                headers: {
                    "Content-Type": "application/json"
                },
                dataType: "json",
                success: function (data) {
                    let html = '<option value="">"Đơn vị đo"</option>';
                    data.forEach(function (item, index) {
                        html += `<option value="${item.maDonViDo}">${item.ten}</option>`;
                    })
                    $('#donViDoAdd').append(html);
                },
                error: function (err) {
                    showNotify('Lỗi danh sách đơn vị.');
                }
            });
        }
    });

    $('#linhVucUpdate').on('change', function () {
        $('#donViDoUpdate').removeAttr("disabled");
        let idLinhVuc = $('#linhVucUpdate').val();

        $('#donViDoUpdate').empty();
        if (idLinhVuc != "" && idLinhVuc != null) {
            $.ajax({
                type: 'get',
                async: false,
                url: APIURL + '/api/DonViDoApi/DanhSachDonViDoTheoLinhVuc?LinhVucID=' + idLinhVuc,
                headers: {
                    "Content-Type": "application/json"
                },
                dataType: "json",
                success: function (data) {
                    let html = '<option value="">"Đơn vị đo"</option>';
                    data.forEach(function (item, index) {
                        html += `<option value="${item.maDonViDo}">${item.ten}</option>`;
                    })
                    $('#donViDoUpdate').append(html);
                },
                error: function (err) {
                    showNotify('Lỗi danh sách đơn vị.', 'danger');
                }
            });
        }
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
                showNotify('Lỗi danh sách lĩnh vực.', 'danger');
            }
        });
    })();
    (function loadDuLieuQuocGia() {
        $.ajax({
            type: 'get',
            async: false,
            url: APIURL + '/api/QuocGiaApi/DanhSachQuocGia',
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            success: function (data) {
                let html = '<option value=""></option>';
                if (data.length > 0) {
                    data.forEach(function (item, index) {
                        html += `<option value="${item.maQuocGia}">${item.tenQuocGia}</option>`;
                    })
                    $('#nuocSanXuatUpdate').append(html);
                    $('#nuocSanXuatAdd').append(html);
                }
            },
            error: function (err) {
                showNotify('Lỗi danh sách nước sản xuất.', 'danger');
            }
        });
    })();
    (function loadDuLieuKieu() {
        $.ajax({
            type: 'get',
            async: false,
            url: APIURL + '/api/KieuApi/DanhSachKieu',
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            success: function (data) {
                let html = '<option value=""></option>';
                if (data.length > 0) {
                    data.forEach(function (item, index) {
                        html += `<option value="${item.maKieu}">${item.tenKieu}</option>`;
                    })
                    $('#kieuAdd').append(html);
                    $('#kieuUpdate').append(html);
                }
            },
            error: function (err) {
                showNotify('Lỗi danh sách kiểu phương tiện đo.', 'danger');
            }
        });
    })();
    var collapsed1 = {};
    $('#dataGridPhuongTienDo').DataTable({
        "dom": '<"top area-filter"f>Brti<"page-record-custom"lp>',
        "buttons": [
            {

                extend: 'excelHtml5',
                title: 'DANH SÁCH PHƯƠNG TIỆN ĐO',
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
            url: APIURL + "/api/PhuongTienDoApi/DanhSachPhuongTienDo",
            type: "GET",
            dataSrc: function (data) {
                if (data) {

                    console.log(data)
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
                targets: [2,3,4,5],
                render: function (data, type, row, meta) {
                    if (data === 1) {
                        return `<i class="icon-ic_fluent_checkmark_24_regular icon-check"></i>`
                    }
                    else {
                        return `<span class="icon-dismiss">-</span>`
                    }

                }
            },
            {
                targets: 8,
                render: function (data, type, row, meta) {
                    return hoatDong(data);
                }
            },
            {
                targets: [9],
                "orderable": false,
            },
            {
                targets: 9,
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
            { data: "tenPhuongTien", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "pheDuyetMau", "width": "100px", "class": "center-align dnCustom", searchable: true },
            { data: "kiemDinhBanDau", "width": "100px", "class": "center-align dnCustom" },
            { data: "kiemDinhDinhKy", "width": "100px", "class": "center-align dnCustom" },
            { data: "kiemDinhSauSuaChua", "width": "100px", "class": "center-align dnCustom" },
            { data: "chuKyKiemDinh", "width": "150px", "class": "center-align dnCustom" },
            { data: "donVi", "width": "80px", "class": "left-align dnCustom" },
            { data: "trangThai", "width": "80px", "class": "center-align dnCustom" },
            { data: "maPhuongTien", "width": "100px", "class": "center-align nowrap group-icon-action stt-text" },
        ],
        rowGroup: {
            dataSrc: function (row) {
                return `${row.tenKieu ?? ""}`;
            },
            startRender: function (rows, group) {
                var collapsed = !!collapsed1[group];
                var title = group;
                rows.nodes().each(function (r) {
                    r.style.display = '';
                    if (!!collapsed) {
                        r.style.display = 'none';
                    }
                });

                return $('<tr/>')
                    .append(`<th colspan="10" class="th-nonpadding">
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
    $('#dataGridPhuongTienDo').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGridPhuongTienDo').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
    $('#click').on('click', function () {
        $('#modalPhuongTienDoUpdate').modal('show')
    })
    $('#btn-themmoi').on('click', function () {
        $('#vehicle1').prop("checked", false)
        $('#vehicle2').prop("checked", false)
        $('#vehicle3').prop("checked", false)
        $('#vehicle4').prop("checked", false)
        $('#modalPhuongTienDoAdd').modal('show')
    })
    $(document).on('click', '.btn-edit', function () {
        $('#vehicle1Update').prop("checked", false)
        $('#vehicle2Update').prop("checked", false)
        $('#vehicle3Update').prop("checked", false)
        $('#vehicle4Update').prop("checked", false)
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridPhuongTienDo').DataTable().row(id).data();
        console.log(data)
        $('#tenPhuongTienUpdate').val(data.tenPhuongTien)
        $('#kieuUpdate').val(data.maKieu).trigger('change')
        $('#linhVucUpdate').val(data.maLinhVuc).trigger('change')
        $('#chuKyUpdate').val(data.chuKyKiemDinh)
        $('#donViDoUpdate').val(data.maDonViDo).trigger('change')
        $('#nuocSanXuatUpdate').val(data.nuocSanXuat).trigger('change')
        $('#idPhuongTienDoUpdate').val(data.maPhuongTien)
        $('#idMaNhom2').val(data.maNhom2)
        var pheduyetmau
        if (data.pheDuyetMau == 1) {
            $('#vehicle1Update').prop("checked", true)
        }
        if (data.kiemDinhBanDau == 1) {
            $('#vehicle2Update').prop("checked", true)
        }
        if (data.kiemDinhDinhKy == 1) {
            $('#vehicle3Update').prop("checked", true)
        }
        if (data.kiemDinhSauSuaChua == 1) {
            $('#vehicle4Update').prop("checked", true)
        }
        if (data.trangThai == 1) {
            $("#hoatDongPhuongTienDoUpdate_True").prop('checked', true)
        } else {
            $("#dungHoatDongPhuongTienDoUpdate_False").prop('checked', true)
        }
        $('#modalPhuongTienDoUpdate').modal('show')
    })

    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGridPhuongTienDo').DataTable().row(id).data();
        $('#idPhuongTienDoDelete').val(data.maPhuongTien)
        $('#titleDel').html(`"${data.tenPhuongTien}"`)
        $('#modalDeletePhuongTienDo').modal('show')
    })
    $('#btn-save-PhuongTienDoAdd').on('click', function () {
        let tenPhuongTien = $('#tenPhuongTienDoAdd').val()
        let kieu = $('#kieuAdd').val()
        let linhVuc = $('#linhVucAdd').val()
        let chuKy = $('#chuKyAdd').val()
        let donVi = $('#donViDoAdd').val()
        let hoatdong
        let v1
        let v2
        let v3
        let v4
        let quocgia = $('#nuocSanXuatAdd').val()
        var checked1 = $("#vehicle1")
        if (checked1[0].checked == true) {
            v1 = 1
        } else { v1 = 0 }

        var checked2 = $("#vehicle2")
        if (checked2[0].checked == true) {
            v2 = 1
        } else { v2 = 0 }

        var checked3 = $("#vehicle3")
        if (checked3[0].checked == true) {
            v3 = 1
        } else { v3 = 0 }

        var checked4 = $("#vehicle4")
        if (checked4[0].checked == true) {
            v4 = 1
        } else { v4 = 0 }


        var checked = $("#hoatDongPhuongTienDoAdd_True")
        if (checked[0].checked == true) {
            hoatdong = 1
        } else { hoatdong = 0 }
        let reqAdd = {
            "MaPhuongTien": 0,
            "MaCoSo": null,
            "MaNhom2": 0,
            "MaToChucTiepNhan": null,
            "TenPhuongTien": tenPhuongTien,
            "NuocSanXuat": quocgia,
            "HangSanXuat": "",
            "NamSanXuat": "",
            "NamSuDung": "",
            "SoSanXuat": "",
            "KieuKyKieu": "",
            "DacTrungKyThuat": "",
            "NoiSuDung": "",
            "TrangThai": hoatdong,
            "MaDonVi": donVi,
            "MaKieu": kieu,
            "MaLinhVuc": linhVuc,
            "PheDuyetMau": v1,
            "KiemDinhBanDau": v2,
            "KiemDinhDinhKy": v3,
            "KiemDinhSauSuaChua": v4,
            "ChuKyKiemDinh": chuKy

        }
        
        console.log(reqAdd)
        if (checkEmptyBlank(tenPhuongTien) || checkEmptyBlank(chuKy)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenPhuongTien) || !checkTagHtml(chuKy)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'post',
                async: false,
                url: APIURL + '/api/PhuongTienDoApi/ThemMoiPhuongTienDo',
                data: JSON.stringify(reqAdd),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Thêm mới phương tiện đo thành công', 'success')
                    $('#modalPhuongTienDoAdd').modal('hide')
                    $('#dataGridPhuongTienDo').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi thêm mới phương tiện đo không thành công!", 'danger')
                }
            });
        }
    })

    $('#btn-save-PhuongTienDoUpdate').on('click', function () {
        let tenPhuongTien = $('#tenPhuongTienUpdate').val()
        let kieu = $('#kieuUpdate').val()
        let linhVuc = $('#linhVucUpdate').val()
        let chuKy = $('#chuKyUpdate').val()
        let donVi = $('#donViDoUpdate').val()
        let quocGia = $('#nuocSanXuatUpdate').val()
        let maPhuongTien = $('#idPhuongTienDoUpdate').val()
        let manhom2 = $('#idMaNhom2').val()
        let hoatdong
        let v1
        let v2
        let v3
        let v4

        var checked1 = $("#vehicle1Update")
        if (checked1[0].checked == true) {
            v1 = 1
        } else { v1 = 0 }

        var checked2 = $("#vehicle2Update")
        if (checked2[0].checked == true) {
            v2 = 1
        } else { v2 = 0 }

        var checked3 = $("#vehicle3Update")
        if (checked3[0].checked == true) {
            v3 = 1
        } else { v3 = 0 }

        var checked4 = $("#vehicle4Update")
        if (checked4[0].checked == true) {
            v4 = 1
        } else { v4 = 0 }


        var checked = $("#hoatDongPhuongTienDoUpdate_True")
        if (checked[0].checked == true) {
            hoatdong = 1
        } else { hoatdong = 0 }
        let reqUpdate = {
            "MaPhuongTien": maPhuongTien,
            "MaCoSo": null,
            "MaNhom2": manhom2,
            "MaToChucTiepNhan": null,
            "TenPhuongTien": tenPhuongTien,
            "NuocSanXuat": quocGia,
            "HangSanXuat": null,
            "NamSanXuat": null,
            "NamSuDung": null,
            "SoSanXuat": null,
            "KieuKyKieu": null,
            "DacTrungKyThuat": null,
            "NoiSuDung": null,
            "TrangThai": hoatdong,
            "MaDonVi": donVi,
            "MaKieu": kieu,
            "MaLinhVuc": linhVuc,
            "PheDuyetMau": v1,
            "KiemDinhBanDau": v2,
            "KiemDinhDinhKy": v3,
            "KiemDinhSauSuaChua": v4,
            "ChuKyKiemDinh": chuKy

        }
        console.log(reqUpdate)
        if (checkEmptyBlank(tenPhuongTien) || checkEmptyBlank(chuKy)) {
            showNotify("Yêu cầu nhập đầy đủ thông tin!", 'danger')
        } else if (!checkTagHtml(tenPhuongTien) || !checkTagHtml(chuKy)) {
            showNotify('Vui lòng nhập dữ liệu đúng định dạng!', "danger")
        } else {
            $.ajax({
                type: 'put',
                async: false,
                url: APIURL + '/api/PhuongTienDoApi/CapNhatPhuongTienDo',
                data: JSON.stringify(reqUpdate),
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    //console.log('1')
                    showNotify('Cập nhập phương tiện đo thành công', 'success')
                    $('#modalPhuongTienDoUpdate').modal('hide')
                    $('#dataGridPhuongTienDo').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                    showNotify("Lỗi cập nhập phương tiện đo không thành công!", 'danger')
                }
            });
        }
    })
    $('#delete_PhuongTienDo').on('click', function () {
        let id = $('#idPhuongTienDoDelete').val()

        $.ajax({
            type: 'delete',
            async: false,
            url: APIURL + '/api/PhuongTienDoApi/XoaPhuongTienDo?ID=' + id,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                //console.log('1')
                showNotify("Xóa phương pháp đo thành công!", 'success')
                $('#modalDeletePhuongTienDo').modal('hide')
                $('#dataGridPhuongPhapDo').DataTable().ajax.reload().draw();
            },
            error: function (err) {
                showNotify("Lỗi xóa phương tiện đo không thành công!", 'danger')
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