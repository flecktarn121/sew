class MapGenerator {
    getUserPosition() {
        if(navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(this.display);
        } else {
            alert("Su navegador no soporta geolocalización.")
        }
    }

    generateDirectionRequest(origin, travelMode){
        let request = {
            origin: {lat: origin.coords.latitude, lng: origin.coords.longitude},
            destination: {lat: 43.389139, lng: -5659215},
            travelMode: travelMode
        };

        return request;
    }

    initializeMap(){
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: {lat: 43.389139, lng: -5659215}
        });
        directionsRenderer.setMap(map);
    }

    generateRoute(){
        let start = getUserPosition();
        let travelMode = "DRIVING";
        request = generateDirectionRequest(start, travelMode);
        directionsService.route(request, function(response, isSuccess){
            if (isSuccess === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Hubo un problema al cargar la ruta al IES Rio Nora.")
            }
        });
    }

}


//The variable needs to be declared outside. JS, i hate you so much
var mapGenerator;
window.addEventListener("load", function() {
    mapGenerator = new MapGenerator();
});
