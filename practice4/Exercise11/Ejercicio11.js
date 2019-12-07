class SemanticTagger{
    constructor(){
    }

    readText() {
        var text = "";
        text = $(".textarea").text;
        return text;
    }

    tagText() {
        var text = this.readText();
        var apiKey = "G4lsJP5Z6FPEDTsm3a480p3aFwGvnUm0";
        var url = "https://api.thomsonreuters.com/permid/calais";
        var _this = this;
        $.ajax({
            url: "https://api.thomsonreuters.com/permid/calais",
            type: "post",
            data: text,
            headers:{
                "Content-Type":"text/raw",
                "x-ag-access-token":apiKey
            }
        }).then(_this.processFile);
    }

    processFile(data, result) {
        if (result === "success") {
            console.log(data);
        } else {
            alert("Ha ocurrido un error con el servicio.");
        }
    }
}

var tagger;

window.addEventListener("load", function() {
    tagger = new SemanticTagger();
});
