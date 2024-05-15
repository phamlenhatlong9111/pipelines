//Phương tiện kiểm định

var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;

$(document).ready(function () {
    let sttFile = 0, sttFileUpdate = 0
    let resultLinhVuc = danhSachLinhVuc()
    let resultToChuc = danhSachToChuc()
    let resultQuocGia = danhSachNuoc()
    let resultPTDN2 = danhSachPhuongTienNhom2()

    //Datatable
    $('#dataGrid').DataTable({
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
            url: `${APIURL}/api/TDC_PhuongTienKiemDinhApi/danhsach`,
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    let result = data.value
                    result.map((item, index) => {
                        item.stt = index + 1
                        item.namSanXuat = item.namSanXuat ? formatDate(new Date(item.namSanXuat)) : ''
                        item.namSuDung = item.namSuDung ? formatDate(new Date(item.namSuDung)) : ''
                        item.ngayCap = item.ngayCap ? formatDate(new Date(item.ngayCap)) : ''
                        item.ngayHetHan = item.ngayHetHan ?  formatDate(new Date(item.ngayHetHan)) :''
                        for (let i = 0; i < resultLinhVuc.length; i++) {
                            result.map((item) => {
                                if (resultLinhVuc[i].value == item.linhVuc) {
                                    item.linhVucF = resultLinhVuc[i].text
                                }
                            })

                        }

                    })
                    console.log(result)

                    return result;
                }
                return []

            }
        },
        "columnDefs": [
            {
                targets: 1,
                render: function (data, type, row, meta) {
                    return `<span id=n-${meta.row} class="detailQuyTrinh">${data}</span>`
                }
            },
            
            {
                targets: 7,
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
            { data: "phuongTienNhom2", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "linhVucF", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "soGiayChungNhan", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "ngayHetHan", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "trangThai", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "maQuyTrinh", "width": "120px", "class": "center-align nowrap group-icon-action stt-text" },
        ]


    });
    $('#dataGrid').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#dataGrid').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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

    $('#toChucAdd').select2({
        placeholder: "Chọn tổ chức",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalAdd'),
    });
    $('#nuocSanXuatAdd').select2({
        placeholder: "Chọn quốc gia",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalAdd'),
    });
    $('#quyTrinhSuDungAdd').select2({
        placeholder: "Chọn quy trình",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalAdd'),
    });
    $('#maNhom2Add').select2({
        placeholder: "Chọn nhóm phương tiện",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalAdd'),
    });
    $('#toChucUpdate').select2({
        placeholder: "Chọn tổ chức",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalUpdate'),
    });
    $('#nuocSanXuatUpdate').select2({
        placeholder: "Chọn quốc gia",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalUpdate'),
    });
    $('#quyTrinhSuDungUpdate').select2({
        placeholder: "Chọn quy trình",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalUpdate'),
    });
    $('#maNhom2Update').select2({
        placeholder: "Chọn nhóm phương tiện",
        theme: 'bootstrap4',
        width: '100%',
        language: "vi",
        allowClear: true,
        dropdownParent: $('#modalUpdate'),
    });


    //Datetimepicker
    $('.datetimeLX').datetimepicker({
        "useCurrent": false,
        "allowInputToggle": true,
        "showClose": false,
        "showClear": false,
        "showTodayButton": false,
        "format": "DD/MM/YYYY",
        "locale": 'vi',
    }).on('dp.change', function (e) {
    });

    //Modal details
    $(document).on('click', '.detailQuyTrinh', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGrid').DataTable().row(id).data();
        console.log(data)
        $("#tenPhuongTienDetail").text(data.tenPhuongTien)
        $("#toChucDetail").text(data.tenToChuc)
        $("#maNhom2Detail").text(data.phuongTienNhom2)
        $("#linhVucDetail").text(data.linhVucF)
        $("#nuocSanXuatDetail").text(data.tenQuocGia)
        $("#noiKiemDinhDetail").text(data.noiKiemDinh)
        $("#hangSanXuatDetail").text(data.hangSanXuat)
        $("#quyTrinhSuDungDetail").text(data.quyTrinhSuDung)
        $("#namSanXuatDetail").text(data.namSanXuat)
        $("#soGiayChungNhanDetail").text(data.soGiayChungNhan)
        $("#namSuDungDetail").text(data.namSuDung)
        $("#ngayCapDetail").text(data.ngayCap)
        $("#soSanXuatDetail").text(data.soSanXuat)
        $("#ngayHetHanDetail").text(data.ngayHetHan)
        $("#kieuKyHieuDetail").text(data.kieuKyHieu)
        $("#phamViDoDetail").text(data.phamViDo)
        $("#capDoChinhXacDetail").text(data.capDoChinhXac)
        $("#trangThaiDetail").text(data.trangThai == '1' ? "Đang sử dụng" : "Hết sử dụng")
        if (data.tepKemTheo != null) {
            $("#tepDinhKemDetailModel").text(data.tepKemTheo.split("\\")[1].split("/")[1])
            $('#downloadFileDetail').html(`<a href="${APIURL}/${data.tepKemTheo}" download><span title="${data.tepKemTheo.split("\\")[1].split("/")[1]}" class="btn-downloadFileQTTH icon-download fluent-ui fluent-ui-filled"></span></a>`)
        }
        $('#modalDetail').modal('show')
    })

    //Modal add thiết bị
    $('#ThemMoi').on('click', function () {
        let htmlToChuc = `<option value=></option>`
        let htmlQuocGia = `<option value=></option>`
        let htmlPTDN2 = `<option value=></option>`

        resultToChuc.map((item) => {
            htmlToChuc += `<option value=${item.maToChuc}>${item.tenToChuc}</option>`
        })
        resultQuocGia.map((item) => {
            htmlQuocGia += `<option value=${item.maQuocGia}>${item.tenQuocGia}</option>`
        })
        resultPTDN2.map((item) => {
            htmlPTDN2 += `<option value=${item.maPhuongTien}>${item.tenPhuongTien}</option>`
        })
        $('#nuocSanXuatAdd').html(htmlQuocGia)
        $('#toChucAdd').html(htmlToChuc)
        $('#maNhom2Add').html(htmlPTDN2)

        $('#toChucAdd').on('change', function () {
            let maToChuc = this.value
            if (maToChuc != '') {
                let resultQuyTrinh = danhSachQuyTrinh(maToChuc)
                let htmlQuyTrinh = `<option value=></option>`
                resultQuyTrinh.map((item) => {
                    htmlQuyTrinh += `<option value=${item.linhVuc}>${item.soKyHieu}</option>`
                })
                $('#quyTrinhSuDungAdd').html(htmlQuyTrinh)
            }
        })

        $('#quyTrinhSuDungAdd').on('change', function () {
            let linhVuc = this.value
            resultLinhVuc.map((item) => {
                if (item.value == linhVuc) {
                    $('#linhVucAdd').val(item.text)
                }
                
            })
        })

        $('#modalAdd').modal('show')
    })

    //Clear modal add quy trình
    $("#modalAdd").on('hidden.bs.modal', function () {
        resetModalAdd()
    })

    //Add modal file thêm mới thiết bị
    $('#btn-AddFile').on('click', function () {
        sttFile = sttFile + 1;
        let html = `
            <li id=theli-${sttFile} class="uploadFileAdd">
                <div class="input-file">
                    <div class='gr-btn-addfile'>
                        <label for="inputFile${sttFile}" id='btnadd${sttFile}' class='btn btn-outline-blue'>Chọn tệp</label>
                        <input type="file" class="d-none dkmAdd choose-file" data-id="${sttFile}" id="inputFile${sttFile}">
                        <span class='nameTepDinhKem' id="add-name-file${sttFile}"></span>
                    </div>
                </div>
                <i class="remove-field-upload-btnHDTHAdd btn-unsetwidth btn-file-dinhkem icon-close-file icon icon-ic_fluent_dismiss_24_regular icon-dismiss" id="btnxoafile-${sttFile}"></i>
            </li>
        `;
        if (sttFile > 0) {
            $('#btn-AddFile').addClass('d-none')

        }
        $('#ul-file').append(html);
    })
    $(document).on('change', `input.choose-file`, function (e) {
        let idInputFile = $(this).data("id");
        $(`#add-name-file${idInputFile}`).text(e.target.files[0].name)
        $(`#btnadd${idInputFile}`).addClass('d-none')
    });

    //REMOVE modal file thêm mới thiết bị
    $(document).on('click', '.remove-field-upload-btnHDTHAdd', function () {
        var id = $(this).attr('id');
        let idsplit = id.split("-")[1];
        var element = document.getElementById(`theli-${idsplit}`);
        sttFile = sttFile - 1
        element.parentNode.removeChild(element);
        if (sttFile == 0) {
            $('#btn-AddFile').removeClass('d-none')
        }

    })

    //Handle add thiết bị
    $('#btn-save-Add').on('click', function () {
        let tenFile, tenFileCheck, checkFile = 1
        let formData = new FormData()
        let fileInputs = document.querySelectorAll('.dkmAdd');

        fileInputs.forEach(function (input, index) {
            if (input.files.length > 0) {
                tenFileCheck = input.files[0].name.split('.')
                tenFile = tenFileCheck[tenFileCheck.length - 1]
                if (!filesAccept.includes(tenFile)) {
                    showNotify("File đính kèm không hợp lệ, vui lòng chọn lại file", "danger")
                    checkFile = 0
                }
                else {
                    formData.append("file", input.files[0], input.files[0].name)
                }
            }
        });
        let maToChuc = $('#toChucAdd').val()
        let tenPhuongTien = $('#tenPhuongTienAdd').val()
        let maNhom2 = $('#maNhom2Add').val()
        let nuocSanXuat = $('#nuocSanXuatAdd').val()
        let hangSanXuat = $('#hangSanXuaAdd').val()
        let namSanXuatF = $('#thoiGianSanXuatAdd').val()
        let namSanXuat = formatDateSql(namSanXuatF)
        let namSuDungF = $('#thoiGianSuDungAdd').val()
        let namSuDung = formatDateSql(namSuDungF)
        let soSanXuat = $('#soSanXuatAdd').val()
        let kieuKyHieu = $('#kieuKyHieuAdd').val()
        let phamViDo = $('#phamViDoAdd').val()
        let capDoChinhXac = $('#capDoChinhXacAdd').val()
        let linhVuc = $('#quyTrinhSuDungAdd').val()
        let noiKiemDinh = $('#noiKiemDinhAdd').val()
        let soGiayChungNhan = $('#soGiayChungNhanAdd').val()
        let ngayCapF = $('#ngayCapAdd').val()
        let ngayCap = formatDateSql(ngayCapF)
        let ngayHetHanF = $('#ngayHetHanAdd').val()
        let ngayHetHan = formatDateSql(ngayHetHanF)
        let quyTrinhSuDung = $("#quyTrinhSuDungAdd option:selected").text();
        let trangThai = $('#hoatDongKieuAdd_True').is(':checked')
        let dataBuilder = {
            "maToChuc": maToChuc,
            "maNhom2": maNhom2,
            "tenPhuongTien": tenPhuongTien,
            "nuocSanXuat": nuocSanXuat ? nuocSanXuat : null,
            "hangSanXuat": hangSanXuat ? hangSanXuat : null,
            "namSanXuat": namSanXuat ? namSanXuat : null,
            "namSuDung": namSuDung ? namSuDung : null,
            "soSanXuat": soSanXuat ? soSanXuat : null,
            "kieuKyHieu": kieuKyHieu ? kieuKyHieu : null,
            "phamViDo": phamViDo ? phamViDo : null,
            "capDoChinhXac": capDoChinhXac ? capDoChinhXac : null,
            "quyTrinhSuDung": quyTrinhSuDung,
            "linhVuc": linhVuc,
            "noiKiemDinh": noiKiemDinh ? noiKiemDinh : null,
            "soGiayChungNhan": soGiayChungNhan ? soGiayChungNhan : null,
            "ngayCap": ngayCap ? ngayCap : null,
            "ngayHetHan": ngayHetHan ? ngayHetHan : null,
            "tepKemTheo": null,
            "trangThai": trangThai,
        }

        if (checkEmptyBlank(tenPhuongTien) || checkEmptyBlank(maToChuc) || checkEmptyBlank(maNhom2) || checkEmptyBlank(quyTrinhSuDung)) {
            showNotify("Các trường bắt buộc không được để trống", "danger")
        }
        else {
            if (!checkTagHtml(tenPhuongTien)) {
                showNotify("Tên thiết bị chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(hangSanXuat)) {
                showNotify("Hãng sản xuất chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(soSanXuat)) {
                showNotify("Số sản xuất chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(kieuKyHieu)) {
                showNotify("Kiểu ký hiệu chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(phamViDo)) {
                showNotify("Phạm vi đo chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(capDoChinhXac)) {
                showNotify("Cấp độ chính xác chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(noiKiemDinh)) {
                showNotify("Nơi kiểm định chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(soGiayChungNhan)) {
                showNotify("Số giấy chứng nhận chứa kí tự không hợp lệ", "danger")
            }
            else if (new Date(namSanXuat) > new Date(namSuDung)) {
                showNotify("Thời gian sử dụng không hợp lệ, vui lòng chọn lại","danger")
            }
            else if (new Date(ngayHetHan) < new Date(ngayCap)) {
                showNotify("Ngày hết hạn không hợp lệ, vui lòng chọn lại","danger")
            }
            else {
                if (checkFile == 1) {
                    formData.append("data", JSON.stringify(dataBuilder));
                    $.ajax({
                        type: 'post',
                        async: false,
                        url: `${APIURL}/api/TDC_PhuongTienKiemDinhApi/themmoi`,
                        processData: false,
                        contentType: false,
                        data: formData,
                        success: function (data) {
                            console.log(data)
                            $('#modalAdd').modal('hide'),
                                reloadfillter('#dataGrid')
                            $('#dataGrid').DataTable().ajax.reload().draw();
                            resetModalAdd()
                            showNotify('Thêm mới thiết bị thành công', 'success')
                        },
                        error: function (err) {
                            console.log(err)
                            showNotify("Thêm mới thiết bị không thành công", "danger")
                        }
                    })
                }  
            }
        }
    })

    //Modal update thiết bị
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGrid').DataTable().row(id).data();
        let resultQuyTrinh = danhSachQuyTrinh(data.maToChuc)
        $('#modalLabelUpdate').text(`Cập nhật thiết bị ${data.tenPhuongTien}`)
        let htmlToChuc = `<option value=></option>`
        let htmlQuocGia = `<option value=></option>`
        let htmlPTDN2 = `<option value=></option>`
        let htmlQuyTrinh = `<option value=></option>`

        resultToChuc.map((item) => {
            htmlToChuc += `<option value=${item.maToChuc}>${item.tenToChuc}</option>`
        })
        resultQuocGia.map((item) => {
            htmlQuocGia += `<option value=${item.maQuocGia}>${item.tenQuocGia}</option>`
        })
        resultPTDN2.map((item) => {
            htmlPTDN2 += `<option value=${item.maPhuongTien}>${item.tenPhuongTien}</option>`
        })
        resultQuyTrinh.map((item) => {
            htmlQuyTrinh += `<option value=${item.linhVuc}>${item.soKyHieu}</option>`
        })
        $('#nuocSanXuatUpdate').html(htmlQuocGia)
        $('#toChucUpdate').html(htmlToChuc)
        $('#maNhom2Update').html(htmlPTDN2)
        $('#quyTrinhSuDungUpdate').html(htmlQuyTrinh)

        $('#toChucUpdate').on('change', function () {
            let maToChuc = this.value
            if (maToChuc != '') {
                let resultQuyTrinh = danhSachQuyTrinh(maToChuc)
                let htmlQuyTrinh = `<option value=></option>`
                resultQuyTrinh.map((item) => {
                    htmlQuyTrinh += `<option value=${item.linhVuc}>${item.soKyHieu}</option>`
                })
                $('#quyTrinhSuDungUpdate').html(htmlQuyTrinh)
            }
        })

        $('#quyTrinhSuDungUpdate').on('change', function () {
            let linhVuc = this.value
            resultLinhVuc.map((item) => {
                if (item.value == linhVuc) {
                    $('#linhVucUpdate').val(item.text)
                }

            })
        })

        $('#maPhuongTienUpdate').val(data.maPhuongTien)
        $('#toChucUpdate').val(data.maToChuc)
        $('#tenPhuongTienUpdate').val(data.tenPhuongTien)
        $('#maNhom2Update').val(data.maNhom2)
        $('#nuocSanXuatUpdate').val(data.nuocSanXuat)
        $('#hangSanXuatUpdate').val(data.hangSanXuat)
        $('#thoiGianSanXuatUpdate').val(data.namSanXuat)
        $('#thoiGianSuDungUpdate').val(data.namSuDung)
        $('#soSanXuatUpdate').val(data.soSanXuat)
        $('#kieuKyHieuUpdate').val(data.kieuKyHieu)
        $('#phamViDoUpdate').val(data.phamViDo)
        $('#capDoChinhXacUpdate').val(data.capDoChinhXac)
        $('#quyTrinhSuDungUpdate').val(data.linhVuc)
        $('#linhVucUpdate').val(data.linhVucF)
        $('#noiKiemDinhUpdate').val(data.noiKiemDinh)
        $('#soGiayChungNhanUpdate').val(data.soGiayChungNhan)
        $('#ngayCapUpdate').val(data.ngayCap)
        $('#ngayHetHanUpdate').val(data.ngayHetHan)
        $('#tepKemTheoDetails').val(data.tepKemTheo)
        if (data.trangThai) {
            $('#hoatDongKieuAdd_TrueUpdate').prop('checked', true)
        }
        else {
            $('#dungHoatDongKieuAdd_FalseUpdate').prop('checked', true)
        }
        if (data.tepKemTheo == null) {
            $('#tepDinhKemDetail').addClass('d-none')
            $('#tepDinhKemUpdate').removeClass('d-none')

        }
        else {
            $('#tepDinhKemUpdate').addClass('d-none')
            $('#tepDinhKemDetail').removeClass('d-none')
            let html = ``
            html += `
                    <li id=theliedit-${data.maPhuongTien} class="fileUpload">
                        <span data-value='${data.tepKemTheo}' class='getFile'>${data.tepKemTheo.split("\\")[1].split("/")[1]}</span>
                        <div>
                        <button class="remove-file-edit icon-close-file" id="btnxoafileedit-${data.maPhuongTien}"></button>
                        </div>
                        
                    </li>
                 `;
            $('#list-file').html(html)
        }
        $('#modalUpdate').modal('show')
    })

    //Clear modal cập nhật quy trình
    $("#modalUpdate").on('hidden.bs.modal', function () {
        $('.uploadFileUpdate').remove()
        $('#btn-UpdateFile').removeClass('d-none')
        sttFileUpdate = 0
    })

    //Add modal file cập nhật quy trình
    $('#btn-UpdateFile').on('click', function () {
        sttFileUpdate = sttFileUpdate + 1;
        let html = `
            <li id=theli-${sttFileUpdate} class="uploadFileUpdate">
                <div class="input-file">
                    <div class='gr-btn-addfile'>
                        <label for="inputFile${sttFileUpdate}" id='btnadd${sttFileUpdate}' class='btn btn-outline-blue'>Chọn tệp</label>
                        <input type="file" class="d-none dkmUpdateFile choose-file" data-id="${sttFileUpdate}" id="inputFile${sttFileUpdate}">
                        <span class='nameTepDinhKem' id="add-name-file${sttFileUpdate}"></span>
                    </div>
                </div>
                <i class="remove-field-upload-btn btn-unsetwidth btn-file-dinhkem icon-close-file icon icon-ic_fluent_dismiss_24_regular icon-dismiss" id="btnxoafile-${sttFileUpdate}"></i>
            </li>
        `;
        if (sttFileUpdate > 0) {
            $('#btn-UpdateFile').addClass('d-none')

        }
        $('#ul-fileUpdate').html(html);
    })
    $(document).on('change', `input.choose-file`, function (e) {
        let idInputFile = $(this).data("id");
        $(`#add-name-file${idInputFile}`).text(e.target.files[0].name)
        $(`#btnadd${idInputFile}`).addClass('d-none')
    });

    //REMOVE modal file cập nhật quy trình
    $(document).on('click', '.remove-field-upload-btn', function () {
        var id = $(this).attr('id');
        let idsplit = id.split("-")[1];
        var element = document.getElementById(`theli-${idsplit}`);
        sttFileUpdate = sttFileUpdate - 1
        element.parentNode.removeChild(element);
        if (sttFileUpdate == 0) {
            $('#btn-UpdateFile').removeClass('d-none')
        }

    })

    //Update đường dẫn
    $(document).on('click', '.remove-file-edit', function () {
        var id = $(this).attr('id');
        var idsplit = id.split("-")[1];
        let tenFile = $(".getFile").text()
        $('#titleFileDel').text(tenFile)
        $('#idFileDelete').val(idsplit)
        $('#modalUpdateFile').modal('show')
    })

    //Handle delete file
    $('#deleteFile').on('click', function () {
        let maPhuongTien = $('#idFileDelete').val()
        $.ajax({
            type: 'put',
            async: false,
            url: `${APIURL}/api/TDC_PhuongTienKiemDinhApi/capnhatduongdan?MaPhuongTien=${maPhuongTien}`,
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                console.log(data);
                $('#dataGrid').DataTable().ajax.reload().draw();
                $('#modalUpdateFile').modal('hide')
                $('#tepDinhKemUpdate').removeClass('d-none')
                $('#tepDinhKemDetail').addClass('d-none')
                showNotify("Xóa file thành công", "success")
            },
            error: function (err) {
                console.log(err)
            }
        })
    })

    //Handle update thiết bị
    $("#btn-save-Update").on('click', function () {
        let tenFile, tenFileCheck, checkFile = 1
        let formData = new FormData()
        let fileInputs = document.querySelectorAll('.dkmUpdateFile');
        fileInputs.forEach(function (input, index) {
            if (input.files.length > 0) {
                tenFileCheck = input.files[0].name.split('.')
                tenFile = tenFileCheck[tenFileCheck.length - 1]
                if (!filesAccept.includes(tenFile)) {
                    showNotify("File đính kèm không hợp lệ, vui lòng chọn lại file", "danger")
                    checkFile = 0
                }
                else {
                    formData.append("file", input.files[0], input.files[0].name)
                }
            }
        });
        let maPhuongTien = $('#maPhuongTienUpdate').val()
        let maToChuc = $('#toChucUpdate').val()
        let tenPhuongTien = $('#tenPhuongTienUpdate').val()
        let maNhom2 = $('#maNhom2Update').val()
        let nuocSanXuat = $('#nuocSanXuatUpdate').val()
        let hangSanXuat = $('#hangSanXuatUpdate').val()
        let namSanXuatF = $('#thoiGianSanXuatUpdate').val()
        let namSanXuat = formatDateSql(namSanXuatF)
        let namSuDungF = $('#thoiGianSuDungUpdate').val()
        let namSuDung = formatDateSql(namSuDungF)
        let soSanXuat = $('#soSanXuatUpdate').val()
        let kieuKyHieu = $('#kieuKyHieuUpdate').val()
        let phamViDo = $('#phamViDoUpdate').val()
        let capDoChinhXac = $('#capDoChinhXacUpdate').val()
        let linhVuc = $('#quyTrinhSuDungUpdate').val()
        let noiKiemDinh = $('#noiKiemDinhUpdate').val()
        let soGiayChungNhan = $('#soGiayChungNhanUpdate').val()
        let ngayCapF = $('#ngayCapUpdate').val()
        let ngayCap = formatDateSql(ngayCapF)
        let ngayHetHanF = $('#ngayHetHanUpdate').val()
        let ngayHetHan = formatDateSql(ngayHetHanF)
        let quyTrinhSuDung = $("#quyTrinhSuDungUpdate option:selected").text();
        let trangThai = $('#hoatDongKieuAdd_TrueUpdate').is(':checked')
        let tepKemTheo = $('#tepKemTheoDetails').val()
        let dataBuilder = {
            "maPhuongTien": maPhuongTien,
            "maToChuc": maToChuc,
            "maNhom2": maNhom2,
            "tenPhuongTien": tenPhuongTien,
            "nuocSanXuat": nuocSanXuat ? nuocSanXuat : null,
            "hangSanXuat": hangSanXuat ? hangSanXuat : null,
            "namSanXuat": namSanXuat ? namSanXuat : null,
            "namSuDung": namSuDung ? namSuDung : null,
            "soSanXuat": soSanXuat ? soSanXuat : null,
            "kieuKyHieu": kieuKyHieu ? kieuKyHieu : null,
            "phamViDo": phamViDo ? phamViDo : null,
            "capDoChinhXac": capDoChinhXac ? capDoChinhXac : null,
            "quyTrinhSuDung": quyTrinhSuDung,
            "linhVuc": linhVuc,
            "noiKiemDinh": noiKiemDinh ? noiKiemDinh : null,
            "soGiayChungNhan": soGiayChungNhan ? soGiayChungNhan : null,
            "ngayCap": ngayCap ? ngayCap : null,
            "ngayHetHan": ngayHetHan ? ngayHetHan : null,
            "tepKemTheo": tepKemTheo ? tepKemTheo : null,
            "trangThai": trangThai,
        }

        if (checkEmptyBlank(tenPhuongTien) || checkEmptyBlank(maToChuc) || checkEmptyBlank(maNhom2) || checkEmptyBlank(quyTrinhSuDung)) {
            showNotify("Các trường bắt buộc không được để trống", "danger")
        }
        else {
            if (!checkTagHtml(tenPhuongTien)) {
                showNotify("Tên thiết bị chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(hangSanXuat)) {
                showNotify("Hãng sản xuất chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(soSanXuat)) {
                showNotify("Số sản xuất chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(kieuKyHieu)) {
                showNotify("Kiểu ký hiệu chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(phamViDo)) {
                showNotify("Phạm vi đo chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(capDoChinhXac)) {
                showNotify("Cấp độ chính xác chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(noiKiemDinh)) {
                showNotify("Nơi kiểm định chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(soGiayChungNhan)) {
                showNotify("Số giấy chứng nhận chứa kí tự không hợp lệ", "danger")
            }
            else if (new Date(namSanXuat) > new Date(namSuDung)) {
                showNotify("Thời gian sử dụng không hợp lệ, vui lòng chọn lại", "danger")
            }
            else if (new Date(ngayHetHan) < new Date(ngayCap)) {
                showNotify("Ngày hết hạn không hợp lệ, vui lòng chọn lại", "danger")
            }
            else {
                if (checkFile == 1) {
                    formData.append("data", JSON.stringify(dataBuilder));
                    $.ajax({
                        type: 'put',
                        async: false,
                        url: `${APIURL}/api/TDC_PhuongTienKiemDinhApi/capnhat`,
                        processData: false,
                        contentType: false,
                        data: formData,
                        success: function (data) {
                            console.log(data)
                            $('#modalUpdate').modal('hide'),
                            reloadfillter('#dataGrid')
                            $('#dataGrid').DataTable().ajax.reload().draw();
                            showNotify('Cập nhật thiết bị thành công', 'success')
                        },
                        error: function (err) {
                            console.log(err)
                            showNotify("Cập nhật thiết bị không thành công", "danger")
                        }
                    })
                }
            }
        }
    })

    //Modal delete thiết bị
    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGrid').DataTable().row(id).data();
        $('#idDelete').val(data.maPhuongTien)
        $('#titleDel').text(data.tenPhuongTien)
        $('#modalDelete').modal('show')
    })

    //Handle delete quy trình
    $('#btnDelete').on('click', function () {
        let maPhuongTien = $('#idDelete').val()
        $.ajax({
            type: 'delete',
            async: false,
            url: `${APIURL}/api/TDC_PhuongTienKiemDinhApi/xoa?MaPhuongTien=${maPhuongTien}`,
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                if (data.isSuccess) {
                    $('#modalDelete').modal('hide'),
                   reloadfillter('#dataGrid')
                    $('#dataGrid').DataTable().ajax.reload().draw();
                    showNotify("Xóa thiết bị thành công", "success")
                }
                else {
                    showNotify("Xóa thiết bị không thành công", "danger")
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    })

    //Function clear modal
    let resetModalAdd = () => {
        $('#modalAdd input').val("")
        $('#modalAdd textarea').val("")
        $('#modalAdd select').val(null).trigger('change')
        $('.uploadFileAdd').remove()
        $('#btn-AddFile').removeClass('d-none')
        sttFile = 0
    }


})
const danhSachLinhVuc = () => {
    let result
    $.ajax({
        type: 'get',
        async: false,
        url: `${APIURL}/api/EnumApi/danhsachlinhvuc`,
        dataType: 'json',
        success: function (data) {
            if (data.isSuccess) {
                result = data.value
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
    return result
}

const danhSachToChuc = () => {
    let result
    $.ajax({
        type: 'get',
        async: false,
        url: `${APIURL}/api/TDC_ToChucKDHCTNApi/danhsach`,
        dataType: 'json',
        success: function (data) {
            if (data.isSuccess) {
                result = data.value
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
    return result
}

const danhSachNuoc = () => {
    let result
    $.ajax({
        type: 'get',
        async: false,
        url: `${APIURL}/api/QuocGiaApi/DanhSachQuocGia`,
        dataType: 'json',
        success: function (data) {
            result = data       
        },
        error: function (err) {
            console.log(err)
        }
    })
    return result
}

const danhSachQuyTrinh = (maToChuc) => {
    let result
    $.ajax({
        type: 'get',
        async: false,
        url: `${APIURL}/api/TDC_QuyTrinhApDungApi/danhsachtheotochuc?MaToChuc=${maToChuc}`,
        dataType: 'json',
        success: function (data) {
            if (data.isSuccess) {
                result = data.value
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
    return result
}

const danhSachPhuongTienNhom2 = () => {
    let result
    $.ajax({
        type: 'get',
        async: false,
        url: `${APIURL}/api/PhuongTienDoNhom2Api/danhsach`,
        dataType: 'json',
        success: function (data) {
            if (data.isSuccess) {
                result = data.value
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
    return result
}



