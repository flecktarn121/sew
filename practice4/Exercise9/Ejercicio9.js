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
            query += city.toString() + "&mode=xml&units=metric&lang=es&APPID=" + apiKey;
            $.get(query, function(xmlData){
                var data = "<section>";
                // Now we iterate the processed JSON
                let $info = $(this);
                data += "<h2>" + $("city", xmlData).attr("name") + "</h2>";
                data += "<p>" + $("weather", xmlData).attr("value") + "</p>";

                data += "<ul>"
                data += "<li>Temperatura: " + $("temperature", xmlData).attr("value") + "ºC ";
                data += "(min " + $("temperature", xmlData).attr("min") + ", max: " + $("temperature", xmlData).attr("max") + ")</li>";
                data += "<li>Humedad: " + $("humidity", xmlData).attr("value") +"%</li>";
                data += "<li>Presión: " + $("pressure", xmlData).attr("value") + "Pa</li>";
                data += "<li>Nubosidad: " + $("clouds", xmlData).attr("value")+ "%</li>";
                data += "</ul>";
                data += "</section>";

                // Add it to the DOM tree
                $(".main").append(data);
            }).fail(function() {
                alert("Imposible recuperar los datos");
            });
        });
    }
}
