class KMLManager {

    constructor() {
        this.content;
    }

    initializeMap() {
        var oviedo = {lat: 43.3672702, lng: -5.8502461};
        var mapaOviedo = new google.maps.Map(document.getElementById('map'),{zoom: 8,center:oviedo});
        var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }

    displayKML() {
        var kml = "https://raw.githubusercontent.com/flecktarn121/sew/master/practice4/Exercise14/tarea1/rutas.kml";

        //kml = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(-19.257753, 146.823688),
            zoom: 2,
            mapTypeId: 'terrain'
        });

        var kmlLayer = new google.maps.KmlLayer(kml, {
            suppressInfoWindows: true,
            preserveViewport: false,
            map: map
        });
        kmlLayer.addListener('click', function(event) {
            var content = event.featureData.infoWindowHtml;
            var testimonial = document.getElementById('capture');
            testimonial.innerHTML = content;
        });
    }

}
var km = new KMLManager();
