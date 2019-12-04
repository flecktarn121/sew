class GeoJSONManager {

    constructor() {
        this.content;
    }

    loadFile() {
        var file = document.getElementById("file").files[0];
        var reader = new FileReader();
        var contentGeoJSONManager;
        var _this = this;
        reader.onload = (x) => _this.displayKML(reader.result);
        reader.readAsText(file);
    }

    initializeMap(){
        var oviedo = {lat: 43.3672702, lng: -5.8502461};
        var mapaOviedo = new google.maps.Map(document.getElementById('map'),{zoom: 8,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }
    displayKML(kml) {

        var data = JSON.parse(kml);

        if (kml == "") {
            alert("No se ha cargado un archivo KML");
            return;
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(-19.257753, 146.823688),
            zoom: 2,
            mapTypeId: 'terrain'
        });
        map.data.addGeoJson(data);
    }

}
var km = new GeoJSONManager();
