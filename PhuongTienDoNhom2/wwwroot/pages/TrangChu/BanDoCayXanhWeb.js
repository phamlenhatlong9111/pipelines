// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
//select 
$(document).ready(function () {


    $('select').select2({
        placeholder: "Chọn",
        theme: 'bootstrap4',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        language: "vi",
        allowClear: true
    });
    require([
        "esri/config",
        "esri/intl",
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/FeatureLayer",
        "esri/Basemap",
        "esri/core/reactiveUtils",
        "esri/widgets/Locate",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Popup",
        "esri/geometry/Polyline",
        "esri/widgets/Search",
        "esri/widgets/BasemapGallery",
        "esri/widgets/Expand",
        "esri/layers/TileLayer",
        "esri/widgets/Measurement",
        "esri/geometry/Point",
        "esri/geometry/SpatialReference",

    ], (
        esriConfig,
        intl,
        Map,
        MapView,
        Graphic,
        FeatureLayer,
        Basemap,
        reactiveUtils,
        Locate,
        GraphicsLayer,
        Popup,
        Polyline,
        Search,
        BasemapGallery,
        Expand,
        TileLayer,
        Measurement,
        Point,
        SpatialReference

    ) => {
        esriConfig.apiKey =
            "AAPK6201e582c47049328317d0486b1db07fPDIxl9irYLz6FgwVp10GjuL4K84vCgcpQpCnzpWGwRhaEVxieRmOGrXXdUCWFdpD";
        intl.setLocale("vi");
        let polylineGraphic = null;
        let highlight;
        let treeLayerView;
        let parkLayerView;
        const dataDirection = [
            {
                en: "enter the roundabout and keep the 2nd exit on",
                vi: "vào bùng binh và đi ra ở lối thứ 2 trên"
            },
            {
                en: "enter the roundabout and keep the 1st exit on",
                vi: "vào bùng binh và đi ra ở lối thứ 1 trên"
            },
            {
                en: "bear right onto ramp",
                vi: "sang phải vào trên đoạn đường nối",
            },
            {
                en: "turn right onto ramp",
                vi: "rẽ phải vào đoạn đường nối",
            },
            {
                en: "make sharp right onto ramp",
                vi: "sang trái ngay trên đoạn đường nối",
            },
            {
                en: "make sharp left onto ramp",
                vi: "ra trái vào đoạn đường nối",
            },
            {
                en: "turn left onto ramp",
                vi: "rẽ trái vào đoạn đường nối",
            },
            {
                en: "bear left onto ramp",
                vi: "sang trái vào đoạn đường nối",
            },
            {
                en: "take ramp on the left",
                vi: "đi dốc ở bên trái",
            },
            {
                en: "take ramp on the right",
                vi: "đi dốc ở bên phải",
            },
            {
                en: "stay on ferry for",
                vi: "ở lại phà cho",
            },
            {
                en: "enter the roundabout",
                vi: "đi vào bùng binh"
            },
            {
                en: "on the right",
                vi: "phía bên phải",
            },
            {
                en: "on the left",
                vi: "phía bên trái",
            },
            {
                en: "and go on",
                vi: "và tiến lên",
            },
            {
                en: "bear right",
                vi: "sang bên phải",
            },
            {
                en: "bear left",
                vi: "sang bên trái",
            },
            {
                en: "turn right",
                vi: "rẽ phải",
            },
            {
                en: "turn left",
                vi: "rẽ trái",
            },
            {
                en: "near left",
                vi: "gần phía bên trái",
            },
            {
                en: "near right",
                vi: "gần phía bên phải",
            },
            {
                en: "at exit",
                vi: "ở lối ra",
            },
            {
                en: "go back",
                vi: "quay lại",
            },
            {
                en: "take ramp",
                vi: "theo đường dốc",
            },
            {
                en: "the 1st",
                vi: "lối thứ 1"
            },
            {
                en: "the 2nd",
                vi: "lối thứ 2"
            },
            {
                en: "your destination",
                vi: "điểm đến của bạn"
            },
            {
                en: "northeast",
                vi: "hướng Đông Bắc",
            },
            {
                en: "southeast",
                vi: "hướng Đông Nam",
            },
            {
                en: "southwest",
                vi: "hướng Tây Nam",
            },
            {
                en: "northwest",
                vi: "hướng Tây Bắc",
            },
            {
                en: "east",
                vi: "hướng đông",
            },
            {
                en: "north",
                vi: "hướng Bắc",
            },
            {
                en: "south",
                vi: "hướng Nam",
            },
            {
                en: "west",
                vi: "hướng Tây",
            },
            {
                en: "straight",
                vi: "đi thẳng",
            },
            {
                en: "after",
                vi: "sau",
            },
            {
                en: "at",
                vi: "tại",
            },
            {
                en: "before",
                vi: "trước",
            },
            {
                en: "onto",
                vi: "trên",
            },
            {
                en: "over",
                vi: "kết thúc",
            },
            {
                en: "past",
                vi: "vừa qua",
            },
            {
                en: "through",
                vi: "xuyên qua",
            },
            {
                en: "under",
                vi: "Dưới",
            },
            {
                en: "by",
                vi: "qua",
            },
            {
                en: "near",
                vi: "ở gần",
            },
            {
                en: "start",
                vi: "bắt đầu",
            },
            {
                en: "finish",
                vi: "kết thúc",
            },
            {
                en: "arrive",
                vi: "đến",
            },
            {
                en: "depart",
                vi: "khởi hành",
            },
            {
                en: "take",
                vi: "giữ",
            },
            {
                en: "go",
                vi: "đi",
            },
            {
                en: "distance",
                vi: "khoảng cách",
            },
            {
                en: "keep",
                vi: "tiếp dục đi",
            },
            {
                en: "turn",
                vi: "rẽ",
            },
            {
                en: "right",
                vi: "bên phải",
            },
            {
                en: "left",
                vi: "bên trái",
            },
            {
                en: "first",
                vi: "đầu tiên",
            },
            {
                en: "second",
                vi: "thứ hai",
            },
            {
                en: "third",
                vi: "thứ ba",
            },
            {
                en: "fourth",
                vi: "thứ tư",
            },
            {
                en: "fifth",
                vi: "thứ năm",
            },
            {
                en: "sixth",
                vi: "thứ sáu",
            },
            {
                en: "seventh",
                vi: "thứ bảy",
            },
            {
                en: "eighth",
                vi: "thứ tám",
            },
            {
                en: "ninth",
                vi: "thứ chín",
            },
            {
                en: "tenth",
                vi: "thứ mười",
            },
            {
                en: "continue",
                vi: "tiếp tục",
            },
            {
                en: "head",
                vi: "đi thẳng",
            },
            {
                en: "on",
                vi: "trên",
            },
            {
                en: "in",
                vi: "trong",
            },
            {
                en: "and",
                vi: "và",
            },
            {
                en: "exit",
                vi: "đi ra",
            },
        ]
        const baseMap = new Basemap({
            baseLayers: [
                new TileLayer({
                    url: "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/MapServer",
                    title: "Bản đồ cây xanh"
                })
            ],
            title: "Bản đồ cây xanh",
            id: "cayxanhmap"
        });
        const myTreesFeatureLayer = new FeatureLayer({

            url: "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/0",
            id: "0",
            outFields: ["*"],
            popupEnabled: true,
            popupTemplate: {
                title: "Thông tin cơ bản",

                content: [
                    {
                        type: "fields",
                        fieldInfos: [
                            {
                                fieldName: "TenCay",
                                label: "Tên cây",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                            {
                                fieldName: "DiaChi",
                                label: "Địa chỉ",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                            {
                                fieldName: "TenTuyenDu",
                                label: "Tuyến đường",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                        ],
                    },
                ],
                actions: [
                    {
                        title: "Chi tiết",
                        id: "statistics",
                        className: "test",
                        type: "button",
                    },
                    {
                        title: "Chỉ đường",
                        id: "direction",
                        className: "test",
                        type: "button",
                    },
                ],
            },
        });
        const myParkFeatureLayer = new FeatureLayer({
            url: "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/1",
            id: "1",
            outFields: ["*"],
            popupEnabled: true,
            spatialReference: 4326,
            centroid: true,
            popupTemplate: {
                title: "Thông tin cơ bản",
                content: [
                    {
                        type: "fields",
                        fieldInfos: [
                            {
                                fieldName: "tenditich",
                                label: "Tên di tích",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                            {
                                fieldName: "diachi",
                                label: "Địa chỉ",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                            {
                                fieldName: "dientich",
                                label: "Diện tích",
                                visible: true,
                                stringFieldOption: "text-box",
                            },
                        ],
                    },
                ],
                actions: [
                    {
                        title: "Chi tiết",
                        id: "statistics1",
                        className: "test1",
                        type: "button",
                    },
                    {
                        title: "Chỉ đường",
                        id: "direction1",
                        className: "test",
                        type: "button",
                    },
                ],
            },
        });
        myTreesFeatureLayer.when().then(async (featureReduction) => {
            treeLayerView = await view.whenLayerView(myTreesFeatureLayer);
        });
        myParkFeatureLayer.when().then(async (featureReduction) => {
            parkLayerView = await view.whenLayerView(myParkFeatureLayer);
        });

        const map = new Map({
            basemap: "arcgis-streets", // Basemap layer service
            layers: [myParkFeatureLayer, myTreesFeatureLayer],
        });
        graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const view = new MapView({
            center: [107.58370200120633, 16.467182145933005],
            container: "viewDiv",
            map: map,
            zoom: 15,
        });
        let activeView = view;
        const measurement = new Measurement();

        // Set-up event handlers for buttons and click events

        const distanceButton = document.getElementById("distance");
        const areaButton = document.getElementById("area");
        const clearButton = document.getElementById("clear");

        //distanceButton.addEventListener("click", () => {
        //    distanceMeasurement();
        //});
        //areaButton.addEventListener("click", () => {
        //    areaMeasurement();
        //});
        //clearButton.addEventListener("click", () => {
        //    clearMeasurements();
        //});

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
        const search = new Search({
            view: view,
            // resultGraphicEnabled: false,
            popupEnabled: false,
        });

        view.ui.add(search, "top-right");
        view.ui.move("zoom", "top-right");
        const routerPopup = new Popup({
            view: view,
            content: "",
            actions: [],
            title: 'Hướng dẫn chỉ đường',
            container: routerdesc,
        });

        routerPopup.viewModel.includeDefaultActions = false;

        view.ui.add(routerPopup, {
            position: "top-right"
        });
        //view.on("click", (evt) => {
        //    const opts = {
        //        include: [myTreesFeatureLayer, myParkFeatureLayer],
        //    };
        //    view.hitTest(evt).then((response) => {
        //        highlight && highlight.remove();
        //        if (response.results.length) {
        //            const graphic = response.results[0].graphic;
        //            const mLayer = graphic.layer;
        //            const attributes = graphic.attributes;
        //            if (!attributes.LayerId) {
        //                // props.onShowObjectInfo(attributes);
        //            }
        //            view.whenLayerView(mLayer).then((layerView) => {
        //                if (layerView._highlightIds) {
        //                    highlight = layerView.highlight(graphic);
        //                }
        //            });
        //        }
        //    });
        //});

        let locateBtn = new Locate({
            view: view,   // Attaches the Locate button to the view
            graphic: new Graphic({
                symbol: { type: "simple-marker" }  // overwrites the default symbol used for the
                // graphic placed at the location of the user when found
            })
        });

        view.ui.add(locateBtn, "top-right");
        let latValue;
        let longValue;
        locateBtn.on("locate", function (event) {
            const coordinates = event.position.coords;
            latValue = coordinates.latitude;
            longValue = coordinates.longitude;
            //Long(latValue, longValue)
            // Sử dụng lat và long ở đây, ví dụ, hiển thị chúng trong cửa sổ cảnh báo
            //alert("Latitude: " + latValue + ", Longitude: " + longValue);

        });


        //Filter toggle btn clear

        const btnClearRoute = document.createElement('div');

        btnClearRoute.className =
            "esri-icon-erase esri-widget--button esri-widget esri-interactive";
        btnClearRoute.addEventListener("click", function (evt) {
            if (graphicsLayer && polylineGraphic) {
                graphicsLayer.remove(polylineGraphic);
                routerPopup.visible = false;
            }

            arrPos = []
        });
        view.ui.add(btnClearRoute, "top-right");

        async function displayFeature(graphic) {
            const query = treeLayerView.createQuery();

            query.objectIds = [graphic.getObjectId()];

            const { features: featuresResult } = await treeLayerView.queryFeatures(
                query)


            const featureResult = featuresResult[0];

            if (featureResult && featureResult.attributes) {
                if (($('#popup-menuleft').hasClass('toggle-display'))) {
                    $('#popup-menuleft').removeClass('toggle-display')
                }
                if (!($('#filter-slider').hasClass('toggle-display'))) {
                    $('#filter-slider').addClass('toggle-display')
                }
                //if (!($('#result-slider').hasClass('toggle-display'))) {
                //    $('#result-slider').addClass('toggle-display')
                //}
                $('a[href="#id-tabpane-2"]').tab('show');



                $.ajax({
                    type: "get",
                    url: `${APIURL}/api/CayXanhApi/truyvanchitietgis?CayXanhID=${featureResult.attributes.objectid_1}`,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data)
                        if (data.isSuccess && data.value != null) {
                            var html = "<div class='img-cay-xanh'>";
                            if (
                                data.value.tepKemTheo.length > 0
                            ) {
                                for (let i = 0; i < data.value.tepKemTheo.length; i++) {
                                    //      html += `
                                    //<img src=${APIURL}/${data.value.tepKemTheo[i].noiLuuTru
                                    //          } alt="Cây cấm trồng"/>`;
                                    //  }
                                    html += `
                          <img src=https://cayxanhbaoton.huecit.com/${data.value.tepKemTheo[i].noiLuuTru
                                        } alt="Cây cấm trồng"/>`;
                                }

                            }
                            //else {
                            //    html += `
                            //  <img src=${APIURL}/upload/bg-cay-alt.png
                            //        } alt="Cây cấm trồng"/>`;
                            //}

                            html += "</div>";
                            $("#chitiet").children().remove();
                            $("#chitiet").append(`<p class="tree-name-attInfo"></p>${html}
                        <div class='info-tree content-tree'>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Tuyến đường:</label>
                                <label class="tuyen-duong">${data.value.tenTuyen != null ? data.value.tenTuyen : "Chưa biết"}</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Chủng loại:</label>
                                <label class="chung-loai">${data.value.tenCay}</label>
                            </div> 
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Tên khoa học:</label>
                                <label class="ten-khoa-hoc">${data.value.tenKhoaHoc != "" ? data.value.tenKhoaHoc : "Chưa biết"}</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Đặc tính sinh học:</label>
                                <label class="dac-tinh-sinh-hoc">${data.value.moTa != null ? data.value.moTa : ""}</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Số quản lý:</label>
                                <label class="so-quan-ly">#${data.value.soHieuTrenTuyen}</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Đường kính:</label>
                                <label class="duong-kinh">${data.value.duongKinhThan} cm</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Chiều cao:</label>
                                <label class="chieu-cao">${data.value.chieuCao} m</label>
                            </div>
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Hiện trạng:</label>
                                <label class="hien-trang">${data.value.ghiChu != "" ? data.value.ghiChu : ""}</label>
                            </div>
                        </div>`)

                            //if (data.value.tenTuyen != null) {
                            //    $(".tuyen-duong").text(data.value.tenTuyen);
                            //} else $(".tuyen-duong").text("Chưa biết");

                            //$(".chung-loai").text(data.value.tenCay);
                            //if (data.value.tenKhoaHoc != "") {
                            //    $(".ten-khoa-hoc").text(data.value.tenKhoaHoc);
                            //} else {
                            //    $(".ten-khoa-hoc").text("Chưa biết");
                            //}
                            //if (data.value.moTa != null) {
                            //    $(".dac-tinh-sinh-hoc").text(data.value.moTa);
                            //} else {
                            //    $(".dac-tinh-sinh-hoc").text("");
                            //}
                            //$(".so-quan-ly").text(`#${data.value.soHieuTrenTuyen}`);
                            //$(".duong-kinh").text(`${data.value.duongKinhThan} cm`);

                            //$(".chieu-cao").text(`${data.value.chieuCao} m`);
                            //if (data.value.ghiChu != "") {
                            //    $(".hien-trang").text(data.value.ghiChu);
                            //} else {
                            //    $(".hien-trang").text("");
                            //}
                        }
                        else {
                            $("#chitiet").children().remove();
                            $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                        <div class='info-tree content-tree'>   
                            <div class='text-detail'>
                                <label class="attInfo-table-type editor-label">Tuyến đường:</label>
                                <label class="tuyen-duong">Chưa biết</label>
                            </div>        
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Chủng loại:</label>
                                <label class="chung-loai">}</label>
                            </div>        
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Tên khoa học:</label>
                                <label class="ten-khoa-hoc">Chưa biết</label>
                            </div>        
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Đặc tính sinh học:</label>
                                <label class="dac-tinh-sinh-hoc"></label>
                            </div>       
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Số quản lý:</label>
                                <label class="so-quan-ly"></label>
                            </div>       
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Đường kính:</label>
                                <label class="duong-kinh"></label>
                            </div>        
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Chiều cao:</label>
                                <label class="chieu-cao"></label>
                            </div>        
                            <div class='text-detail'>        
                                <label class="attInfo-table-type editor-label">Hiện trạng:</label>
                                <label class="hien-trang"></label>
                            </div>
                        </div>`)
                            //$(".tuyen-duong").text("Chưa biết");
                            //$(".chung-loai").text("");
                            //$(".ten-khoa-hoc").text("Chưa biết");
                            //$(".dac-tinh-sinh-hoc").text("");
                            //$(".so-quan-ly").text("");
                            //$(".duong-kinh").text("");
                            //$(".chieu-cao").text("");
                            //$(".hien-trang").text("");
                            //$(".hien-trang").text("");
                        }
                    },
                    error: function (err) {
                        console.log(err);
                        $("#chitiet").children().remove();
                        $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                    <div class='info-tree content-tree'>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tuyến đường:</label>
                            <label class="tuyen-duong">Chưa biết</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Chủng loại:</label>
                            <label class="chung-loai"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên khoa học:</label>
                            <label class="ten-khoa-hoc">Chưa biết</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Đặc tính sinh học:</label>
                            <label class="dac-tinh-sinh-hoc"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Số quản lý:</label>
                            <label class="so-quan-ly"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Đường kính:</label>
                            <label class="duong-kinh"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Chiều cao:</label>
                            <label class="chieu-cao"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Hiện trạng:</label>
                            <label class="hien-trang"></label>
                        </div>
                    </div>
                    <img src="" alt="" />`)
                    },
                });
                //   props.onShowObjectInfo(featureResult.attributes);
            }
        }
        async function displayFeature1(graphic) {

            const queryParkLayer = parkLayerView.createQuery();

            queryParkLayer.objectIds = [graphic.getObjectId()];

            const { features: featuresResult1 } = await parkLayerView.queryFeatures(
                queryParkLayer
            );



            const featureResult1 = featuresResult1[0];
            if (featureResult1.attributes.loaicq == 1) {
                console.log("mặt nước", featureResult1.attributes.objectid_1)
                if (($('#popup-menuleft').hasClass('toggle-display'))) {
                    $('#popup-menuleft').removeClass('toggle-display')
                }
                if (!($('#filter-slider').hasClass('toggle-display'))) {
                    $('#filter-slider').addClass('toggle-display')
                }
                //if (!($('#result-slider').hasClass('toggle-display'))) {
                //    $('#result-slider').addClass('toggle-display')
                //}
                $('a[href="#id-tabpane-2"]').tab('show');
                $.ajax({
                    type: "get",
                    url: `${APIURL}/api/ThongTinMatNuocApi/ChiTiet?ObjectID=${featureResult1.attributes.objectid_1}`,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data)
                        $("#chitiet").children().remove();
                        $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                    <div class='info-tree content-tree'>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên mặt nước:</label>
                            <label class="tuyen-duong">${data.tenMatNuoc != null ? data.tenMatNuoc : "Chưa biết"}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Mô tả:</label>
                            <label class="chung-loai">${data.moTa != null ? data.moTa : ""}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Diện tích:</label>
                            <label class="ten-khoa-hoc">${data.dienTich != null ? data.dienTich : ""}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên khu di tích:</label>
                            <label class="dac-tinh-sinh-hoc">${data.tenKhuDiTich != null ? data.tenKhuDiTich : ""}</label>
                        </div>
                    </div>`)

                    },
                    error: function (err) {
                        console.log(err);
                        $("#chitiet").children().remove();
                        $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                    <div class='info-tree content-tree'>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên mặt nước:</label>
                            <label class="tuyen-duong">Chưa biết</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Mô tả:</label>
                            <label class="chung-loai"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Diện tích:</label>
                            <label class="ten-khoa-hoc"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên khu di tích:</label>
                            <label class="dac-tinh-sinh-hoc"></label>
                        </div>
                    </div>`)
                    },
                });
            } else if (featureResult1.attributes.loaicq == 2 || featureResult1.attributes.loaicq == 3) {
                console.log("thảm xanh", featureResult1.attributes.objectid_1)
                if (($('#popup-menuleft').hasClass('toggle-display'))) {
                    $('#popup-menuleft').removeClass('toggle-display')
                }
                if (!($('#filter-slider').hasClass('toggle-display'))) {
                    $('#filter-slider').addClass('toggle-display')
                }
                //if (!($('#result-slider').hasClass('toggle-display'))) {
                //    $('#result-slider').addClass('toggle-display')
                //}
                $('a[href="#id-tabpane-2"]').tab('show');
                $.ajax({
                    type: "get",
                    url: `${APIURL}/api/ThongTinThamXanhApi/ChiTiet?ObjectID=${featureResult1.attributes.objectid_1}`,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data)
                        $("#chitiet").children().remove();
                        $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                    <div class='info-tree content-tree'>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên thảm xanh:</label>
                            <label class="tuyen-duong">${data.tenThamXanh != null ? data.tenThamXanh : "Chưa biết"}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Mô tả:</label>
                            <label class="chung-loai">${data.moTa != null ? data.moTa : ""}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Diện tích:</label>
                            <label class="ten-khoa-hoc">${data.dienTich != null ? data.dienTich : ""}</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên khu di tích:</label>
                            <label class="dac-tinh-sinh-hoc">${data.tenKhuDiTich != null ? data.tenKhuDiTich : ""}</label>
                        </div>
                    </div>`)

                    },
                    error: function (err) {
                        console.log(err);
                        $("#chitiet").children().remove();
                        $("#chitiet").append(`<p class="tree-name-attInfo"></p>
                    <div class='info-tree content-tree'>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên thảm xanh:</label>
                            <label class="tuyen-duong">Chưa biết</label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Mô tả:</label>
                            <label class="chung-loai"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Diện tích:</label>
                            <label class="ten-khoa-hoc"></label>
                        </div>
                        <div class='text-detail'>
                            <label class="attInfo-table-type editor-label">Tên khu di tích:</label>
                            <label class="dac-tinh-sinh-hoc"></label>
                        </div>
                    </div>`)
                    },
                });

            }

        }
        let routerFlag = false;
        let arrPos = [];
        let routerContent = '';

        const escapeRegExpMatch = function (s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        };

        const isExactMatch = (str, match) => {
            return new RegExp(`\\b${escapeRegExpMatch(match)}\\b`, 'i').test(str)
        }
        reactiveUtils.on(
            () => view.popup,
            "trigger-action",
            (event) => {

                // Execute the measureThis() function if the measure-this action is clicked
                const mPopup = view.popup;
                const selectedFeature =
                    mPopup.selectedFeature && mPopup.selectedFeature.isAggregate;
                if (event.action.id == "statistics") {
                    displayFeature(mPopup.selectedFeature);
                }
                else if (event.action.id == "statistics1") {
                    displayFeature1(mPopup.selectedFeature);
                }
                else if (event.action.id == "direction") {
                    const mPopup = view.popup;
                    let mLat = null;
                    let mLong = null;

                    if (routerFlag == false) {
                        //Click tren map
                        if (mPopup.selectedFeature.geometry.latitude && mPopup.selectedFeature.geometry.longitude) {
                            routerFlag = true;

                            mLat = mPopup.selectedFeature.geometry.latitude;
                            mLong = mPopup.selectedFeature.geometry.longitude;

                            const item = arrPos.find(x => (x[0] == mLong && x[1] == mLat));
                            if (!item) {
                                if (polylineGraphic) {
                                    graphicsLayer.remove(polylineGraphic);
                                }

                                const des = [mLong, mLat];

                                locateBtn.locate()
                                    .then(function (pos) {
                                        const { latitude: curLat, longitude: curLong } = pos.coords

                                        const curr = [curLong, curLat];

                                        if (arrPos.length == 0) {
                                            arrPos.push(curr)
                                        }

                                        arrPos.push(des);

                                        var myHeaders = new Headers();
                                        myHeaders.append("Authorization", "5b3ce3597851110001cf624851a99071ab2944ee85a0f5e9f5e40c36");
                                        myHeaders.append("Content-Type", "application/json");

                                        var raw = JSON.stringify({
                                            "coordinates": arrPos,
                                            "continue_straight": "true"
                                        });

                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: raw,
                                            redirect: 'follow'
                                        };

                                        fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", requestOptions)
                                            .then(res => {
                                                return res.json()
                                            })
                                            .then(data => {
                                                console.log(data)
                                                routerContent = '';

                                                const { features } = data;
                                                const [resultFeature] = features;
                                                const { geometry, properties } = resultFeature;
                                                const { segments } = properties;
                                                const [segmentResult] = segments
                                                const { steps } = segmentResult
                                                const { coordinates } = geometry;

                                                segments.forEach((ele) => {
                                                    ele.steps.forEach((el) => {
                                                        if (el && el.instruction != null) {
                                                            //Chi duong hien tai
                                                            let str = el.instruction;

                                                            for (let i = 0; i < dataDirection.length; i++) {
                                                                let e = dataDirection[i];

                                                                const check = isExactMatch(str, e.en);

                                                                if (check) {

                                                                    const regex = new RegExp(`\\b${escapeRegExpMatch(e.en)}\\b`, 'i');

                                                                    let ar = str.replace(regex, e.vi);

                                                                    str = ar;
                                                                }
                                                            }

                                                            routerContent += `<p class="router-hd">${str}</p>`;
                                                        }
                                                    })
                                                })

                                                polylineGraphic = new Graphic({
                                                    geometry: new Polyline({
                                                        hasZ: false,
                                                        hasM: true,
                                                        paths: [...coordinates],
                                                    }),
                                                    symbol: {
                                                        type: "simple-line",
                                                        color: [226, 119, 40],
                                                        width: 3
                                                    }
                                                });

                                                graphicsLayer.add(polylineGraphic);

                                                routerPopup.content = routerContent;
                                                routerPopup.visible = true;

                                                routerFlag = false;
                                            })
                                            .catch(er => {
                                                console.log(er)
                                                routerFlag = false;
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        routerFlag = false;
                                        alert('Cần cấp quyền cần thiết để sử dụng chức năng này!');
                                    })
                            } else {
                                routerFlag = false;
                            }
                        }
                        //Click list

                    }


                    //console.log(latValue, longValue);
                    //displayFeature1(mPopup.selectedFeature);
                }
                else if (event.action.id == "direction1") {
                    const mPopup = view.popup;
                    //console.log(mPopup.selectedFeature.geometry.centroid.latitude)
                    let mLat = null;
                    let mLong = null;

                    if (routerFlag == false) {
                        //Click tren map
                        if (mPopup.selectedFeature.geometry.centroid.latitude && mPopup.selectedFeature.geometry.centroid.longitude) {
                            routerFlag = true;

                            mLat = mPopup.selectedFeature.geometry.centroid.latitude;
                            mLong = mPopup.selectedFeature.geometry.centroid.longitude;

                            const item = arrPos.find(x => (x[0] == mLong && x[1] == mLat));
                            if (!item) {
                                if (polylineGraphic) {
                                    graphicsLayer.remove(polylineGraphic);
                                }

                                const des = [mLong, mLat];

                                locateBtn.locate()
                                    .then(function (pos) {
                                        const { latitude: curLat, longitude: curLong } = pos.coords

                                        const curr = [curLong, curLat];

                                        if (arrPos.length == 0) {
                                            arrPos.push(curr)
                                        }

                                        arrPos.push(des);

                                        var myHeaders = new Headers();
                                        myHeaders.append("Authorization", "5b3ce3597851110001cf624851a99071ab2944ee85a0f5e9f5e40c36");
                                        myHeaders.append("Content-Type", "application/json");

                                        var raw = JSON.stringify({
                                            "coordinates": arrPos,
                                            "continue_straight": "true"
                                        });

                                        var requestOptions = {
                                            method: 'POST',
                                            headers: myHeaders,
                                            body: raw,
                                            redirect: 'follow'
                                        };

                                        fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", requestOptions)
                                            .then(res => {
                                                return res.json()
                                            })
                                            .then(data => {
                                                console.log(data)
                                                routerContent = '';

                                                const { features } = data;
                                                const [resultFeature] = features;
                                                const { geometry, properties } = resultFeature;
                                                const { segments } = properties;
                                                const [segmentResult] = segments
                                                const { steps } = segmentResult
                                                const { coordinates } = geometry;

                                                segments.forEach((ele) => {
                                                    ele.steps.forEach((el) => {
                                                        if (el && el.instruction != null) {
                                                            //Chi duong hien tai
                                                            let str = el.instruction;

                                                            for (let i = 0; i < dataDirection.length; i++) {
                                                                let e = dataDirection[i];

                                                                const check = isExactMatch(str, e.en);

                                                                if (check) {

                                                                    const regex = new RegExp(`\\b${escapeRegExpMatch(e.en)}\\b`, 'i');

                                                                    let ar = str.replace(regex, e.vi);

                                                                    str = ar;
                                                                }
                                                            }

                                                            routerContent += `<p class="router-hd">${str}</p>`;
                                                        }
                                                    })
                                                })

                                                polylineGraphic = new Graphic({
                                                    geometry: new Polyline({
                                                        hasZ: false,
                                                        hasM: true,
                                                        paths: [...coordinates],
                                                    }),
                                                    symbol: {
                                                        type: "simple-line",
                                                        color: [226, 119, 40],
                                                        width: 3
                                                    }
                                                });

                                                graphicsLayer.add(polylineGraphic);

                                                routerPopup.content = routerContent;
                                                routerPopup.visible = true;

                                                routerFlag = false;
                                            })
                                            .catch(er => {
                                                console.log(er)
                                                routerFlag = false;
                                            })
                                    })
                                    .catch((error) => {
                                        console.log(error)
                                        routerFlag = false;
                                        alert('Cần cấp quyền cần thiết để sử dụng chức năng này!');
                                    })
                            } else {
                                routerFlag = false;
                            }
                        }
                        //Click list

                    }


                    //console.log(latValue, longValue);
                    //displayFeature1(mPopup.selectedFeature);
                }
                // console.log(view.popup.selectedFeature.getObjectId());
                //displayFeature(mPopup.selectedFeature);
                //displayFeature1(mPopup.selectedFeature);
            }
        );

        //reactiveUtils.on(
        //    () => view.popup,
        //    "trigger-action",
        //    (event) => {
        //        console.log(123);
        //        // Execute the measureThis() function if the measure-this action is clicked
        //        const mPopup = view.popup;
        //        const selectedFeature =
        //            mPopup.selectedFeature && mPopup.selectedFeature.isAggregate;

        //        // console.log(view.popup.selectedFeature.getObjectId());
        //        displayFeature(mPopup.selectedFeature);
        //        displayFeature1(mPopup.selectedFeature);
        //    }
        //);
        //   view.popup.autoOpenEnabled = false;
        //   view.popup.on("trigger-action", function (event) {
        //     console.log(event);
        //     const mPopup = view.popup;
        //     const selectedFeature =
        //       mPopup.selectedFeature && mPopup.selectedFeature.isAggregate;

        //     // console.log(view.popup.selectedFeature.getObjectId());
        //     displayFeature(mPopup.selectedFeature);
        //   });

        //Filter toggle btn
        var eleFilter = document.createElement("div");
        eleFilter.className = "esri-icon-search esri-widget--button esri-widget esri-interactive";
        eleFilter.addEventListener("click", function (evt) {

            $('#filter-slider').toggleClass('toggle-display');
            $('#popup-menuleft').addClass('toggle-display');
            //$('#filter-slider').toggleClass('toggle-display');

            //if (!($('#popup-menuleft').hasClass('toggle-display'))) {
            //    $('#popup-menuleft').addClass('toggle-display')
            //}
            //$('#filter-slider').toggleClass('toggle-display');

            //if (!($('#map-slider').hasClass('toggle-display'))) {
            //    $('#map-slider').addClass('toggle-display')
            //}

            //if (!($('#result-slider').hasClass('toggle-display'))) {
            //    $('#result-slider').addClass('toggle-display')
            //}

            //if (!($('#pa-slider').hasClass('toggle-display'))) {
            //    $('#pa-slider').addClass('toggle-display')
            //}

            //if (!($('#chitiet-slider').hasClass('toggle-display'))) {
            //    $('#chitiet-slider').addClass('toggle-display')
            //}
        });
        view.ui.add(eleFilter, "top-right");


        var element = document.createElement("div");
        element.className =
            "esri-icon-layer-list esri-widget--button esri-widget esri-interactive";
        element.addEventListener("click", function (evt) {
            //var x = document.getElementById("popup-menuleft");
            //$("#modalCongViecAdd").modal("show");
            $('#popup-menuleft').toggleClass('toggle-display');
            $('#filter-slider').addClass('toggle-display');
            //$('#result-slider').addClass('toggle-display');
            //if (!($('#filter-slider').hasClass('toggle-display'))) {
            //    $('#filter-slider').addClass('toggle-display')
            //}
            // props.onToggleSideMenu();
        });
        view.ui.add(element, "top-right");
        const basemapGallery = new BasemapGallery({
            view: view,
            container: document.createElement("div"),
            source: [Basemap.fromId("arcgis-topographic"), Basemap.fromId("satellite"), baseMap]
        });

        const bgExpand = new Expand({
            view: view,
            content: basemapGallery
        });

        view.ui.add(bgExpand, "bottom-left");

        $('#dropdown1').on('click', function () {
            $('#dropdown-menu1').toggleClass('d-none');
            $('#dropdown-menu1').removeClass('d-block');
        })
        $('#dropdown2').on('click', function () {
            $('#dropdown-menu2').toggleClass('d-none');
            $('#dropdown-menu2').removeClass('d-block');
        })
        $('#dropdown3').on('click', function () {
            $('#dropdown-menu3').toggleClass('d-none');
            $('#dropdown-menu3').removeClass('d-block');
        })
        var resultKhuDiTich = [];
        async function GetDanhSachKhuDiTich() {
            $.ajax({
                url: APIURL + "/api/KhuDiTichApi/danhsachkhuditich",
                type: "GET",
                dataType: 'json',
                async: false,
                success: function (data) {
                    resultKhuDiTich = data.value;
                }
            });
            return resultKhuDiTich;
        }
        const GetDataKhuDiTich = async () => {
            await GetDanhSachKhuDiTich()
        }
        GetDataKhuDiTich();
        var DanhSachKhuDiTich = resultKhuDiTich
        DanhSachKhuDiTich.map((item) => {
            $('#khudiTichAdd').append(`<option value=${item.id}>${item.tenKhuDiTich}</option>`)
            $('#khudiTichAdd1').append(`<option value=${item.id}>${item.tenKhuDiTich}</option>`)
            $('#khudiTichAdd2').append(`<option value=${item.id}>${item.tenKhuDiTich}</option>`)

        })
        $('#khudiTichAdd').on('change', function () {
            var IDKhuDiTich = this.value;
            var html = `<option value="">Chọn tuyến đường</option>`;
            var html1 = `<option value="">Chọn thảm xanh</option>`;

            $.ajax({
                type: 'get',
                url: `${APIURL}/api/TuyenCayXanhApi/getdanhtuyentheoidkhudt?IDKhuDiTich=${IDKhuDiTich}`,
                async: false,
                data: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    var result = data.value
                    $('#tuyenDuongAdd').html("")
                    result.map((item) => {
                        html += `<option value=${item.id}>${item.tenTuyen}</option>`;
                    })

                    $('#tuyenDuongAdd').html(html)
                },
                error: function (err) {
                    console.log(err)
                }
            })
            $.ajax({
                type: 'get',
                url: `${APIURL}/api/ThongTinThamXanhApi/ChiTietTheoIDKhuVuc?IDKhuVuc=${IDKhuDiTich}`,
                async: false,
                data: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (data) {
                    var result = data.value
                    $('#thamxanh').html("")
                    result.map((item) => {
                        html1 += `<option value=${item.id}>${item.tenThamXanh}</option>`;
                    })
                    $('#thamxanh').html(html1)
                },
                error: function (err) {
                    console.log(err)
                }
            })
        })

        function renderResult(data) {
            //console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    console.log(el)
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.tenCayRutGon
                    let sohieu = el.soHieu
                    let chieucao = el.chieuCao
                    let chuvithan = el.chuViThan
                    let duongkinhthan = el.duongKinhThan
                    let loaicay = el.tenLoaiCay
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.phuong
                    let id = el.mappingID
                    html += `
                            <div class="result-list-item" data-value="0" data-oid="${id}">
						        <label>${ten}<span> #${sohieu}</span></label>
                                <div class="loai-cay"><span>${loaicay}</span></div>
                                <div class="dai-chuvi-dk">
                                    <span class="chieucaocay">Chiều cao: ${chieucao != null ? chieucao : ""} cm</span>
                                    <span class="chuvicay"><img src="/lib/images/icon-shut-down.png"/>Chu vi: ${chuvithan != null ? chuvithan : ""} cm</span>
                                    <span class="duongkinhcay"><img src="/lib/images/icon-shut-down.png"/>Đường kính: ${duongkinhthan != null ? duongkinhthan : ""} cm</span>
                                </div>
						        <span>Khu di tích: ${diachi != null ? diachi : ""}</span>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        function renderResult1(data) {
            console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    console.log(el)
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.attributes.tencay
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.attributes.tentuyendu
                    let id = el.attributes.objectid_1
                    html += `
                            <div class="result-list-item" data-value="1" data-oid="${id}">
						        <label>${ten}</label>
						        <p>${diachi != null ? diachi : ""}</p>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        function renderResult2(data) {
            console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    console.log(el)
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.attributes.tenditich
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.attributes.diachi
                    let id = el.attributes.objectid_1
                    html += `
                            <div class="result-list-item" data-value="2" data-oid="${id}">
						        <label>${ten}</label>
						        <p>${diachi != null ? diachi : ""}</p>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        function renderResult3(data) {
            console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    console.log(el)
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.attributes.tenditich
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.attributes.diachi
                    let id = el.attributes.objectid_1
                    html += `
                            <div class="result-list-item" data-value="2" data-oid="${id}">
						        <label>${ten}</label>
						        <p>${diachi != null ? diachi : ""}</p>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        function renderThamXanh(data) {
            console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.tenThamXanh
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.tenKhuDiTich
                    let id = el.objectID
                    html += `
                            <div class="result-list-item" data-value="3" data-oid="${id}">
						        <label>${ten}</label>
						        <p>${diachi != null ? diachi : ""}</p>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        function renderMatNuoc(data) {
            console.log(data)
            $('#result-content').empty();
            let html = '';
            if (data.length > 0) {
                data.forEach((el) => {
                    //let ten = el.attributes.ten ? el.attributes.ten : el.attributes.tendiadiem ? el.attributes.tendiadiem : el.attributes.tenlehoi ? el.attributes.tenlehoi : el.attributes.tieude ? el.attributes.tieude : null;
                    let ten = el.tenMatNuoc
                    //let diachi = el.attributes.sonha ? el.attributes.sonha : el.attributes.diachi ? el.attributes.diachi : el.attributes.vitri ? el.attributes.vitri : el.attributes.diadiem ? el.attributes.diadiem : el.attributes.diachisuki ? el.attributes.diachisuki : null;
                    //let id = el.attributes.objectid_1 ? el.attributes.objectid_1 : el.attributes.objectid;
                    let diachi = el.tenKhuDiTich
                    let id = el.objectID
                    html += `
                            <div class="result-list-item" data-value="4" data-oid="${id}">
						        <label>${ten}</label>
						        <p>${diachi != null ? diachi : ""}</p>
					        </div>
                        `
                });
            } else {
                html += `
                                <div class="khong-tim-thay">
                                    <p>Không tìm thấy dữ liệu tương ứng</p>
                                </div>
                                `
            }
            $('#result-content').append(html);
        };
        $(document).on('click', '.result-list-item', async function () {
            const id = $(this).data('oid');
            if ($(this).data('value') == 0) {
                const query = myTreesFeatureLayer.createQuery();
                query.where = `objectid_1 = ${id}`; // Assuming 'id' is the field name in your layer
                const result = await treeLayerView.queryFeatures(query);

                if (result.features.length > 0) {
                    //console.log(result.features[0].)
                    // Feature with the clicked ID found in the layer
                    const clickedFeature = result.features[0];

                    view.goTo({
                        center: [clickedFeature.geometry.longitude, clickedFeature.geometry.latitude],
                        zoom: 18
                    });

                    view.popup.open({
                        features: [clickedFeature],
                        location: clickedFeature.geometry
                    });
                    console.log("Clicked Feature:", clickedFeature.attributes);

                    // Now you can work with the clicked feature as needed
                } else {
                    console.log("No feature found with the clicked ID in the layer.");
                }
            } else if ($(this).data('value') == 1) {
                const query = myTreesFeatureLayer.createQuery();
                query.where = `objectid_1 = ${id}`; // Assuming 'id' is the field name in your layer
                const result = await treeLayerView.queryFeatures(query);

                if (result.features.length > 0) {
                    //console.log(result.features[0].)
                    // Feature with the clicked ID found in the layer
                    const clickedFeature = result.features[0];
                    view.goTo({
                        center: [clickedFeature.geometry.longitude, clickedFeature.geometry.latitude],
                        zoom: 18
                    });

                    view.popup.open({
                        features: [clickedFeature],
                        location: clickedFeature.geometry
                    });
                    console.log("Clicked Feature:", clickedFeature.attributes);

                    // Now you can work with the clicked feature as needed
                } else {
                    console.log("No feature found with the clicked ID in the layer.");
                }
            }
            else if ($(this).data('value') == 2) {
                const query = myParkFeatureLayer.createQuery();
                query.where = `objectid_1 = ${id}`; // Assuming 'id' is the field name in your layer
                const result = await parkLayerView.queryFeatures(query);
                if (result.features.length > 0) {
                    //console.log(result.features[0].)
                    // Feature with the clicked ID found in the layer
                    const clickedFeature = result.features[0];
                    console.log(clickedFeature)
                    view.goTo({
                        center: [clickedFeature.geometry.centroid.longitude, clickedFeature.geometry.centroid.latitude],
                        zoom: 18
                    });

                    view.popup.open({
                        features: [clickedFeature],
                        location: clickedFeature.geometry.centroid
                    });
                    console.log("Clicked Feature:", clickedFeature.attributes);

                    // Now you can work with the clicked feature as needed
                } else {
                    console.log("No feature found with the clicked ID in the layer.");
                }
            }
            else if ($(this).data('value') == 3) {
                const query = myParkFeatureLayer.createQuery();
                query.where = `objectid_1 = ${id}`; // Assuming 'id' is the field name in your layer
                const result = await parkLayerView.queryFeatures(query);
                if (result.features.length > 0) {
                    //console.log(result.features[0].)
                    // Feature with the clicked ID found in the layer
                    const clickedFeature = result.features[0];
                    console.log(clickedFeature)
                    view.goTo({
                        center: [clickedFeature.geometry.centroid.longitude, clickedFeature.geometry.centroid.latitude],
                        zoom: 18
                    });

                    view.popup.open({
                        features: [clickedFeature],
                        location: clickedFeature.geometry.centroid
                    });
                    console.log("Clicked Feature:", clickedFeature.attributes);

                    // Now you can work with the clicked feature as needed
                } else {
                    console.log("No feature found with the clicked ID in the layer.");
                }
            }
            else if ($(this).data('value') == 4) {
                const query = myParkFeatureLayer.createQuery();
                query.where = `objectid_1 = ${id}`; // Assuming 'id' is the field name in your layer
                const result = await parkLayerView.queryFeatures(query);
                if (result.features.length > 0) {
                    //console.log(result.features[0].)
                    // Feature with the clicked ID found in the layer
                    const clickedFeature = result.features[0];
                    console.log(clickedFeature)
                    view.goTo({
                        center: [clickedFeature.geometry.centroid.longitude, clickedFeature.geometry.centroid.latitude],
                        zoom: 18
                    });

                    view.popup.open({
                        features: [clickedFeature],
                        location: clickedFeature.geometry.centroid
                    });
                    console.log("Clicked Feature:", clickedFeature.attributes);

                    // Now you can work with the clicked feature as needed
                } else {
                    console.log("No feature found with the clicked ID in the layer.");
                }
            }

            //var form = new FormData();
            //form.append("where ", "1=1");
            //form.append("objectids", `${id}`);
            //form.append("outFields", "*");
            //form.append("f", "pjson");
            //form.append("outSR", "4326");
            //$.ajax({
            //    "url": "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/0/query",
            //    "method": "POST",
            //    "timeout": 0,
            //    "processData": false,
            //    "mimeType": "multipart/form-data",
            //    "contentType": false,
            //    "data": form,
            //    "dataType": "json",
            //    success: function (data) {
            //        console.log(data)
            //        view.goTo({
            //            center: [data.features[0].geometry.x, data.features[0].geometry.y],
            //            zoom: 18
            //        });

            //        view.popup.open({
            //            features: [data.features],
            //            location: data.features[0].geometry
            //        });

            //    },
            //    error: function (err) {
            //        console.log(err)
            //    }
            //});





            //let found = resultArr.find(x => x.attributes.objectid == id);
            //if (currentLayerSearch == 13) {
            //    found = resultArr.find(x => x.attributes.objectid_1 == id);
            //}
            //if (found) {
            //    const point = new Point(
            //        found.geometry.x,
            //        found.geometry.y,
            //        new SpatialReference({
            //            wkt: MAP_SR,
            //        })
            //    );

            //    let outSpatialReference = new SpatialReference({ wkid: 3405 });

            //    projection.load().then(function () {
            //        const res = projection.project(point, outSpatialReference);

            //        const point1 = new Point(
            //            res.x,
            //            res.y,
            //            new SpatialReference({
            //                wkid: 3405
            //            })
            //        );

            //        let outSpatialReference1 = new SpatialReference({ wkid: 4326 });

            //        const res1 = projection.project(point1, outSpatialReference1);

            //        if (res1 != null && res1.longitude != null && res1.latitude != null) {
            //            view.goTo({
            //                center: [res1.longitude, res1.latitude],
            //                zoom: 18
            //            });

            //            view.popup.open({
            //                features: [found],
            //                location: found.geometry
            //            });
            //        }
            //    });
            //}
        });

        $('#filter-cancel-btn').on('click', function () {
            $('#filter-slider').toggleClass('toggle-display');
        });
        $('.title-timkiem').on('click', function () {
            $('#popup-menuleft').toggleClass('toggle-display');
        });
        $('.title-timkiem').on('click', function () {
            $('#popup-menuleft').addClass('toggle-display');
            $('#filter-slider').addClass('toggle-display');
        });
        /// thay đổi tiêu chí tìm kiếm : nâng cao/xung quanh.  
        $('#filter-type-slt').on('change', function () {
            const slt = $(this).val();
            const lopchuyende = $('#lopchuyende').val()
            if (slt == "nc" && lopchuyende == '1') {
                if ($('#adv-filter-content').hasClass('d-none')) {
                    $('#adv-filter-content').removeClass('d-none')
                }
                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }
                if (!($('#adv-filter-xq-content').hasClass('d-none'))) {
                    $('#adv-filter-xq-content').addClass('d-none')
                }
            }
            else if (slt == "nc" && lopchuyende == '2') {
                if ($('#adv-filter-content1').hasClass('d-none')) {
                    $('#adv-filter-content1').removeClass('d-none')
                }
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }
                if (!($('#adv-filter-xq-content').hasClass('d-none'))) {
                    $('#adv-filter-xq-content').addClass('d-none')
                }
            }
            else if (slt == "nc" && lopchuyende == '3') {
                if ($('#adv-filter-content2').hasClass('d-none')) {
                    $('#adv-filter-content2').removeClass('d-none')
                }
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }
                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }
                if (!($('#adv-filter-xq-content').hasClass('d-none'))) {
                    $('#adv-filter-xq-content').addClass('d-none')
                }
            }
            else if (slt == "nc") {
                if ($('#adv-filter-content').hasClass('d-none')) {
                    $('#adv-filter-content').removeClass('d-none')
                }


                if (!($('#adv-filter-xq-content').hasClass('d-none'))) {
                    $('#adv-filter-xq-content').addClass('d-none')
                }
            }


            else if (slt == "xq") {
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }
                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }
                if ($('#adv-filter-xq-content').hasClass('d-none')) {
                    $('#adv-filter-xq-content').removeClass('d-none')
                }
            }
        });
        $('#lopchuyende').on('change', function () {
            const slt = $(this).val();
            const loaitimkiem = $('#filter-type-slt').val()
            if (slt == "1" && loaitimkiem == "nc") {
                if ($('#adv-filter-content').hasClass('d-none')) {
                    $('#adv-filter-content').removeClass('d-none')
                }

                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }
            }
            else if (slt == "2" && loaitimkiem == "nc") {
                if ($('#adv-filter-content1').hasClass('d-none')) {
                    $('#adv-filter-content1').removeClass('d-none')
                }
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }


            }
            else if (slt == "3" && loaitimkiem == "nc") {
                if ($('#adv-filter-content2').hasClass('d-none')) {
                    $('#adv-filter-content2').removeClass('d-none')
                }
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }
                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }
            }
            else if (slt == "1" && loaitimkiem == "xq") {
                if (!($('#adv-filter-content').hasClass('d-none'))) {
                    $('#adv-filter-content').addClass('d-none')
                }

            }
            else if (slt == "2" && loaitimkiem == "xq") {
                if (!($('#adv-filter-content1').hasClass('d-none'))) {
                    $('#adv-filter-content1').addClass('d-none')
                }

            }
            else if (slt == "3" && loaitimkiem == "xq") {
                if (!($('#adv-filter-content2').hasClass('d-none'))) {
                    $('#adv-filter-content2').addClass('d-none')
                }
            }
        });
        $('#filter-btn').on('click', async function () {
            var tuyen = $("#tuyenDuongAdd").val();
            var thamxanh1 = $("#thamxanh").val();
            var giatri = $("#search-input").val()
            const type = $('#filter-type-slt').val();
            const loaitimkiem = $('#lopchuyende').val();
            //const tenthamxanh = $('#tenthamxanh').val();
            //const tenmatnuoc = $('#tenmatnuoc').val();
            const loaithamxanh = $("#loaithamxanh").val()
            const khuvuc = $("#khudiTichAdd1").val()
            const khuvuc2 = $("#khudiTichAdd2").val()
            if (type == "nc" && loaitimkiem == "1") {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: `${APIURL}/api/CayXanhApi/cayxanhthongke?&matuyen=${tuyen}&maThamXanh=${thamxanh1}&tenCay=${giatri}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType: "json",
                    success: function (data) {
                        renderResult(data.value)
                        //$('#filter-slider').toggleClass('toggle-display');
                        //$('#result-slider').toggleClass('toggle-display');
                        $('#result-sidebar-header').toggleClass('toggle-display');
                        $('#filter-btn').removeClass('disabled')
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            }
            else if (type == "nc" && loaitimkiem == "2") {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: `${APIURL}/api/ThongTinThamXanhApi/DanhSach?TuKhoa=${giatri}&IDKhuVuc=${khuvuc}&Loaicq=${loaithamxanh}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType: "json",
                    success: function (data) {
                        renderThamXanh(data)
                        /*renderResult(data.value)*/
                        //$('#filter-slider').toggleClass('toggle-display');
                        //$('#result-slider').toggleClass('toggle-display');
                        $('#result-sidebar-header').toggleClass('toggle-display');
                        $('#filter-btn').removeClass('disabled')
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            }
            else if (type == "nc" && loaitimkiem == "3") {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: `${APIURL}/api/ThongTinMatNuocApi/DanhSach?TuKhoa=${giatri}&IDKhuVuc=${khuvuc2}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    dataType: "json",
                    success: function (data) {
                        renderMatNuoc(data)
                        /*renderResult(data.value)*/
                        //$('#filter-slider').toggleClass('toggle-display');
                        //$('#result-slider').toggleClass('toggle-display');
                        $('#result-sidebar-header').toggleClass('toggle-display');
                        $('#filter-btn').removeClass('disabled')
                    },
                    error: function (err) {
                        console.log(err)
                    }
                });
            }

            else if (type == "xq") {

                var lopchuyende = $("#lopchuyende").val()
                var bankinh = $("#bk-input").val()

                if (lopchuyende == 1) {
                    locateBtn.locate()
                        .then(function (pos) {
                            var { latitude: curLat, longitude: curLong } = pos.coords
                            var locationData = `{ "x": ${curLong}, "y": ${curLat}, "spatialReference": { "wkid": 4326 } }`;
                            var form = new FormData();
                            form.append("where ", "1=1");
                            form.append("geometry", `${locationData}`);
                            form.append("geometryType", "esriGeometryPoint");
                            form.append("inSR", "4326");
                            form.append("spatialRel", "esriSpatialRelIntersects");
                            form.append("distance", `${bankinh}`);
                            form.append("units", "esriSRUnit_Meter");
                            form.append("outFields", "*");
                            form.append("f", "pjson");
                            form.append("outSR", "4326");
                            $.ajax({
                                "url": "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/0/query",
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "dataType": "json",
                                "data": form,
                                success: function (data) {
                                    renderResult1(data.features)
                                    //$('#filter-slider').toggleClass('toggle-display');
                                    //$('#result-slider').toggleClass('toggle-display');
                                    $('#result-sidebar-header').toggleClass('toggle-display');
                                    $('#filter-btn').removeClass('disabled')
                                },
                                error: function (err) {
                                    console.log(err)
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                            routerFlag = false;
                            alert('Cần cấp quyền cần thiết để sử dụng chức năng này!');
                        })
                }
                else if (lopchuyende == 2) {
                    locateBtn.locate()
                        .then(function (pos) {
                            var { latitude: curLat, longitude: curLong } = pos.coords
                            var locationData = `{ "x": ${curLong}, "y": ${curLat}, "spatialReference": { "wkid": 4326 } }`;
                            var form = new FormData();
                            form.append("where ", `loaicq=2`);
                            form.append("geometry", `${locationData}`);
                            form.append("geometryType", "esriGeometryPoint");
                            form.append("inSR", "4326");
                            form.append("spatialRel", "esriSpatialRelIntersects");
                            form.append("distance", `${bankinh}`);
                            form.append("units", "esriSRUnit_Meter");
                            form.append("outFields", "*");
                            form.append("f", "pjson");
                            form.append("outSR", "4326");
                            $.ajax({
                                "url": "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/1/query",
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "dataType": "json",
                                "data": form,
                                success: function (data) {
                                    console.log(data)
                                    renderResult2(data.features)
                                    //$('#filter-slider').toggleClass('toggle-display');
                                    //$('#result-slider').toggleClass('toggle-display');
                                    $('#result-sidebar-header').toggleClass('toggle-display');
                                    $('#filter-btn').removeClass('disabled')
                                },
                                error: function (err) {
                                    console.log(err)
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                            routerFlag = false;
                            alert('Cần cấp quyền cần thiết để sử dụng chức năng này!');
                        })
                }
                else if (lopchuyende == 3) {
                    console.log(123)
                    locateBtn.locate()
                        .then(function (pos) {
                            var { latitude: curLat, longitude: curLong } = pos.coords
                            var locationData = `{ "x": ${curLong}, "y": ${curLat}, "spatialReference": { "wkid": 4326 } }`;
                            var form = new FormData();
                            form.append("where ", `loaicq=1`);
                            form.append("geometry", `${locationData}`);
                            form.append("geometryType", "esriGeometryPoint");
                            form.append("inSR", "4326");
                            form.append("spatialRel", "esriSpatialRelIntersects");
                            form.append("distance", `${bankinh}`);
                            form.append("units", "esriSRUnit_Meter");
                            form.append("outFields", "*");
                            form.append("f", "pjson");
                            form.append("outSR", "4326");
                            $.ajax({
                                "url": "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/1/query",
                                "method": "POST",
                                "timeout": 0,
                                "processData": false,
                                "mimeType": "multipart/form-data",
                                "contentType": false,
                                "dataType": "json",
                                "data": form,
                                success: function (data) {
                                    console.log(data)
                                    renderResult3(data.features)
                                    //$('#filter-slider').toggleClass('toggle-display');
                                    //$('#result-slider').toggleClass('toggle-display');
                                    $('#result-sidebar-header').toggleClass('toggle-display');
                                    $('#filter-btn').removeClass('disabled')
                                },
                                error: function (err) {
                                    console.log(err)
                                }
                            });
                        })
                        .catch((error) => {
                            console.log(error)
                            routerFlag = false;
                            alert('Cần cấp quyền cần thiết để sử dụng chức năng này!');
                        })
                }
            }

        });
        document.getElementById('result-sidebar-header').addEventListener('click', evt => {
            document.querySelector('#filter-slider').classList.toggle('toggle-display');
            document.querySelector('#result-slider').classList.toggle('toggle-display');
        })

        //document.getElementById('btn-close-modal').addEventListener('click', evt => {
        //    document.querySelector('#filter-slider').classList.toggle('toggle-display');
        //    document.querySelector('#result-slider').classList.toggle('toggle-display');
        //})
        /*************************
         * Create a point graphic
         *************************/

        // First create a point geometry (this is the location of the Titanic)
        //const point = {
        //    type: "point", // autocasts as new Point()
        //    longitude: 107.58370200120633,
        //    latitude: 16.467182145933005,
        //};

        //// Create a symbol for drawing the point
        //const markerSymbol = {
        //    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        //    color: [226, 119, 40],
        //    outline: {
        //        // autocasts as new SimpleLineSymbol()
        //        color: [255, 255, 255],
        //        width: 2,
        //    },
        //};

        //// Create a graphic and add the geometry and symbol to it
        //const pointGraphic = new Graphic({
        //    geometry: point,
        //    symbol: markerSymbol,
        //});

        /****************************
         * Create a polyline graphic
         ****************************/

        // First create a line geometry (this is the Keystone pipeline)
        //const polyline = {
        //    type: "polyline", // autocasts as new Polyline()
        //    paths: [
        //        [-111.3, 52.68],
        //        [-98, 49.5],
        //        [-93.94, 29.89],
        //    ],
        //};

        //// Create a symbol for drawing the line
        //const lineSymbol = {
        //    type: "simple-line", // autocasts as SimpleLineSymbol()
        //    color: [226, 119, 40],
        //    width: 4,
        //};

        //// Create an object for storing attributes related to the line
        //const lineAtt = {
        //    Name: "Keystone Pipeline",
        //    Owner: "TransCanada",
        //    Length: "3,456 km",
        //};

        /*******************************************
         * Create a new graphic and add the geometry,
         * symbol, and attributes to it. You may also
         * add a simple PopupTemplate to the graphic.
         * This allows users to view the graphic's
         * attributes when it is clicked.
         ******************************************/
        //const polylineGraphic = new Graphic({
        //    geometry: polyline,
        //    symbol: lineSymbol,
        //    attributes: lineAtt,
        //    popupTemplate: {
        //        // autocasts as new PopupTemplate()
        //        title: "{Name}",
        //        content: [
        //            {
        //                type: "fields",
        //                fieldInfos: [
        //                    {
        //                        fieldName: "Name",
        //                    },
        //                    {
        //                        fieldName: "Owner",
        //                    },
        //                    {
        //                        fieldName: "Length",
        //                    },
        //                ],
        //            },
        //        ],
        //    },
        //});

        /***************************
         * Create a polygon graphic
         ***************************/

        // Create a polygon geometry
        //const polygon = {
        //    type: "polygon", // autocasts as new Polygon()
        //    rings: [
        //        [-64.78, 32.3],
        //        [-66.07, 18.45],
        //        [-80.21, 25.78],
        //        [-64.78, 32.3],
        //    ],
        //};

        //// Create a symbol for rendering the graphic
        //const fillSymbol = {
        //    type: "simple-fill", // autocasts as new SimpleFillSymbol()
        //    color: [227, 139, 79, 0.8],
        //    outline: {
        //        // autocasts as new SimpleLineSymbol()
        //        color: [255, 255, 255],
        //        width: 1,
        //    },
        //};

        //// Add the geometry and symbol to a new graphic
        //const polygonGraphic = new Graphic({
        //    geometry: polygon,
        //    symbol: fillSymbol,
        //});

        //// Add the graphics to the view's graphics layer
        //view.graphics.addMany([pointGraphic, polylineGraphic, polygonGraphic]);

        $("#dropdown-menu1 input").on("click", function (e) {
            map.basemap = e.target.value;
        });
        $("#dropdown-menu2 input").on("click", function (e) {
            if (this.checked) {
                const foundLayer = map.allLayers.find(function (layer) {
                    return layer.id === e.target.value;
                });
                foundLayer.visible = true;
            } else {
                const foundLayer = map.allLayers.find(function (layer) {
                    return layer.id === e.target.value;
                });
                foundLayer.visible = false;
            }
        });

        $("#dropdown-menu3 input").on("click", function (e) {
            var yourArray = [];
            $("input:checkbox[name=fav_language1]:checked").each(function () {
                yourArray.push($(this).val());
            });
            const dk = yourArray.join(",");
            const ex = `LoaiCay in (${dk})`;
            if (this.checked) {
                const foundLayer = map.allLayers.find(function (layer) {
                    return layer.id === "0";
                });
                foundLayer.definitionExpression = ex;
            } else {
                const foundLayer = map.allLayers.find(function (layer) {
                    return layer.id === "0";
                });
                foundLayer.definitionExpression = ex;
            }
        });
        
    });
});
//function resize() {

//    var imgSanPham = $('#viewDiv').width();
//    var heightImgSanPham = $('#viewDiv');
//    var heightsImgSanPham = imgSanPham / 2.2;
//    for (var i = 0; i < heightImgSanPham.length; i++) {
//        heightImgSanPham[i].style.height = heightsImgSanPham + "px";
//    }
//}

//window.addEventListener("resize", resize);
//window.onresize = function () {
//    resize();
//};
//resize();



