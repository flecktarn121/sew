class InfoNavegador {
    escribirNombre(){
        var nombreNavegador = navigator.appName
        document.write("Nombre del navegador: " + nombreNavegador)
    }

    idioma() {
        var lengua = navigator.language
        document.write("Idioma del navegador: " + lengua)
    }

    misc() {
        var lista = ""
        lista += "Vendor: " + navigator.vendor + ", "
        lista += "product: " + navigator.product + ", "
        lista += "version: " + navigator.appVersion + "."
        document.write(lista)
    }
};

var info = new InfoNavegador();