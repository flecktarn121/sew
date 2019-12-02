class MeteorologicalAnalyzer {
    constructor(){
        var cities = ["Oviedo", "Mieres", "Gijon", "Aviles", "Langreo"];
        var that = this;
        // Wait until the document is loaded
        $(document).ready(function() {
            that.writeData(cities);
        });
    }

    writeData(cities) {
        cities.forEach(function(city) {
            // Call the API, and then manipulate the processed JSON in the callback
            var apiKey = "47b790fd0fc41878c80c57c9846132cb";
            var query ="https://api.openweathermap.org/data/2.5/weather?q=";
            query += city.toString() + "&units=metric&lang=es&APPID=" + apiKey;
            $.getJSON(query, function(jsonData){
                // Now we iterate the processed JSON
                var data = "<section>";
                console.log(jsonData);
                data += "<h2>" + jsonData.name + "</h2>";
                data += "<p>" + jsonData.weather[0].description + "</p>";
                data += "<ul>"
                data += "<li>Temperatura: " + jsonData.main.temp + "ºC ";
                data += "(min " + jsonData.main.temp_min + ", max: " + jsonData.main.temp_max + ")</li>";
                data += "<li>Humedad: " + jsonData.main.humidity +"%</li>";
                data += "<li>Presión: " + jsonData.main.pressure + "Pa</li>";
                data += "</ul>";
                data += "<img src=http://openweathermap.org/img/w/" + jsonData.weather[0].icon + ".png alt=" + jsonData.weather[0].description + ">";
                data += "</section>";
                console.log(data)
                // Add it to the DOM tree
                $("main").append(data);
            }).fail(function() {
                alert("Imposible recuperar los datos");
            });
        });
    }
}
