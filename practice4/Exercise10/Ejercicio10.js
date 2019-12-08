class CurrencyExchanger {
    constructor(){
        var that = this;
    }
    writeData() {
        var ammount = this.getAmmount();
        if (ammount < 0 || isNaN(ammount)) {
            alert("Introduzca una cantidad válida");
            return;
        }
        // Call the API, and then manipulate the processed JSON in the callback
        var query = "https://data.fixer.io/api/latest?access_key=5711617e09a0eda074eda9afd34f0c87&format=1";
        $.getJSON(query, function(jsonData){
            // Now we iterate the processed JSON
            var data = "";
                data += "<li>Dólares: " + ammount * jsonData.rates.USD + "</li>";
                data += "<li>Rublos: " + ammount * jsonData.rates.RUB + "</li>";
                data += "<li>Yuanes: " + ammount * jsonData.rates.CNY + "</li>";
                data += "<li>Libras esterlinas: " + ammount * jsonData.rates.GBP + "</li>";
                data += "<li>Yenes: " + ammount * jsonData.rates.JPY+ "</li>";

            // Add it to the DOM tree
            $(".list").html(data);
        }).fail(function() {
            alert("Imposible recuperar los datos");
        });
    }

    getAmmount() {
        var ammount = $(".input").val();
        if (isNaN(ammount)) {
            return -1;
        } else {
            return parseFloat(ammount);
        }
    }
}

var ce;
window.addEventListener("load", function() {
    ce = new CurrencyExchanger();
})
