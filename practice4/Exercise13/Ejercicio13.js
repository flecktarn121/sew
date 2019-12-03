class FileManager {

    constructor() {
        this.size = 0;
        this.name = "";
        this.type = "";
        this.lastMod = "";
    }

    loadFile() {
        var file = document.getElementById("file").files[0];
        this.size = file.size;
        this.name = file.name;
        this.type = file.type;
        this.lastMod = file.lastModifiedDate;
        this.displaydata(file);
    }

    displaydata(file) {
        var data = "<li>Nombre: " + this.name + "</li>";
        data += "<li>Tamaño: " + this.size + "bytes</li>";
        data += "<li>Tipo: " + this.type + "</li>";
        data += "<li>Última modificación: " + this.lastMod + "</li>";
        document.getElementById("data").innerHTML = data;
        this.displayContent(file);
    }

    displayContent(file) {
        if (this.type.match(/text.*/)){
            var reader = new FileReader();
            reader.onload = function(x) {
                document.getElementById("content").innerText = reader.result;
            }
            reader.readAsText(file);
        } else {
            document.getElementById("content").innerText = "";
        }
    }
}

var fm = new FileManager();
