class CryptoCurrencyExchanger {
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
        var query = "http://api.coinlayer.com/api/live?access_key=34901650c64e2847ae2b888f25fbab7e";
        $.getJSON(query, function(jsonData){
            // Now we iterate the processed JSON
            var data = "";
                data += "<li>Bitcoin: " + ammount * jsonData.rates.BTC + "</li>";
                data += "<li>Ethereum: " + ammount * jsonData.rates.ETH + "</li>";
                data += "<li>BitShares: " + ammount * jsonData.rates.BTS + "</li>";
                data += "<li>EOS: " + ammount * jsonData.rates.EOS + "</li>";
                data += "<li>Ripple: " + ammount * jsonData.rates.XRP + "</li>";

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
    cce = new CryptoCurrencyExchanger();
})
