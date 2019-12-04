class Geolocalizator {
    getPosition() {
        if(navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition(this.display, this.showErrors);
        } else {
            alert("El navegador no soporto geolocalización.")
        }
    }

    display(position) {
        // Show coordinates
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var coordinates = "<li>Latitud: " + latitude + "</li>";
        coordinates += "<li>Longitud: " + longitude + "</li>";
        document.getElementById("coordenadas").innerHTML = coordinates;

        //Display map
        var url = "https://maps.googleapis.com/maps/api/staticmap?center=";
        url += position.coords.latitude;
        url += "," + position.coords.longitude;
        url += "&zoom=12&size=400x400&sensor=false&markers=";
        url += position.coords.latitude;
        url += "," + position.coords.longitude;
        url += "&key=AIzaSyDAtch896ABia80LAOvdVoZ6ERhVFcJ5sg";
        document.getElementById("mapa").setAttribute("src", url);
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
