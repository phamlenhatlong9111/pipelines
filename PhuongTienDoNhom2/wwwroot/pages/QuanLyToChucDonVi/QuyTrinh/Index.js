var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;

$(document).ready(function () {
    let sttFile = 0, sttFileUpdate = 0
    let resultLinhVuc = danhSachLinhVuc()
    let resultToChuc = danhSachToChuc()

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
            url: `${APIURL}/api/TDC_QuyTrinhApDungApi/danhsach`,
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    let result = data.value
                    result.map((item, index) => {
                        item.stt = index + 1
                        item.namBanHanh = formatDate(new Date(item.namBanHanh))
                        for (let i = 0; i < resultLinhVuc.length; i++) {
                            result.map((item) => {
                                if (resultLinhVuc[i].value == item.linhVuc) {
                                    item.linhVucF = resultLinhVuc[i].text
                                }
                            })

                        }
                        
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
                    return `<span id=n-${meta.row} class="detailQuyTrinh">${data}</span>`
                }
            },
            {
                targets: 6,
                render: function (data, type, row, meta) {
                    if (data != null) {
                        let title = data.split('\\')[1].split('/')[1]
                        return `<div class="edit-delete-detail">
                                  <a href="${APIURL}/${data}" download><span title="${title}" class="btn-downloadFileQTTH icon-download fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span></a>
                                </div>`;
                    }
                    
                    else {
                        return ``
                    }

                }
            },
            {
                targets: 8,
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
            { data: "tenQuyTrinh", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "soKyHieu", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "namBanHanh", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "toChucBanHanh", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "linhVucF", "width": "auto", "class": "left-align dnCustom", searchable: true },
            { data: "tepKemTheo", "width": "auto", "class": "left-align dnCustom", searchable: true },
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
    $('#linhVucAdd').select2({
        placeholder: "Chọn lĩnh vực",
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
    $('#linhVucUpdate').select2({
        placeholder: "Chọn lĩnh vực",
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
        $("#toChucDetail").text(data.tenToChuc)
        $("#tenQuyTrinhDetail").text(data.tenQuyTrinh)
        $("#soKyHieuDetail").text(data.soKyHieu)
        $("#thoiGianBanHanhDetail").text(data.namBanHanh)
        $("#toChucBanHanhDetail").text(data.toChucBanHanh)
        $("#linhVucDetail").text(data.linhVucF)
        $("#moTaDetail").text(data.moTa)
        $("#suDungDetail").text(data.trangThai == '1' ? "Sử dụng" : "Hết sử dụng")
        $('#modalDetail').modal('show')
    })

    //Modal add quy trình
    $('#ThemMoi').on('click', function () {
        let htmlLinhVuc = `<option value=></option>`
        let htmlToChuc = `<option value=></option>`
        resultLinhVuc.map((item) => {
            htmlLinhVuc+=`<option value=${item.value}>${item.text}</option>`
        })

        resultToChuc.map((item) => {
            htmlToChuc += `<option value=${item.maToChuc}>${item.tenToChuc}</option>`
        })
        $('#linhVucAdd').html(htmlLinhVuc)
        $('#toChucAdd').html(htmlToChuc)
        
       

        $('#modalAdd').modal('show')
    })

    //Clear modal add quy trình
    $("#modalAdd").on('hidden.bs.modal', function () {
        resetModalAdd()
    })

    //Add modal file thêm mới quy trình
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

    //REMOVE modal file thêm mới quy trình
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

    //Handle add quy trình
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
                    formData.append("file", input.files[0], input.files[0].name )
                }
            }
        });
        let maToChuc = $('#toChucAdd').val()
        let tenQuyTrinh = $('#tenQuyTrinhAdd').val()
        let soKyHieu = $('#soKyHieuAdd').val()
        let namBanHanhF = $('#namBanHanh').val()
        let namBanHanh = formatDateSql(namBanHanhF)
        let toChucBanHanh = $('#toChucBanHanhAdd').val()
        let linhVuc = $('#linhVucAdd').val()
        let trangThai = $('#hoatDongKieuAdd_True').is(':checked')
        let moTa = $('#moTaAdd').val()
        let dataBuilder = {
            "maToChuc": maToChuc,
            "tenQuyTrinh": tenQuyTrinh,
            "soKyHieu": soKyHieu,
            "namBanHanh": namBanHanh ? namBanHanh : null,
            "toChucBanHanh": toChucBanHanh,
            "linhVuc": linhVuc,
            "trangThai": trangThai,
            "tepKemTheo": null,
            "moTa": moTa
        }
        let dataBuilderCheck = {
            "maToChuc": maToChuc,
            "soKyHieu": soKyHieu
        }
        let resultCheck = kiemTraSoKyHieu(dataBuilderCheck)
        if (checkEmptyBlank(tenQuyTrinh) || checkEmptyBlank(soKyHieu) || checkEmptyBlank(maToChuc) || checkEmptyBlank(linhVuc)) {
            showNotify("Các trường bắt buộc không được để trống", "danger")
        }
        else {
            if (!checkTagHtml(tenQuyTrinh)) {
                showNotify("Tên quy trình chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(soKyHieu)) {
                showNotify("Số ký hiệu chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(toChucBanHanh)) {
                showNotify("Tổ chức ban hành chứa kí tự không hợp lệ", "danger")
            }
            else if (!checkTagHtml(moTa)) {
                showNotify("Mô tả chứa kí tự không hợp lệ", "danger")
            }
            else {
                if (resultCheck == 0) {
                    if (checkFile == 1) {
                        formData.append("data", JSON.stringify(dataBuilder));
                        $.ajax({
                            type: 'post',
                            async: false,
                            url: `${APIURL}/api/TDC_QuyTrinhApDungApi/themmoi`,
                            processData: false,
                            contentType: false,
                            data: formData,
                            success: function (data) {
                                console.log(data)
                                $('#modalAdd').modal('hide'),
                                reloadfillter('#dataGrid')
                                $('#dataGrid').DataTable().ajax.reload().draw();
                                resetModalAdd()
                                showNotify('Thêm mới quy trình thành công', 'success')
                            },
                            error: function (err) {
                                console.log(err)
                                showNotify("Thêm mới quy trình không thành công", "danger")
                            }
                        })
                    }
                }
                else {
                    showNotify("Số ký hiệu của quy trình đã tồn tại", "danger")
                }
            }
        }
    })

    //Modal update quy trình
    $(document).on('click', '.btn-edit', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGrid').DataTable().row(id).data();
        $('#modalLabelUpdate').text(`Cập nhật quy trình KĐHCTN ${data.tenQuyTrinh}`)
        let htmlLinhVuc = `<option value=></option>`
        let htmlToChuc = `<option value=></option>`
        resultLinhVuc.map((item) => {
            htmlLinhVuc += `<option value=${item.value}>${item.text}</option>`
        })

        resultToChuc.map((item) => {
            htmlToChuc += `<option value=${item.maToChuc}>${item.tenToChuc}</option>`
        })
        $('#linhVucUpdate').html(htmlLinhVuc)
        $('#toChucUpdate').html(htmlToChuc)
        $('#maQuyTrinhUpdate').val(data.maQuyTrinh)
        $('#toChucUpdate').val(data.maToChuc)
        $('#tenQuyTrinhUpdate').val(data.tenQuyTrinh)
        $('#soKyHieuUpdate').val(data.soKyHieu)
        $('#soKyHieuDetails').val(data.soKyHieu)
        $('#namBanHanhUpdate').val(data.namBanHanh)
        $('#toChucBanHanhUpdate').val(data.toChucBanHanh)
        $('#tepKemTheoDetails').val(data.tepKemTheo)
        $('#linhVucUpdate').val(data.linhVuc)
        if (data.trangThai) {
            $('#hoatDongKieuAdd_TrueUpdate').prop('checked', true)
        }
        else {
            $('#dungHoatDongKieuAdd_FalseUpdate').prop('checked', true)
        }
        $('#moTaAdd').val(data.moTa)
        if (data.tepKemTheo == null) {
            $('#tepDinhKemDetail').addClass('d-none')
            $('#tepDinhKemUpdate').removeClass('d-none')
            
        }
        else {
            $('#tepDinhKemUpdate').addClass('d-none')
            $('#tepDinhKemDetail').removeClass('d-none')
            let html = ``
            html += `
                    <li id=theliedit-${data.maQuyTrinh} class="fileUpload">
                        <span data-value='${data.tepKemTheo}' class='getFile'>${data.tepKemTheo.split("\\")[1].split("/")[1]}</span>
                        <div>
                        <button class="remove-file-edit icon-close-file" id="btnxoafileedit-${data.maQuyTrinh}"></button>
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
        let maQuyTrinh = $('#idFileDelete').val()
        $.ajax({
            type: 'put',
            async: false,
            url: `${APIURL}/api/TDC_QuyTrinhApDungApi/capnhatduongdan?MaQuyTrinh=${maQuyTrinh}`,
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

    //Handle update quy trình
    $("#btn-save-Update").on('click', function () {
        let tenFile, tenFileCheck, checkFile = 1
        let formData = new FormData()
        let fileInputs = document.querySelectorAll('.dkmUpdateFile');
        fileInputs.forEach(function (input, index) {
            if (input.files.length > 0) {
                tenFileCheck = input.files[0].name.split('.')
                tenFile = tenFileCheck[tenFileCheck.length - 1]
                if (!filesAccept.includes(tenFile)) {
                    showNotify("File đính kèm không hợp lệ, vui lòng chọn lại file","danger")
                    checkFile = 0
                }
                else {
                    formData.append("file", input.files[0], input.files[0].name)
                }
            }
        });
        let maQuyTrinh = $('#maQuyTrinhUpdate').val()
        let soKyHieuDetails = $('#soKyHieuDetails').val()
        let maToChuc = $('#toChucUpdate').val()
        let tenQuyTrinh = $('#tenQuyTrinhUpdate').val()
        let soKyHieu = $('#soKyHieuUpdate').val()
        let namBanHanhF = $('#namBanHanhUpdate').val()
        let namBanHanh = formatDateSql(namBanHanhF)
        let toChucBanHanh = $('#toChucBanHanhUpdate').val()
        let linhVuc = $('#linhVucUpdate').val()
        let trangThai = $('#hoatDongKieuAdd_TrueUpdate').is(':checked')
        let moTa = $('#moTaUpdate').val()
        let tepKemTheo = $('#tepKemTheoDetails').val()
        let dataBuilder = {
            "maQuyTrinh": maQuyTrinh,
            "maToChuc": maToChuc,
            "tenQuyTrinh": tenQuyTrinh,
            "soKyHieu": soKyHieu,
            "namBanHanh": namBanHanh ? namBanHanh : null,
            "toChucBanHanh": toChucBanHanh,
            "linhVuc": linhVuc,
            "trangThai": trangThai,
            "tepKemTheo": tepKemTheo ? tepKemTheo : null,
            "moTa": moTa
        }
        let dataBuilderCheck = {
            "maToChuc": maToChuc,
            "soKyHieu": soKyHieu
        }
        if (soKyHieu != soKyHieuDetails) {
            let resultCheck = kiemTraSoKyHieu(dataBuilderCheck)
            if (checkEmptyBlank(tenQuyTrinh) || checkEmptyBlank(soKyHieu) || checkEmptyBlank(maToChuc) || checkEmptyBlank(linhVuc)) {
                showNotify("Các trường bắt buộc không được để trống", "danger")
            }
            else {
                if (!checkTagHtml(tenQuyTrinh)) {
                    showNotify("Tên quy trình chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(soKyHieu)) {
                    showNotify("Số ký hiệu chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(toChucBanHanh)) {
                    showNotify("Tổ chức ban hành chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(moTa)) {
                    showNotify("Mô tả chứa kí tự không hợp lệ", "danger")
                }
                else {
                    if (resultCheck == 0) {
                        if (checkFile == 1) {
                            formData.append("data", JSON.stringify(dataBuilder));
                            $.ajax({
                                type: 'put',
                                async: false,
                                url: `${APIURL}/api/TDC_QuyTrinhApDungApi/capnhat`,
                                processData: false,
                                contentType: false,
                                data: formData,
                                success: function (data) {
                                    console.log(data)
                                    $('#modalUpdate').modal('hide'),
                                    reloadfillter('#dataGrid')
                                    $('#dataGrid').DataTable().ajax.reload().draw();
                                    showNotify('Cập nhật quy trình thành công', 'success')
                                },
                                error: function (err) {
                                    console.log(err)
                                    showNotify("Cập nhật quy trình không thành công", "danger")
                                }
                            })
                        }
                    }
                    else {
                        showNotify("Số ký hiệu của quy trình đã tồn tại", "danger")
                    }
                }
            }
        }
        else {
            if (checkEmptyBlank(tenQuyTrinh) || checkEmptyBlank(soKyHieu) || checkEmptyBlank(maToChuc) || checkEmptyBlank(linhVuc)) {
                showNotify("Các trường bắt buộc không được để trống", "danger")
            }
            else {
                if (!checkTagHtml(tenQuyTrinh)) {
                    showNotify("Tên quy trình chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(soKyHieu)) {
                    showNotify("Số ký hiệu chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(toChucBanHanh)) {
                    showNotify("Tổ chức ban hành chứa kí tự không hợp lệ", "danger")
                }
                else if (!checkTagHtml(moTa)) {
                    showNotify("Mô tả chứa kí tự không hợp lệ", "danger")
                }
                else {
                    if (checkFile == 1) {
                        formData.append("data", JSON.stringify(dataBuilder));
                        $.ajax({
                            type: 'put',
                            async: false,
                            url: `${APIURL}/api/TDC_QuyTrinhApDungApi/capnhat`,
                            processData: false,
                            contentType: false,
                            data: formData,
                            success: function (data) {
                                $('#modalUpdate').modal('hide'),
                                reloadfillter('#dataGrid')
                                $('#dataGrid').DataTable().ajax.reload().draw();
                                showNotify('Cập nhật quy trình thành công', 'success')
                            },
                            error: function (err) {
                                console.log(err)
                                showNotify("Cập nhật quy trình không thành công", "danger")
                            }
                        })
                    }
                }
            }
        }
    })

    //Modal delete quy trình
    $(document).on('click', '.btn-delete', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataGrid').DataTable().row(id).data();
        $('#idDelete').val(data.maQuyTrinh)
        $('#titleDel').text(data.tenQuyTrinh)
        $('#modalDelete').modal('show')
    })

    //Handle delete quy trình
    $('#btnDelete').on('click', function () {
        let maQuyTrinh = $('#idDelete').val()
        $.ajax({
            type: 'delete',
            async: false,
            url: `${APIURL}/api/TDC_QuyTrinhApDungApi/xoa?MaQuyTrinh=${maQuyTrinh}`,
            contentType: 'application/json;charset=utf-8',
            success: function (data) {
                if (data.isSuccess) {
                    $('#modalDelete').modal('hide'),
                        reloadfillter('#dataGrid')
                    $('#dataGrid').DataTable().ajax.reload().draw();
                    showNotify("Xóa quy trình thành công", "success")
                }
                else {
                    showNotify("Xóa quy trình không thành công","danger")
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

const kiemTraSoKyHieu = (dataBuilder) => {
    let result
    $.ajax({
        type: 'post',
        async: false,
        url: `${APIURL}/api/TDC_QuyTrinhApDungApi/kiemtra`,
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(dataBuilder),
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

