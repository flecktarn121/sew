class MeteorologicalAnalyzer {

    writeData() {
        // Call the API, and then manipulate the processed JSON in the callback
        var apiKey = "47b790fd0fc41878c80c57c9846132cb";
        var query ="https://api.openweathermap.org/data/2.5/weather?q=";
        query += "Siero&units=metric&lang=es&APPID=" + apiKey;
        $.getJSON(query, function(jsonData){
            // Now we iterate the processed JSON
            let data = "<h2>El tiempo</h2>";
            data += "<p>" + jsonData.weather[0].description + "</p>";
            data += "<ul>"
            data += "<li>Temperatura: " + jsonData.main.temp + "ºC ";
            data += "(min " + jsonData.main.temp_min + ", max: " + jsonData.main.temp_max + ")</li>";
            data += "<li>Humedad: " + jsonData.main.humidity +"%</li>";
            data += "<li>Presión: " + jsonData.main.pressure + "Pa</li>";
            data += "</ul>";
            data += "<img src=http://openweathermap.org/img/w/" + jsonData.weather[0].icon + ".png alt=" + jsonData.weather[0].description + ">";
            // Add it to the DOM tree
            $("aside").append(data);
        }).fail(function() {
            alert("Imposible recuperar los datos meteorológicos");
        });
    }
}

let meteo;
window.onload=function() {
    meteo = new MeteorologicalAnalyzer();
    meteo.writeData();
};
