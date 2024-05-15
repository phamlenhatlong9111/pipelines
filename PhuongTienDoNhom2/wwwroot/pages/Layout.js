//Check null input
function checkEmptyBlank(str) {
    if (str == null || str.trim().length === 0) {
        return true
    }
    return false
}

//File accept
const filesAccept = ['docx', 'doc', 'pdf', 'xlsx', 'xls']


//Check tag html
function checkTagHtml(input) {
    var re = /<[^>]*>/g;
    return !re.test(input);
}
function getRootLink() {
    const url = window.location;
    const APIURL = url.protocol + "//" + url.hostname + ":" + url.port;

    return APIURL;
}
function formatDate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [day, month, year].join('/');
}

function getDataWithApi(method, uri, data) {
    const APIURL = getRootLink();

    if (data) {
        return $.ajax({
            type: method,
            contentType: 'application/json; charset=utf-8',
            url: APIURL + uri,
            data: data
        });
    }

    return $.ajax({
        type: method,
        contentType: 'application/json; charset=utf-8',
        url: APIURL + uri,
    });
};

function getApiAjaxAuthorizeToken(url, type, token) {
    //let urlBase = getUrlCurrent()



    return $.ajax({
        type: type,
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Token', token);
        },
    });
}
function getApiAjaxAuthorize(url, type, token) {
    let urlBase = getRootLink()

    
        return $.ajax({
            type: type,
            url: urlBase + url,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization',
                    "Bearer " + token);
            },
            
        });
    

    return $.ajax({
        type: type,
        url: urlBase + url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
        },
    });
}

function getApiAjax(url, type, data) {
    let urlBase = getRootLink()

    if (data) {
        return $.ajax({
            type: type,
            url: urlBase + url,
            contentType: "application/json; charset=utf-8",
            data: data,
        });
    }

    return $.ajax({
        type: type,
        url: urlBase + url,
    });
}

function isCheckStringEmpty(str) {
    if (str == null || str.trim().length === 0) {
        return true
    }
    return false
}
function isCheckLengthNumber(number, min, max) {
    if (number >= min && number <= max) {
        return true
    }
    return false
}

//format dd/mm/yy
function formatDay(date) {
    if (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [day, month, year].join('/')
    }
    else {
        return ``
    }
}
//Format date update
function formatDateUpdate(date = new Date()) {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', {
        month: '2-digit',
    });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
}
//format yy-mm-dd
function formatDateSql(date) {
    if (date) {
        var dateParts = date.split("/");
        var dateObject = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
        return dateObject;
    }
    else {
        return null
    }
}
function getDate() {
    const date = new Date();

    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();
    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;
    return currentDate;
}
//check validate
function checkEmail(str) {
    return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(str)
}

function checkURL(str) {
    return /^https?:\/\//.test(str)
}
function phonenumber(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno))
        {
      return true;
        }
      else
        {
        //alert("message");
        return false;
        }
}
function checkLength(e, value) {
    if (e >= value) {
        return false
    }
    return true
}
function checkLengthModal(e, value) {
    if (e.value.length == value) {
        ThongBao('warning', `Độ dài vượt quá ${value} ký tự cho phép!`);
    }
}
function checkHtmlInjection(e) {
    var hasHtmlTags = false;
    $(e).each(function () {
        var userInput = $(this).val();
        if (/<[ˆ>]*>/g.test(userInput)) {
            hasHtmlTags = true;
            $(this).focus();
            return false;
        }
    });
    if (hasHtmlTags) {
        return true;
    } else {
        return false;
    }
}
// Handle checkbox
function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('radio-LapLai')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
function onlyOneTrangThai(checkbox) {
    var checkboxes = document.getElementsByName('radio-TrangThai')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}
// FUNCTION CHECK CHUỖI RỖNG HOẶC NULL
function checkEmptyBlankV2(e) {
    var Empty = false;
    $(e).each(function () {
        var userInput = $(this).val();
        if (userInput == null || String(userInput).trim().length === 0) {
            Empty = true;
            AddFalseInput(this, "Trường bắt buộc không được để trống!")
            $(this).focus();
        } else if ($(this).closest(".MuiInput").find(".MuiInput_Warning").length > 0) {
            Empty = true;
            $(this).focus();
            return false;
        } else {
            RemoveFalseInput(this)
        }
    });
    if (Empty) {
        return true;
    } else {
        return false;
    }
}
function checkFalseInput(e) {
    var Error_input = false;
    $(e).each(function () {
        if ($(this).closest(".MuiInput").find(".MuiInput_Warning").length > 0) {
            Error_input = true;
            $(this).focus();
            return false;
        }
    });
    if (Error_input) {
        return true;
    } else {
        return false;
    }
}
function checkEmptyBlank(str) {
    if (str == null || String(str).trim().length === 0) {
        return true
    }
    return false
}
function isDecimal(decimalPart, fullPart, input) {
    var regex = new RegExp($`/^(\d{1,${fullPart - decimalPart}}(\.\d{1,${decimalPart}})?|\d{${fullPart - decimalPart + 1}}(\.\d{1,${decimalPart}})?)/`);
    if (!regex.test(input)) {
        alert('Chữ số thập phân không hợp lệ')
        return e.value = ""
    }
}
function checkRangeNumber(e, begin, end) {
    if (Number(e.value) < begin || Number(e.value) > end) {
        alert(2, `Độ lớn phải lớn hơn hoặc bằng ${begin} hoặc nhỏ hơn hoặc bằng ${end}!`);
        return e.value = ""
    }
}

function AddFalseInput(e, string) {
    $(e).addClass("False_Input");
    $(e).closest(".MuiInput").find(".MuiLabel").addClass("False_Input");
    if ($(e).closest(".MuiInput").find(".MuiInput_Warning").length === 0) {
        $(e).closest(".MuiInput").append(`<span class="MuiInput_Warning">${string}</span>`);
    } else if ($(e).closest(".MuiInput").find(".MuiInput_Warning").text() != '') {
        $(e).closest(".MuiInput").find(".MuiInput_Warning").text(string);
    }
}

function RemoveFalseInput(e) {
    $(e).removeClass("False_Input");
    $(e).closest(".MuiInput").find(".MuiLabel").removeClass("False_Input");
    $(e).closest(".MuiInput").find(".MuiInput_Warning").remove();
}

function CheckLengthEach(selector, value) {
    if (value === "onlyInt") {
        $(selector).attr("maxlength", 10);
    } else if (value === "IntvarChar") {
        $(selector).attr("maxlength", 20);
    } else {
        $(selector).attr("maxlength", value);
    }
    if (value === "date") {
        $(selector).on("change", function () {
            RemoveFalseInput(this);
        })
    }
    regexInt = /^\d+$/;
    regex8_3 = /^\d{1,5}(\.\d{0,3})?$/;
    regex8_4 = /^\d{1,4}(\.\d{0,4})?$/;
    regex10_3 = /^\d{1,7}(\.\d{0,3})?$/;
    regex6_2 = /^\d{1,4}(\.\d{0,3})?$/;
    regex5_2 = /^\d{1,3}(\.\d{0,2})?$/;
    regex4_2 = /^\d{1,2}(\.\d{0,2})?$/;
    regexCheck = '';
    $(selector).on("input propertychange", function () {
        var LengthValue = $(this).val().length;
        var userInput = $(this).val();
        var hasHtmlTags = /<[^>]*>/g.test(userInput);
        if (hasHtmlTags) {
            AddFalseInput(this, "Nội dung nhập chứa chức năng bị cấm!!")
        } else if (value === null) {
            if (userInput != '') {
                RemoveFalseInput(this);
            }
        } else if (value == "reg4-2") {
            regexCheck = regex4_2
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "12.34"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "reg5-2") {
            regexCheck = regex5_2
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "123.45"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "reg6-2") {
            regexCheck = regex6_2
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "1234.56"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "reg8-3") {
            regexCheck = regex8_3
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "12345.678"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "reg8-4") {
            regexCheck = regex8_4
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "1234.5678"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "reg10-3") {
            regexCheck = regex10_3
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Vui lòng nhập đúng định dạng, ví dụ: "1234567.890"')
            } else {
                RemoveFalseInput(this);
            }
        } else if (value == "onlyInt" || value == "IntvarChar") {
            regexCheck = regexInt
            if (!regexCheck.test(userInput)) {
                AddFalseInput(this, 'Chỉ được nhập số!!')
            } else {
                RemoveFalseInput(this);
            }
        }
        else if (!checkLength(LengthValue, value)) {
            AddFalseInput(this, "Đã đạt giới hạn ký tự!!");
        } else {
            RemoveFalseInput(this);
        }
    });
}

