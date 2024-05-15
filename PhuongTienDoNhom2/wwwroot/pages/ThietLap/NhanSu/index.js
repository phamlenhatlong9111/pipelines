// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {

    $('#dataTable-NhanSu').DataTable({
        "dom": 'Bfrti<"page-record-custom"lp>',
        "buttons": [
            {

                extend: 'excelHtml5',
                title: 'DANH SÁCH NHÂN SỰ ',
                text: 'Xuất file Excel',
                className: 'btn btn-outline-success d-none',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
                }
            }

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
            "sSearchPlaceholder": "Tên đăng nhập, người dùng, chức vụ...",
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
            url: `${APIURL}/api/NhanVienApi/DanhSachNhanVien`,
            type: "GET",
            dataSrc: function (data) {
                if (data.isSuccess) {
                    let result = data.value;
                    result.map((item, index) => {
                        item.stt = index + 1;
                        $.ajax({
                            url: APIURL + `/api/NhanVienApi/KiemTraNhanVien?UserName=${item.username}`,
                            "method": "GET",
                            "async" : false, // "false" để đảm bảo chạy xong ajax này mới chạy ajax khác
                            "timeout": 0,
                            "headers": {
                                "accept": "*/*"
                            },
                            success: function (data) {
                                if (data.isSuccess && data.value.length > 0) {
                                    item.chucNang = true
                                } else {
                                    item.chucNang = false;
                                }
                            },
                            error: function (err) {
                                console.log(err)
                            }
                        })
                    })
                    return result;
                }
                return []

            }
        },
        "columnDefs": [
            {
                targets: 4,
                render: function (data, type, row, meta) {
                    if (data === true) {
                        return `<i class="icon icon-ic_fluent_checkmark_24_regular icon-check"></i>`
                    }
                    else {
                        return `<span class="icon-dismiss">-</span>`
                    }

                }
            },
            {
                targets: 5,
                render: function (data, type, row, meta) {
                    
                    return `<div class="edit-delete-detail">
                                ${row.chucNang == true ? `<span title="Phân quyền" class="btn-edit-role edit-role-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>` : ''}
                                ${row.dongBo == false ? `<span title="Chỉnh sửa" class="btn-edit edit-icon fluent-ui fluent-ui-filled" id="n-${meta.row}"></span>` : ''}
                                <span title="Xóa" class="btn-delete delete-icon fluent-ui fluent-ui-filled" id=n-"${meta.row}"></span>
                            </div>`;

                }
            },

        ],
        "columns": [
            
            { data: "stt", "width": "40px", "class": "stt-text center-align" },
            { data: "username", "width": "auto", "class": "left-align dnCustom" },
            { data: "fullName", "width": "300px", "class": "left-align group-icon-action" },
            {
                data: null, "width": "250px", "class": "left-align", "render": function (data, type, row) {
                    // Logic để xác định giá trị cho cột
                    return row.orgTitle != null ? row.orgTitle : row.depTitle != null ? row.depTitle : null;
                } },
            { data: "enabled", "width": "120px", "class": "center-align" },
            { data: "", "width": "120px", "class": "center-align group-icon-action" },
        ]


    });
    $('#dataTable-NhanSu').DataTable().on('order.dt search.dt', function () {
        let i = 1;

        $('#ddataTable-NhanSu').DataTable().cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
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
    // DTO chức năng nhân viên 
    function organizeMenuTree(menus) {
       
        const menuDictionary = {};

        menus.forEach(item => {
            item.SubMenus = []; // Khởi tạo danh sách submenu

            // Thêm vào từ điển
            menuDictionary[item.duongDan] = item;
            // Tìm menu cha
            const parentPath = findParentPath(Object.keys(menuDictionary), item.duongDan);
            if (parentPath) {
          
                // Nếu có menu cha, thêm vào submenu của menu cha
                menuDictionary[parentPath].SubMenus.push(item);
            }
        });

        // Lấy ra danh sách menu gốc (menu không có menu cha)
        const menuTree = Object.values(menuDictionary).filter(menu => !findParentPath(Object.keys(menuDictionary), menu.duongDan));

        return menuTree;
    }

    function findParentPath(paths, currentPath) {
        for (const path of paths) {
            // Kiểm tra xem path và currentPath có tồn tại và khác undefined
            if (path && currentPath && currentPath.startsWith(path + "/") && currentPath !== path) {
                return path;
            }
        }

        return null;
    }
    
    //Modal-role
    $(document).on('click', '.btn-edit-role', function () {
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataTable-NhanSu').DataTable().row(id).data();
        $('#iddangnhaprole').val(data.id)
        $('#tendangnhaprole').val(data.username)
        $('#tennguoidungrole').val(data.fullName)
        console.log(data);
        //danh sách vai trò 
        $.ajax({
            url: APIURL + "/api/VaiTroApi/DanhSachVaiTro",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "*/*"
            },
            success: function (data) {
                if (data.isSuccess) {
                    var html = '';

                    data.value.map(function (item) {

                        html += ` <div class="ck-trangThai1">
                                <input type="checkbox" value="${item.id}" id="${item.id}">
                                <label for="${item.id}">${item.name}</label>
                            </div>`

                    })
                    $(".trangThaiHopDong1").html(html);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        $.ajax({
            url: APIURL + "/api/VaiTroApi/DanhSachChucNang",
            method: "GET",
            timeout: 0,
            headers: {
                "accept": "*/*"
            },
           
            success: function (data) {
                if (data.isSuccess) {
                    var organizedMenus = organizeMenuTree(data.value);
                    //console.log(organizedMenus);
                    var html = '';
                    
                    organizedMenus.map(function (item) {
                   
                        if (item.tenNhom == "Thiết lập" && $('#tendangnhaprole').val() != "admin") {
                            console.log(123123)
                            return;
                        } else {
                            console.log(item)
                            html += `<div class="ck-trangThai">
                            <input type="checkbox" value="${item.id}" id="${item.id}">
                            <label for="ck_${item.tenNhom}">${item.tenNhom}</label></div>`;

                            if (item.SubMenus.length > 0) {
                                item.SubMenus.map(function (subItem) {
                                    html += `<div class="ck-trangThai ck-item">
                                    <input type="checkbox" value="${subItem.id}" id="${subItem.id}">
                                    <label for="ck_${subItem.tenNhom}">${subItem.tenNhom}</label>
                                </div>`;
                                });
                            }
                        }
                        

                        //html += `</div>`;
                    });

                    $(".trangThaiHopDong2").html(html);
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
        $.ajax({
            url: APIURL + `/api/VaiTroApi/ChucNangByID?UserName=${data.username}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "*/*" 
            },
            success: function (data) {
                console.log(data);
                if (data.isSuccess) {
                    console.log(data.value)
                    $(".ck-trangThai input").each(function () {
                        var menuId = parseInt($(this).val());
                        // Kiểm tra xem roleId có tồn tại trong danh sách vai trò của người dùng hay không
                        if (data.value.some(menu => menu.menuId == menuId)) {
                            $(this).prop("checked", true);
                        } else {
                            $(this).prop("checked", false);
                        }
                    });
                    //console.log($(".ck-trangThai1 input").val());
                    //$(".ck-trangThai1 input").prop("checked", true);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        $.ajax({
            url: APIURL + `/api/VaiTroApi/VaiTroByID?UserName=${data.username}`,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "*/*"
            },
            success: function (data) {
                if (data.isSuccess) {
                    $(".ck-trangThai1 input").each(function () {
                        var roleId = parseInt($(this).val());
                        // Kiểm tra xem roleId có tồn tại trong danh sách vai trò của người dùng hay không
                        if (data.value.some(role => role.roleId == roleId)) {
                            $(this).prop("checked", true);
                        } else {
                            $(this).prop("checked", false);
                        }
                    });
                    //console.log($(".ck-trangThai1 input").val());
                    //$(".ck-trangThai1 input").prop("checked", true);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        
        
        $('#modalEditRoleNhanSu').modal('show');
    })
    //Đồng bộ nhân sự
    $(document).on('click', '#btn-save-QlNhanSu', function () {
        let ten = $('#tendangnhaprole').val()
        var selectedRoles = [];
        var selectedMenus = [];

        $(".ck-trangThai1 input:checked").each(function () {
            var roleId = parseInt($(this).val());
            selectedRoles.push(roleId);
        });

        // Gán chuỗi các roleId được chọn
        var selectedRolesString = selectedRoles.join(',');
        $(".ck-trangThai input:checked").each(function () {
            var menuId = parseInt($(this).val());
            selectedMenus.push(menuId);
        });

        // Gán chuỗi các roleId được chọn
        var selectedMenusString = selectedMenus.join(',');
        $.ajax({
            url: APIURL + `/api/VaiTroApi/PhanQuyenVaiTro?UserName=${ten}&RoleIds=${selectedRolesString}`,
            "method": "POST",
            "timeout": 0,
            "async": false,
            "headers": {
                "accept": "text/plain"
            },
            
            success: function (data) {
                if (data.isSuccess) {
                    showNotify("Cập nhật quyền vai trò thành công", "success");
                    //console.log($(".ck-trangThai1 input").val());
                    //$(".ck-trangThai1 input").prop("checked", true);
                }
                else {
                    showNotify("Cập nhật quyền vai trò thành công", "success");
                }
 
                $('#modalEditRoleNhanSu').modal('hide');
            },
            error: function (err) {
                console.log(err);
                showNotify("Cập nhật quyền vai trò không thành công", "danger");
            }
        })
        $.ajax({
            url: APIURL + `/api/VaiTroApi/PhanQuyenChucNang?UserName=${ten}&MenuIds=${selectedMenusString}`,
            "method": "POST",
            "timeout": 0,
            "async": false,
            "headers": {
                "accept": "text/plain"
            },
            success: function (data) {
                if (data.isSuccess) {
                    showNotify("Cập nhật quyền chức năng thành công", "success");
                    //console.log($(".ck-trangThai1 input").val());
                    //$(".ck-trangThai1 input").prop("checked", true);
                } else {
                    showNotify("Cập nhật quyền chức năng thành công", "success");
                }
               
                $('#modalEditRoleNhanSu').modal('hide');
            },
            error: function (err) {
                console.log(err);
                showNotify("Cập nhật quyền chức năng không thành công", "danger");
            }
        })

    })
    //Modal-add
    $(document).on('click', '#ThemNhanSu', function () {
        $('#modalAddNhanSu').modal('show');
        $.ajax({
            url: APIURL + "/api/HT_ToChucQuanLyApiControllercs/DanhSachToChucHeThong",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "*/*"
            },
            success: function (data) {
                if (data.isSuccess && data.value.length>0) {
                    var html = '';
                    html += `<option value="">Chọn</option>`
                    data.value.map(function (item) {
                        if (item.trangThai == true) {
                            console.log( item);
                            html += `<option value="${item.maToChuc}">${item.tenToChuc}</option>`
                        }
                    })
                    $("#toChucNhanVienAdd").html(html);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        $('#toChucNhanVienAdd').select2({
            placeholder: "Chọn tổ chức",
            theme: 'bootstrap4',
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            language: "vi",
            allowClear: true,
            dropdownParent: $('#modalAddNhanSu'),
        });

    })
    //danh sách nhân viên 
    var listNhanVien = [];
    $.ajax({
        url: APIURL + "/api/NhanVienApi/DanhSachNhanVien",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "accept": "*/*"
        },
        success: function (data) {
            if (data.isSuccess) {
                listNhanVien = data.value;
            }
        },
        error: function (err) {
            console.log(err)
        }
    })
    //Đồng bộ nhân sự
    //$(document).on('click', '#DongBoNhanSu', function () {
    //    $("#modalDongBo").modal('show')
    //    //$.ajax({
    //    //    url: APIURL + "/api/DongBoNhanVienApi/DongBoNhanVienApi",
    //    //    "method": "GET",
    //    //    "timeout": 0,
    //    //    "headers": {
    //    //        "accept": "*/*"
    //    //    },
    //    //    success: function (data) {
    //    //        if (data.message == "Đồng bộ thành công") {
    //    //            showNotify("Đồng bộ nhân sự thành công", "success"),
    //    //                $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
    //    //        }
    //    //    },
    //    //    error: function (err) {
    //    //        console.log(err)
    //    //        showNotify("Đồng bộ nhân sự không thành công", "danger");
    //    //    }
    //    //})
    //})
    //$(document).on('click', '#btn-Dongbo_NhanSu', function () {
    //    console.log(123);
    //    $.ajax({
    //        url: APIURL + "/api/DongBoNhanVienApi/DongBoNhanVienApi",
    //        "method": "GET",
    //        "timeout": 0,
    //        "headers": {
    //            "accept": "*/*"
    //        },
    //        success: function (data) {
    //            console.log(data);
    //            if (data.message == "Đồng bộ thành công") {
    //                $('#modalDongBo').modal('hide');
    //                $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
    //                showNotify("Đông bộ nhân viên thành công", "success");
    //            }
    //        },
    //        error: function (err) {
    //            console.log(err)
    //            $('#modalDongBo').modal('hide');
    //            showNotify("Đồng bộ không thành công", "danger");
    //        }
    //    })
    //})
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    $(document).on('click', '#BtnThemMoiNhanVien',async function () {
        let tenDangNhap = $("#tenDangNhapAdd").val();
        let tenNguoiDung = $("#tenNguoiDungAdd").val();
        let matKhau = $("#matKhau").val();
        let nhapLaiMatKhau = $("#nhapLaiMatKhau").val();
        let IDphongBan = $("#toChucNhanVienAdd").val();
        let tenPhongBan = $("#toChucNhanVienAdd option:selected").text();
        let chucVu = $("#chucVuNhanVienAdd").val();
        let suDung = $("#suDungAdd").is(':checked');
        let dataBuilder = {
            "fullName": tenNguoiDung,
            "username": tenDangNhap,
            "matKhau": matKhau,
            "departmentId": IDphongBan,
            "departmentName": tenPhongBan == "Chọn" ? null : tenPhongBan,
            "depTitle": chucVu != "" ? chucVu: null,
            "enabled": suDung

        }
        const found = listNhanVien.find((item) => item.username == tenDangNhap);
        
        if (checkEmptyBlank(tenDangNhap) ) {
            showNotify("Tên đăng nhập không được để trống", "danger")
            return
        }
        if (found != null) {
            showNotify("Tên đăng nhập đã tồn tại", "danger")
                return
        }
        if (checkEmptyBlank(tenNguoiDung)) {
            showNotify("Tên người dùng không được để trống", "danger")
            return
        }
        if (checkEmptyBlank(matKhau)) {
            showNotify("Mật khẩu không được để trống", "danger")
            return
        }
        if (checkEmptyBlank(nhapLaiMatKhau)) {
            showNotify("Nhập lại mật khẩu không được để trống", "danger")
            return
        }
        if (!matKhau.match(decimal)) {
            showNotify("Mật khẩu từ 8 đến 15 ký tự, trong đó có ít nhất một chữ thường, một chữ hoa, một chữ số và một ký tự đặc biệt", "danger")
            return
        }
        if (matKhau !== nhapLaiMatKhau) {
            showNotify("Mật khẩu không khớp", "danger")
            return
        }
        else {
            var formData = new FormData();
            formData.append("data", JSON.stringify(dataBuilder));
            const fileInputs = document.querySelectorAll(".dkm"); //Lấy ra tất cả file đã chọn
            fileInputs.forEach(function (input) {
                if (input.files.length > 0) {
                    formData.append("file", input.files[0], input.files[0].name);
                }
            });
            $.ajax({
                type: 'post',
                async: false,
                url: `${APIURL}/api/NhanVienApi/ThemMoiNhanVien`,
                "timeout": 0,
                "headers": {
                    "accept": "text/plain"
                },
                "processData": false,
                "mimeType": "multipart/form-data",
                "contentType": false,
                "data": formData,
                success: function (data) {
                    showNotify("Thêm mới nhân viên thành công", "success"),
                        $('#modalAddNhanSu').modal("hide");
                    //reloadfillter('#dataTable-hopDong')
                    resetModalAdd()
                    $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
                },
                error: function (err) {
                      showNotify("Thêm mới nhân viên không thành công", "danger");
                    console.log(err)
                  
                }
            })
        }
        //console.log(dataBuilder)
        
    })
    //reset modalADD
    function resetModalAdd() {
            $("#tenDangNhapAdd").val("");
            $("#tenNguoiDungAdd").val("");
            $("#matKhau").val("");
            $("#nhapLaiMatKhau").val("");
            $("#phongBanNhanVienAdd").trigger('change').val("");
            $("#chucVuNhanVienAdd").val("");
            $("#suDungAdd").prop('checked', false)
            $('.uploadFile').remove();
            $('#btn-AddFile').removeClass('d-none')
        }
    //Clear modal
    $("#modalAddNhanSu").on('hidden.bs.modal', function () {
        resetModalAdd();
    })
    var sttFile = 0;
    //ADD MODAL FILE
    $('#btn-AddFile').on('click', function () {
        sttFile = sttFile + 1;
        let html = `
            <li id=theli-${sttFile} class="uploadFile">
                <div class="input-file">
                    <div class='gr-btn-addfile'>
                        <label for="inputFile${sttFile}" id='btnadd${sttFile}' class='btn btn-outline-blue'>Chọn tệp</label>
                        <input type="file" class="d-none dkm choose-file" data-id="${sttFile}" id="inputFile${sttFile}">
                        <span class='nameTepDinhKem' id="add-name-file${sttFile}"></span>
                    </div>
                </div>
                <input type="text" class="form-control file-description" placeholder="Mô tả tệp đính kèm" id="file-description-${sttFile}">
                <i class="remove-field-upload-btn btn-unsetwidth btn-file-dinhkem icon-close-file icon icon-ic_fluent_dismiss_24_regular icon-dismiss" id="btnxoafile-${sttFile}"></i>
            </li>
        `;
        if (sttFile > 0) {
            $('#btn-AddFile').text('Chọn tệp khác')
            $('.btn-outline-blue').addClass('set-padding')
        }
        $('#ul-file').append(html);
    })
    $(document).on('change', `input.choose-file`, function (e) {
        let idInputFile = $(this).data("id");
        $(`#add-name-file${idInputFile}`).text(e.target.files[0].name)
        $(`#btnadd${idInputFile}`).addClass('d-none')
        console.log(idInputFile, e.target.files[0].name)
    });
    // XUAT EXEL
    $('#btnExportExcel').on('click', function () {
        $('#dataTable-NhanSu_wrapper button.buttons-excel.buttons-html5').click();
    })
    //REMOVE MODAL FILE 
    $(document).on('click', '.remove-field-upload-btn', function () {
        var id = $(this).attr('id');
        let idsplit = id.split("-")[1];
        var element = document.getElementById(`theli-${idsplit}`);
        element.parentNode.removeChild(element);
        //$('#btn-AddFile').removeClass('d-none')
        sttFile = sttFile - 1
        if (sttFile == 0) {
            $('#btn-AddFile').text('Chọn tệp')
        }
    })
    var checkAnhDaiDien = null
    var anhDaiDienNoFile, file, fileName
    //Modal-update
    $(document).on('click', '.btn-edit', function () {
        $.ajax({
            url: APIURL + "/api/HT_ToChucQuanLyApiControllercs/DanhSachToChucHeThong",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "accept": "*/*"
            },
            async: false,
            success: function (data) {
                if (data.isSuccess) {
                  
                    var html = '';
                    html += `<option value="">Chọn</option>`
                    data.value.map(function (item) {
                        if (item.trangThai == true) {
                            html += `<option value="${item.maToChuc}">${item.tenToChuc}</option>`
                        }
                    })
                    $("#toChucNhanVienUpdate").html(html);
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataTable-NhanSu').DataTable().row(id).data();
            
            var html = ''
            
            checkAnhDaiDien = data.avatar
            if (checkAnhDaiDien != null) {
                anhDaiDienNoFile = data.avatar
                var anhDaiDienSplit = data.avatar.split('\\');
                var anhDaiDien = anhDaiDienSplit[anhDaiDienSplit.length - 1].split("/")
                $('#btn-UpdateFile ,.dinhDang-file').addClass('d-none')
                html += `
                                <li class="fileUpload1">
                                    <button class="file-edit btn btn-unsetwidth btn-outline-blue btn-outline-primary icon-close-file">
                                        Chọn tệp
                                    </button>
                                        <span class='nameFile'>${anhDaiDien[anhDaiDien.length - 1]}</span>
                                    <input type="file" id="fileInputUpdate" class='dkm' style=" opacity: 0; position: absolute;z-index: -1;">
                                </li>
                `;
                $('#ul-Updatefile').html(html);
            }
            else {
                let sttFile = 0;
                //ADD MODAL FILE
                $('#btn-UpdateFile, .dinhDang-file').removeClass('d-none')
                $('#ul-Updatefile').html("");
                $('#btn-UpdateFile').on('click', function () {
                    sttFile = sttFile + 1;
                    let html = `
                            <li id=theli1-${sttFile} class="uploadFile1">
                                <div class="input-file">
                                    <div class='gr-btn-addfile'>
                                        <label for="inputFile${sttFile}" id='btnadd${sttFile}' class='btn btn-outline-blue'>Chọn tệp</label>
                                        <span id="add-name-file${sttFile}"></span>
                                        <input type="file" class="d-none dkmUpdate choose-file" data-id="${sttFile}" id="inputFile${sttFile}">
                                    </div>
                                    <i class="remove-field-upload-btn1 btn-unsetwidth btn-file-dinhkem icon-close-file icon icon-ic_fluent_dismiss_24_regular icon-dismiss" id="btnxoafile-${sttFile}"></i>
                                </div>
                            </li>
                     `;
                    if (sttFile > 0) {
                        $('#btn-UpdateFile').text('Chọn tệp khác')
                        $('.btn-outline-blue').addClass('set-padding')
                    }
                    $('#ul-Updatefile').html(html);
                })

                //REMOVE MODAL FILE 
                $(document).on('click', '.remove-field-upload-btn1', function () {
                    var id = $(this).attr('id');
                    let idsplit = id.split("-")[1];
                    var element = document.getElementById(`theli1-${idsplit}`);
                    element.parentNode.removeChild(element);
                    //$('#btn-UpdateFile').removeClass('d-none')
                    sttFile = sttFile - 1
                    if (sttFile == 0) {
                        $('#btn-UpdateFile').text('Chọn tệp')
                    }
                })
        }
            
            $('#modalUpdateNhanSu').modal('show');
            $("#idTenDangNhapUpdate").val(data.id)
            $("#tenDangNhapUpdate").val(data.username)
            $("#tenNguoiDungUpdate").val(data.fullName)
            $("#matKhauUpdate").val(data.matKhau)
        $("#nhapLaiMatKhauUpdate").val(data.matKhau)
        console.log(data.departmentId);
            $("#toChucNhanVienUpdate").trigger('change').val(data.departmentId)
            $("#chucVuNhanVienUpdate").val(data.depTitle)
            //$("#tenPhongBanUpdate").val(data.departmentName)
            $("#suDungNhanVienUpdate").prop("checked", data.enabled)
            
       $('#toChucNhanVienUpdate').select2({
                placeholder: "Chọn",
                theme: 'bootstrap4',
                width: '100%',
                language: "vi",
                allowClear: true,
                dropdownParent: $('#modalUpdateNhanSu'),
            });

    })
    // Sự kiện click trực tiếp cho các button 'edit'
    $(document).on('click', '.file-edit', function () {
        const parentElement = $(this).closest('.fileUpload1');
        // Tạo một input type file mới
        const newInputFile = $('<input type="file" class="dkm" style="opacity: 0; position: absolute; z-index: -1;">');

        // Gắn kết sự kiện change cho input type file mới
        newInputFile.on('change', function () {
            const selectedFiles = this.files;
            if (selectedFiles.length > 0) {
                file = selectedFiles[0]
                fileName = selectedFiles[0].name;
                parentElement.find('.nameFile').text(fileName);
            }
            // Reset giá trị của input file để kích hoạt lại sự kiện change khi click lần tiếp theo
            $(this).val('');
        });

        // Thêm input type file mới vào DOM và kích hoạt sự kiện click cho nó
        parentElement.append(newInputFile);
        newInputFile.click();
    });
    function capNhatKhongFile(data) {
        $.ajax({
            type: 'put',
            async: false,
            url: APIURL + "/api/NhanVienApi/CapNhatNhanVienKhongFile",
            data: data,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#modalUpdateNhanSu').modal('hide');
                showNotify('Cập nhật nhân viên thành công', 'success')
                $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
            },
            error: function (error) {
                console.log(error)
                showNotify('Cập nhật nhân viên thành công!', 'danger')
            }
        })
    }

    function capNhatCoFile(formData) {
        $.ajax({
            type: 'put',
            async: false,
            url: APIURL + "/api/NhanVienApi/CapNhatNhanVienCoFile",
            processData: false,
            data: formData,
            contentType: false,
            mimeType: "multipart/form-data",
            success: function (data) {
                $('#modalUpdateNhanSu').modal('hide');
                showNotify('Cập nhật nhân viên thành công', 'success')
                $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
            },
            error: function (error) {
                console.log(error)
                showNotify('Cập nhật nhân viên không thành công!', 'danger')
            }
        })
    }
    //câp nhật nhân viên 
    $(document).on('click', '#BtnCapNhatNhanVien', function () {
        let idTenDangNhap = $("#idTenDangNhapUpdate").val();
        let tenDangNhap = $("#tenDangNhapUpdate").val();
        let tenNguoiDung = $("#tenNguoiDungUpdate").val();
        let matKhau = $("#matKhauUpdate").val();
        let nhapLaiMatKhau = $("#nhapLaiMatKhauUpdate").val();
        let IDphongBan = $("#toChucNhanVienUpdate").val();
        let tenPhongBan = $("#toChucNhanVienUpdate option:selected").text();
        let chucVu = $("#chucVuNhanVienUpdate").val();
        let suDung = $("#suDungNhanVienUpdate").is(':checked');
        let dataBuilder = {
            "id": idTenDangNhap,
            "fullName": tenNguoiDung,
            "username": tenDangNhap,
            "matKhau": matKhau,
            "departmentId": IDphongBan,
            "departmentName": tenPhongBan == "Chọn" ? null : tenPhongBan,
            "depTitle": chucVu != "" ? chucVu : null,
            "enabled": suDung

        }
        //console.log(dataBuilder)
        var formData = new FormData();
        // Trường hợp không có ảnh đại diện
        if (checkAnhDaiDien == null) {
            if (checkEmptyBlank(matKhau)) {
                showNotify("Mật khẩu không được để trống", "danger")
                return
            }
            if (checkEmptyBlank(nhapLaiMatKhau)) {
                showNotify("Nhập lại mật khẩu không được để trống", "danger")
                return
            }
            if (!matKhau.match(decimal)) {
                showNotify("Mật khẩu từ 8 đến 15 ký tự, trong đó có ít nhất một chữ thường, một chữ hoa, một chữ số và một ký tự đặc biệt", "danger")
                return
            }
            if (matKhau !== nhapLaiMatKhau) {
                showNotify("Mật khẩu không khớp", "danger")
                return
            }
            else {
                formData.append('data', JSON.stringify(dataBuilder))
                const fileInputs = document.querySelectorAll(".dkmUpdate"); //Lấy ra tất cả file đã chọn
                if (fileInputs.length > 0) {
                    fileInputs.forEach(function (input) {
                        // Trường hợp người dùng chọn file
                        if (input.files.length > 0) {
                            formData.append('file', input.files[0], input.files[0].name);
                            
                            capNhatCoFile(formData)
                        }
                        // Trường hợp người dùng có mở popup nhưng không chọn file
                        else {
                            capNhatKhongFile(JSON.stringify(dataBuilder))
                        }
                    });
                }
                else {
                    capNhatKhongFile(JSON.stringify(dataBuilder))
                }
            }

        }
        //Trường hợp đã có ảnh đại diện
        else {
            var dataBuilderNoFile = {
                "id": idTenDangNhap,
                "fullName": tenNguoiDung,
                "username": tenDangNhap,
                "matKhau": matKhau,
                "departmentId": IDphongBan,
                "departmentName": tenPhongBan == "Chọn" ? null : tenPhongBan,
                "depTitle": chucVu != "" ? chucVu : null,
                "enabled": suDung,
                "avatar": anhDaiDienNoFile
            }
            if (checkEmptyBlank(matKhau)) {
                showNotify("Mật khẩu không được để trống", "danger")
                return
            }
            if (checkEmptyBlank(nhapLaiMatKhau)) {
                showNotify("Nhập lại mật khẩu không được để trống", "danger")
                return
            }
            if (!matKhau.match(decimal)) {
                showNotify("Mật khẩu từ 8 đến 15 ký tự, trong đó có ít nhất một chữ thường, một chữ hoa, một chữ số và một ký tự đặc biệt", "danger")
                return
            }
            if (matKhau !== nhapLaiMatKhau) {
                showNotify("Mật khẩu không khớp", "danger")
                return
            }

            else {
                //Trường hợp đã có ảnh đại diện nhưng không chỉnh sửa ảnh
                if (file == undefined || fileName == undefined) {
                    capNhatKhongFile(JSON.stringify(dataBuilderNoFile))
                }
                //Trường hợp có ảnh đại diện và chỉnh sửa ảnh đại diện
                else {

                    
                    formData.append("file", file, fileName);
                    formData.append("data", JSON.stringify(dataBuilder));
                    capNhatCoFile(formData)
                }
            }
        }   
    })
    
    //Modal-delete
    $(document).on('click', '.btn-delete', function () {
        $('#modalDeleteNhanSu').modal('show');
        var id = $(this).attr("ID").match(/\d+/)[0];
        var data = $('#dataTable-NhanSu').DataTable().row(id).data();
        console.log(data);
        $("#idNhanSu").val(data.id)
        $("#titleNhanSu").text(`"${data.fullName}"`)
    })
    $('#delete_NhanSu').on('click', function () {
        let idNhanSu = $('#idNhanSu').val();
        let tenNhanSu = $('#titleNhanSu').val();
        $.ajax({
            type: 'delete',
            url: `${APIURL}/api/NhanVienApi/XoaNhanVien?ID=${idNhanSu}`,
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#modalDeleteNhanSu').modal('hide');
                $('#dataTable-NhanSu').DataTable().ajax.reload().draw();
                showNotify(`Xóa ${tenNhanSu} thành công`, 'success')
            },
            error: function (err) {
                showNotify(`Xóa ${tenNhanSu} không thành công!, vui lòng liên hệ quản trị viên`, 'danger')
            }

        })
    })
})