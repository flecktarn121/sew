class Geolocalizator {
    getPosition() {
        if(navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(this.display, this.showErrors);
        } else {
            alert("El navegador no soporto geolocalización.")
        }
    }

    display(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = "<li>Latitud: " + latitude + "</li>";
        coordinates += "<li>Longitud: " + longitude + "</li>";
        document.getElementById("coordenadas").innerHTML = coordinates;
    }

    showErrors(error) {
        alert("Ha ocurrido un error: " + error.code + " " + error.message);
    }


}


//The variable needs to be declared outside. JS, i hate you so much
var geolocalizator;
window.addEventListener("load", function() {
    geolocalizator = new Geolocalizator();
});
