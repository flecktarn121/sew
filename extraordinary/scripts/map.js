class MapManager {
    constructor() {
        this._this = this;
    }


    initializeMap() {
        let directionsService = new google.maps.DirectionsService();
        let directionsRenderer = new google.maps.DirectionsRenderer();
        let map = new google.maps.Map(document.getElementById('map-canvas'), {
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
    }

    /**
    * EXAM MODIFICATION
    */
    route2Oviedo() {
        let directionsService = new google.maps.DirectionsService();
        let directionsRenderer = new google.maps.DirectionsRenderer();
        let map = new google.maps.Map(document.getElementById('map-canvas'), {
            zoom: 7,
            center: {lat: 43.389139, lng: -5.659215}
        });

        directionsRenderer.setMap(map);
        let travelMode = "DRIVING";
        let request = {
            origin: {lat: 43.3619145, lng:  -5.8493887},
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
    }
}

let mm = new MapManager();
