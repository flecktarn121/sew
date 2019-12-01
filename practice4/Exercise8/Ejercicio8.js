class MeteorologicalAnalyzer {
    constructor(){
        //var cities = ["Oviedo", "Mieres", "Gijon", "Aviles", "Langreo"];
        var cities = ["Oviedo"];
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
            var query ="api.openweathermap.org/data/2.5/weather?q=";
            query += city.toString() + "&units=metric&lang=es&APPID=" + apiKey;
            $.getJSON(query, function(jsonData){
                // Now we iterate the processed JSON
                var data = "<section>";
                for (var info in jsonData.list[0]) {
                    data += "<h2>" + info.name + "</h2>";
                    for (var climate in info.weather) {
                        data += "<p>" + climate.main + "</p>";
                        data += "<p>" + climate.description + "</p>";
                    }

                    data += "<ul>"
                    data += "<li>Temperatura: " + info.main.temp + "ºC ";
                    data += "(min " + info.main.temp_min + ", max: " + info.main.temp_max + ")</li>";
                    data += "<li>Humedad: " + info.main.humidity +"%</li>";
                    data += "<li>Presión: " + info.main.pressure + "Pa</li>";
                    data += "<li>Nubosidad: " + info.clouds.all + "%</li>";
                    data += "<li>Lluvias: " + info.rain + "%</li>";
                    data += "<li>Nieves: " + info.snow + "%</li>";
                    data += "</ul>";
                }
                data += "</section>";

                // Add it to the DOM tree
                $("main").append(data);
            }).fail(function() {
                alert("Imposible recuperar los datos");
            });
        });
    }
}
