class MapManager{
    initializeMap(){
        if (navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(function(position) {

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var mapPos = new google.maps.Map(document.getElementById('map-canvas'),{zoom: 8,center:pos});
                var marker = new google.maps.Marker({position: pos, map: mapPos});
            }, function(error) {
                alert("Ha ocurrido un error: " + error.code + " " + error.message);
            });
        } else {
            alert("Geolocalización no soportada por el navegador")
        }
    }

}

//The variable needs to be declared outside. JS, i hate you so much
var mm = new MapManager();
