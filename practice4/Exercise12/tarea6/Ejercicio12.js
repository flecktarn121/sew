class MapManager{

    getPosition() {
        var latitude = document.getElementById("latitud").value;
        var longitude= document.getElementById("longitud").value;
        var lat = parseFloat(latitude);
        var lon = parseFloat(longitude);
        var validCoordinates = !isNaN(lat) && lat <= 90 && lat >= -90;
        validCoordinates &= !isNaN(lon) && lon <= 90 && lon >= -90;
        if (validCoordinates) {
            var mapOptions = {
                zoom:  8,
                center: {lat: parseFloat(latitude), lng: parseFloat(longitude)}
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        } else {
            alert("Coordenadas inválidas");
        }
    }

    initializeMap(){
            var oviedo = {lat: 43.3672702, lng: -5.8502461};
            var mapaOviedo = new google.maps.Map(document.getElementById('map-canvas'),{zoom: 8,center:oviedo});
            var marcador = new google.maps.Marker({position:oviedo,map:mapaOviedo});
    }

}



//The variable needs to be declared outside. JS, i hate you so much
var mm = new MapManager();
