class CurrencyExchanger {
    constructor(){
        var that = this;
        // Wait until the document is loaded
        $(document).ready(function() {
            that.writeData();
        });
    }
    writeData() {
        // Call the API, and then manipulate the processed JSON in the callback
        var query = "http://data.fixer.io/api/latest?access_key=5711617e09a0eda074eda9afd34f0c87&format=1";
        $.getJSON(query, function(jsonData){
            console.log(jsonData);
            // Now we iterate the processed JSON
            var data = "<ul>";
            for (var info in jsonData.list[0]) {
                data += "<li>Dólares: " + info.rates.USD + "</li>";
                data += "<li>Rublos: " + info.rates.RUB + "</li>";
                data += "<li>Yuanes: " + info.rates.CNY + "</li>";
                data += "<li>Libras esterlinas: " + info.rates.GBP + "</li>";
                data += "<li>Yenes: " + info.rates.JPY+ "</li>";
            }
            data += "</ul>";

            // Add it to the DOM tree
            $(".main").append(data);
        }).fail(function() {
            alert("Imposible recuperar los datos");
        });
    }
}
