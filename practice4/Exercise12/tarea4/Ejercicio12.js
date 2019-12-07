class MapManager{

    initializeMap(){
            var paco = {lat: 40.536622, lng: -3.786506};
            var mapa = new google.maps.Map(document.getElementById('map-canvas'),{zoom: 8,center:paco});
            var marcador = new google.maps.Marker({position:paco,map:mapa});
    }

}



//The variable needs to be declared outside. JS, i hate you so much
var mm = new MapManager();
