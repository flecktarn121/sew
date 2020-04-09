class MapManager{

    initializeMap(){
        window.navigator.geolocation.getCurrentPosition(
            (pos) => alert(pos.coords),
            (err) => alert(err.message)
        );
        /*
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 7,
            center: {lat: 43.389139, lng: -5.659215}
        });
        directionsRenderer.setMap(map);
            window.navigator.geolocation.getCurrentPosition(function(position) {
                let travelMode = "DRIVING";
                let request = {
                    origin: {lat: position.coords.latitude, lng: position.coords.longitude},
                    destination: {lat: 43.389139, lng: -5.659215},
                    travelMode: travelMode
                };
                directionsService.route(request, function(response, isSuccess){
                    if (isSuccess === "OK") {
                        directionsRenderer.setDirections(response);
                    } else {
                        window.alert("Hubo un problema al cargar la ruta al IES Rio Nora.")
                    }
                });
            },
                function(err) {
                    window.alert(err.message);
                });
                */
    }
}


//The variable needs to be declared outside. JS, i hate you so much
var mm = new MapManager();
