let lat;
let lon;
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/FeatureLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Search",
    "esri/rest/locator",
    "esri/widgets/Locate",
], (
    esriConfig,
    Map,
    MapView,
    Graphic,
    FeatureLayer,
    BasemapToggle,
    Search,
    locator,
    Locate,
) => {
    esriConfig.apiKey =
        "AAPK6201e582c47049328317d0486b1db07fPDIxl9irYLz6FgwVp10GjuL4K84vCgcpQpCnzpWGwRhaEVxieRmOGrXXdUCWFdpD";
    const url =
        "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
    const myTreesFeatureLayer = new FeatureLayer({
        url: "https://gishue.thuathienhue.gov.vn/server/rest/services/BanDoDuLich_HueCIT/CayXanh_CQ_DuLich/FeatureServer/0",
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
        zoom: 15,
    });
    const toogleBaseMap = new BasemapToggle({
        view: view,
        nextBasemap: "satellite",
    });

    view.ui.add(toogleBaseMap, "bottom-left");

    const search = new Search({
        view: view,
        // resultGraphicEnabled: false,
        popupEnabled: false,
    });

    view.ui.add(search, "top-right");
    let locateBtn = new Locate({
        view: view, // Attaches the Locate button to the view
        graphic: new Graphic({
            symbol: { type: "simple-marker" }, // overwrites the default symbol used for the
            // graphic placed at the location of the user when found
        }),
    });

    view.ui.add(locateBtn, "top-right");
    let latValue;
    let longValue;
    locateBtn.on("locate", function (event) {
        const coordinates = event.position.coords;
        lat = coordinates.latitude;
        lon = coordinates.longitude;
        const data = { lat, lon };
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
    });
    search.on("search-complete", function (event) {
        // Kiểm tra xem có kết quả tìm kiếm không
        if (event.numResults > 0) {
            const result = event.results[0]; // Lấy kết quả đầu tiên (có thể có nhiều kết quả)
            // Lấy tọa độ từ kết quả tìm kiếm
            lat = result.results[0].feature.geometry.latitude;
            lon = result.results[0].feature.geometry.longitude;

            // Sử dụng lat và long theo nhu cầu của bạn
            /*alert("Latitude: " + lat + ", Longitude: " + lon);*/
        }
    });



    view.popup.autoOpenEnabled = false;

    view.on("click", function (event) {
        lat = event.mapPoint.latitude;
        lon = event.mapPoint.longitude;

        const data = { lat, lon };
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
        // view.openPopup({
        //     // Set the popup's title to the coordinates of the location
        //     // title: "Reverse geocode: [" + lon + ", " + lat + "]",
        //     title: \`Vĩ độ: \${lat}, Kinh độ: \${lon}\`,
        //     location: event.mapPoint, // Set the location of the popup to the clicked location
        // });
        const params = {
            location: event.mapPoint,
        };
        locator
            .locationToAddress(url, params)
            .then((response) => {
                // If an address is successfully found, show it in the popup's content
                view.popup.content = response.address;
            })
            .then(() => {
                search.search(
                    `${event.mapPoint.latitude},${event.mapPoint.longitude}`
                );
              })
              .catch(() => {
                // If the promise fails and no result is found, show a generic message
                view.popup.content = "No address was found for this location";
              });
          }); 
          document.addEventListener("message", message => {
          
            data1 = JSON.parse(message.data) 
            lat = data1.latitude;
            lon = data1.longitude;
            search.search(
              `${lat}, ${lon}`
            );
            const data = { lat, lon };
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
           
          });         
        });