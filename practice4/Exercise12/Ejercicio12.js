class Geolocalizator {

    constructor() {
        this.latitude = null;
        this.longitude = null;
    }

    getPosition() {
        if(navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(this.display, this.showErrors);
        } else {
            alert("El navegador no soporto geolocalización.")
        }
    }

    display(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        var coordinates = "<li>Latitud: " + this.latitude + "</li>";
        coordinates += "<li>Longitud: " + this.longitude + "</li>";
        document.getElementById("coordenadas").innerHTML = coordinates;
    }

    showErrors(error) {
        alert("Ha ocurrido un error: " + error.code + " " + error.message);
    }
}
var geolocalizator = new Geolocalizator();
