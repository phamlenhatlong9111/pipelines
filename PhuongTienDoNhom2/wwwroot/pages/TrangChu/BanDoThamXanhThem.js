// ĐƯỜNG DẪN MẶC ĐỊNH
var url = window.location;
// URL API
var APIURL = url.protocol + "//" + url.hostname + ":" + url.port;
$(document).ready(function () {
    let toadoservice = [];
    let toadodatabase = [];
    require([
        "esri/config",
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Editor",
        "esri/Graphic",
        "esri/widgets/Editor/CreateFeaturesWorkflow",
        "esri/layers/FeatureLayer",
        "esri/geometry/Polygon",
        "esri/geometry/SpatialReference",
        "esri/geometry/projection",
    ], (
        esriConfig,
        Map,
        MapView,
        Editor,
        Graphic,
        CreateFeaturesWorkflow,
        FeatureLayer,
        Polygon,
        SpatialReference,
        projection
    ) => {
        esriConfig.apiKey =
            "AAPK6201e582c47049328317d0486b1db07fPDIxl9irYLz6FgwVp10GjuL4K84vCgcpQpCnzpWGwRhaEVxieRmOGrXXdUCWFdpD";
        const myParkFeatureLayer = new FeatureLayer({
            url: "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/1",
            id: "1",
            outFields: ["*"],
            //customParameters: {
            //    "loaicq": 2
            //}
            definitionExpression: "loaicq = 2 OR loaicq = 3"
        });

        const map = new Map({
            basemap: "arcgis-streets", // Basemap layer service
            layers: [myParkFeatureLayer],
        });

        console.log(map);

        const view = new MapView({
            center: [107.58370200120633, 16.467182145933005],
            container: "viewDiv",
            map: map,
            zoom: 15,
        });

        const editorSelect = new Editor({
            view: view,
        });

        // Add the widget to the view
        view.ui.add(editorSelect, "top-right");

        editorSelect.viewModel.watch("state", function (state) {
            if (state === "creating-features") {

                editorSelect.viewModel.activeWorkflow.pendingFeatures.watch(
                    "length",
                    function (a) {
                        if (a > 0) {
                            //console.log('editorSelect.activeWorkflow', editorSelect.activeWorkflow)
                            let creaInfo = null;
                            if (
                                editorSelect.activeWorkflow.data.creationInfo.template
                                    .drawingTool == "polygon"
                            ) {
                                let ringLatLng = null;
                                //console.log('creaInfo',creaInfo);
                                const ring =
                                    editorSelect.activeWorkflow.pendingFeatures.items[0]
                                        .geometry.rings[0];

                                creaInfo = editorSelect.activeWorkflow.data.creationInfo;
                                editorSelect.cancelWorkflow();
                                //console.log("ring", ring);
                                //console.log(creaInfo);
                                let polygon = new Polygon(
                                    ring,
                                    new SpatialReference({
                                        wkid: 102100,
                                    })
                                );

                                let outSpatialReference = new SpatialReference({
                                    wkid: 32648,
                                });

                                let outlatSpatialReference = new SpatialReference({
                                    wkid: 4326,
                                });

                                projection.load().then(function () {
                                    //console.log(polygon);
                                    const res = projection.project(
                                        polygon,
                                        outSpatialReference
                                    );
                                    //console.log("res", res);
                                    ringLatLng = res.rings[0];
                                    //console.log(ringLatLng);
                                    toadoservice = ringLatLng;
                                    if (ringLatLng && creaInfo) {
                                        const polyg = {
                                            type: "polygon",
                                            rings: ringLatLng,
                                            z: undefined,
                                            hasZ: false,
                                        };
                                        //console.log('polyg',polyg)
                                        let attr = creaInfo.template.prototype.attributes;
                                        attr.tenditich = "";
                                        let now = new Date();
                                        attr.ghichu = '';
                                        attr.loaicq = 1;
                                        attr.diachi = '';
                                        attr.dientich = 0;

                                        attr.Polygon = ringLatLng;

                                        let editFeature = new Graphic({
                                            geometry: polyg,
                                            attributes: creaInfo.template.prototype.attributes,
                                        });

                                        const edits = {
                                            addFeatures: [editFeature],
                                        };

                                        creaInfo.layer
                                            .applyEdits(edits)
                                            .then((res) => {
                                                creaInfo = null;
                                                editorSelect.visible = true;
                                            })
                                            .catch((error) => {
                                                console.log("error = ", error);
                                            });
                                        //kiemtra = true;
                                    }

                                    const res1 = projection.project(
                                        polygon,
                                        outlatSpatialReference
                                    );
                                    toadodatabase = res1.rings[0];
                                    //console.log('latlong', res1.rings[0])
                                });

                                $('#modalThongTinAdd').modal('show');

                                setTimeout(function () {
                                    $.ajax({
                                        "url": "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/1/query?where=1%3D1&outFields=*&orderByFields=objectid_1+asc&returnTrueCurves=false&f=json",
                                        "method": "GET",
                                        "timeout": 0,
                                        "headers": {
                                            "Cookie": "AGS_ROLES=\"419jqfa+uOZgYod4xPOQ8Q==\""
                                        },
                                        success: function (data) {
                                            //console.log('datagetid', data)
                                            let lengthfeatures = data.features.length - 1;
                                            objectidnew = data.features[lengthfeatures].attributes.objectid_1;
                                            console.log('objectidnewajax', objectidnew)
                                            console.log('toadoservice', toadoservice);
                                            console.log('toadodatabase', toadodatabase);
                                        },
                                        error: function (error) {
                                        }
                                    })
                                }, 1000);
                            }

                        }

                    }
                );
            }
        });
    });
    //$('#btn-save').on('click', function () {
    //    console.log('toadoservice', toadoservice);
    //    console.log('toadodatabase', toadodatabase);
    //})

})