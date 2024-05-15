
// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
const runOwlCarouselbanner = () => {
    $(".owl-carousel-detailThamXanh").owlCarousel({
        items: 1,
        loop: false,
        //center: true,
        margin: 24,
        autoplay: 5000,
        dots: false,
        nav: false,
        navigation: true,
        responsiveClass: true,
    });
}
var mapPingId;
$.ajax({
    type: "get",
    url: `${APIURL}/api/CayXanhApi/truyvanchitiet/${IdCayXanh}`,
    dataType: "json",
    success: function (data) {
        if (data.isSuccess) {
            var result = data.value;
            console.log(result)
            var soHieuCheck = result.soHieu != null ? result.soHieu : ''
            let tenCayDetails = `${result.tenCay}`
            let maCayDetail = `#${soHieuCheck}`
            mapPingId = result.mappingID;

            $('#chungLoaiCayDetails').text(result.tenLoaiCay)
            $("#title-tree").text(tenCayDetails)
            $("#title-code-tree").text(maCayDetail)
            $("#tenKhoaHocDetails").text(result.tenKhoaHoc);
            $("#loaiCayDetails").text(result.tenLoaiCay);
            $("#soHieuQuanLyDetails").text(result.soHieuTrenTuyen);
            $("#tenKhuDiTichDetails").text(result.phuong);
            $('#quyHoachKhuVucTrongDetails').text(result.tenQuyHoachKhuVucTrong)
            $('#tuyenDuongDetails').text(result.tenTuyen);
            $('#chieuCaoDetails').text(result.chieuCao)
            $('#duongKinhThanDetails').text(result.duongKinhThan)
            $('#nhomCayXanhDetail').text(result.tenNhom)
            result.baoTon == "0" ? $("#caybaoton").text("Không là cây bảo tồn") : $("#caybaoton").text("Là cây bảo tồn")
            result.daChatHa == "0" ? $("#chatha").text("Chưa chặt hạ") : $("#chatha").text("Đã chặt hạ")
            $("#chuViThan").text(result.chuViThan)
            $("#thamxanh").text(result.tenThamXanh)
            $("#namtrong").text(result.namTrong);
            $('#hienTrangDetails').text(result.moTa)

            $("#namtrong").text(result.namTrong);
            $('#hienTrangDetails').text(result.moTa)
            if (result.tepKemTheo.length > 0) {
                var html = ''
                result.tepKemTheo.map((item) => {
                    html += `<div class="item"><img src=${APIURL}/${item.noiLuuTru != null
                        ? item.noiLuuTru
                        : `/upload/bg-cay-alt.png`
                        } alt="Cây cấm trồng"/></div>`
                })
                $('#anh').html(html)
                
                runOwlCarouselbanner()
                resize1()
            } else {
                $('#anh').html(`<div class="item"><img src=/upload/bg-cay-alt.png
                         alt="Cây cấm trồng"/></div>`)
                         
                runOwlCarouselbanner()
                resize1()
            }
        }

        // Xử lý dữ liệu và gọi hàm done để cập nhật giao diện phân trang
    },
    error: function (err) {
        console.log(err);
    },
});
var qr = `${APIURL}/Home/ChuyenTrangCayXanhTrangChu?IdCayXanh=${IdCayXanh}`
//console.log(qr);
$.ajax({
    type: 'post',
    url: APIURL + `/api/GenerateQRApi?qRCode=${qr}`,
    "method": "POST",
    "timeout": 0,
    "headers": {
        "accept": "*/*"
    },
    success: function (data) {
        //console.log(data)
        //showNotify("Xuất QR thành công!", "success")
        $("#idQR").html(`<img src=${data} alt="Cây cấm trồng"/>`)
    },
    error: function (err) {
        showNotify('Xuất QR không thành công!', 'danger')
    }
})

require(["esri/config", "esri/Map", "esri/views/MapView", "esri/Graphic", "esri/layers/FeatureLayer", "esri/widgets/BasemapToggle", "esri/widgets/Search", "esri/rest/locator", "esri/widgets/Locate", "esri/layers/support/FeatureEffect", "esri/widgets/Measurement"],
    (esriConfig, Map, MapView, Graphic, FeatureLayer, BasemapToggle, Search, locator, Locate, FeatureEffect, Measurement) => {
        esriConfig.apiKey =
            "AAPK6201e582c47049328317d0486b1db07fPDIxl9irYLz6FgwVp10GjuL4K84vCgcpQpCnzpWGwRhaEVxieRmOGrXXdUCWFdpD";
        (async () => {
            const url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
            const myTreesFeatureLayer = new FeatureLayer({
                url: 'https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/0',
                id: "0",

            });

            const map = new Map({
                basemap: "arcgis-topographic", // Basemap layer service
                layers: [myTreesFeatureLayer],
            });

            const view = new MapView({
                map: map,
                center: [107.58513469042099, 16.462504990071924], // Longitude, latitude
                container: "viewDiv",
                zoom: 15
            });
            let activeView = view;
            const measurement = new Measurement();

            // Set-up event handlers for buttons and click events

            const distanceButton = document.getElementById("distance");
            const areaButton = document.getElementById("area");
            const clearButton = document.getElementById("clear");

            distanceButton.addEventListener("click", () => {
                distanceMeasurement();
            });
            areaButton.addEventListener("click", () => {
                areaMeasurement();
            });
            clearButton.addEventListener("click", () => {
                clearMeasurements();
            });

            // Call the loadView() function for the initial view
            loadView();

            // The loadView() function to define the view for the widgets and div
            function loadView() {
                activeView.set({
                    container: "viewDiv"
                });
                // Add the appropriate measurement UI to the bottom-right when activated
                activeView.ui.add(measurement, "bottom-right");
                // Add the legend to the bottom left
                //activeView.ui.add(legend, "bottom-left");
                // Set the views for the widgets
                measurement.view = activeView;
                //legend.view = activeView;
            }
            // Call the appropriate DistanceMeasurement2D or DirectLineMeasurement3D
            function distanceMeasurement() {
                const type = activeView.type;
                measurement.activeTool =
                    type.toUpperCase() === "2D" ? "distance" : "direct-line";
                distanceButton.classList.add("active");
                areaButton.classList.remove("active");
            }

            // Call the appropriate AreaMeasurement2D or AreaMeasurement3D
            function areaMeasurement() {
                measurement.activeTool = "area";
                distanceButton.classList.remove("active");
                areaButton.classList.add("active");
            }

            // Clears all measurements
            function clearMeasurements() {
                distanceButton.classList.remove("active");
                areaButton.classList.remove("active");
                measurement.clear();
            }

            const toogleBaseMap = new BasemapToggle({
                view: view,
                nextBasemap: 'satellite'
            })

            view.ui.add(toogleBaseMap, "bottom-left");

            const search = new Search({
                view: view,
                // resultGraphicEnabled: false,
                popupEnabled: false,
            });

            view.ui.add(search, "top-right");
            search.on("search-complete", function (event) {
                // Kiểm tra xem có kết quả tìm kiếm không
                if (event.numResults > 0) {

                    const result = event.results[0]; // Lấy kết quả đầu tiên (có thể có nhiều kết quả)
                    // Lấy tọa độ từ kết quả tìm kiếm
                    latValue = result.results[0].feature.geometry.latitude;
                    longValue = result.results[0].feature.geometry.longitude;

                    // Sử dụng lat và long theo nhu cầu của bạn
                    /*alert("Latitude: " + latValue + ", Longitude: " + longValue);*/
                }
            });
            let locateWidget = new Locate({
                view: view,   // Attaches the Locate button to the view
                graphic: new Graphic({
                    symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                    // graphic placed at the location of the user when found
                })
            });

            view.ui.add(locateWidget, "top-right");
            locateWidget.on("locate", function (event) {
                const coordinates = event.position.coords;
                latValue = coordinates.latitude;
                longValue = coordinates.longitude;

                // Sử dụng lat và long ở đây, ví dụ, hiển thị chúng trong cửa sổ cảnh báo
                //alert("Latitude: " + latValue + ", Longitude: " + longValue);
            });
            view.popup.autoOpenEnabled = false;

            view.on("click", function (event) {
                const lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
                const lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
                view.openPopup({
                    // Set the popup's title to the coordinates of the location
                    // title: "Reverse geocode: [" + lon + ", " + lat + "]",
                    title: `Vĩ độ: ${lat}, Kinh độ: ${lon}`,
                    location: event.mapPoint, // Set the location of the popup to the clicked location
                });
                const params = {
                    location: event.mapPoint,
                };
                locator.locationToAddress(url, params).then((response) => {
                    // If an address is successfully found, show it in the popup's content
                    view.popup.content = response.address;
                })
                    .then(() => {
                        search.search(
                            `${event.mapPoint.latitude}, ${event.mapPoint.longitude}`
                        );
                    })
                    .catch(() => {
                        // If the promise fails and no result is found, show a generic message
                        view.popup.content = "No address was found for this location";
                    });
            });
            const layerView = await view.whenLayerView(myTreesFeatureLayer);
            layerView.featureEffect = new FeatureEffect({
                filter: {
                    where: `objectid_1 = ${mapPingId}`
                },
                excludedEffect: "grayscale(25%) blur(5px) opacity(25%)",
                includedEffect: "drop-shadow(0, 2px, 2px, black)"

            })
        })();

    })
function resize() {

    var imgSanPham = $('#viewDiv').width();
    var heightImgSanPham = $('#viewDiv');
    var heightsImgSanPham = imgSanPham / 2.2;
    for (var i = 0; i < heightImgSanPham.length; i++) {
        heightImgSanPham[i].style.height = heightsImgSanPham + "px";
    }

   

}

function resize1() {
    var imgSanPham1 = $('.view-detal-tree .content-tree .text-detail #anh img').width();
    var heightImgSanPham1 = $('.view-detal-tree .content-tree .text-detail #anh img');
    var heightsImgSanPham1 = imgSanPham1 / 0.75294117647;
    for (var i = 0; i < heightImgSanPham1.length; i++) {
        heightImgSanPham1[i].style.height = heightsImgSanPham1 + "px";
    }
}

window.addEventListener("resize", resize);
window.addEventListener("resize", resize1);

window.onresize = function () {
    resize();
    resize1()
};
resize();