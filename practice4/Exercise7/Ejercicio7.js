class DomManager {
    constructor() {
        this.that = this;
    }
    ocultarParrafo() {
        if ($(".text").is(":hidden")){
            $(".text").show();
        } else {
            $(".text").hide();
        }
    }

    anadirElemento() {
        $(".list").append("<li>Nuevo item</li>");
    }

    quitarElemento() {
        if($(".list").children.length > 0){
            $(".list").children().last().remove();
        }
    }

    listarElementos() {
        var dom = $(":root");
        var lista ="<ul>";
        var that = this;
        dom.children().each(function(){
            var child = $(this);
            that.listarElemento($(this), lista);
        });
        console.log(lista)
    }
    listarElemento(elemento, lista) {
        var padre = elemento.parent().prop("tagName");
        var tipo = elemento.prop("tagName");
        var that = this
        lista += "<li>Padre: " + padre + ", elemento: " + tipo;
        if(elemento.children.length > 0){
            elemento.children().each( function(){
                var child = $(this);
                that.listarElemento($(this), lista);
            } )
        }
        return lista;

    }
}
