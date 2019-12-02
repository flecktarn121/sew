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
            query += city.toString() + "&mode=xml&units=metric&lang=es&APPID=" + apiKey;
            $.get(query, function(xmlData){
                var data = "<section>";
                console.log(xmlData);
                // Now we iterate the processed XML using Jquery
                let $info = $(this);
                data += "<h2>" + $("city", xmlData.documentElement).attr("name") + "</h2>";
                data += "<p>" + $("weather", xmlData.documentElement).attr("value") + "</p>";
                data += "<ul>"
                data += "<li>Temperatura: " + $("temperature", xmlData.documentElement).attr("value") + "ºC ";
                data += "(min " + $("temperature", xmlData.documentElement).attr("min") + ", max: " + $("temperature", xmlData.documentElement).attr("max") + ")</li>";
                data += "<li>Humedad: " + $("humidity", xmlData.documentElement).attr("value") +"%</li>";
                data += "<li>Presión: " + $("pressure", xmlData.documentElement).attr("value") + "Pa</li>";
                data += "<li>Nubosidad: " + $("clouds", xmlData.documentElement).attr("value")+ "%</li>";
                data += "</ul>";
                data += "<img src=http://openweathermap.org/img/w/" + $("weather", xmlData.documentElement).attr("icon") + ".png alt=" + $("wheather", xmlData.documentElement).attr("value") + ">";
                data += "</section>";

                // Add it to the DOM tree
                $("main").append(data);
            }).fail(function() {
                alert("Imposible recuperar los datos");
            });
        });
    }
}
