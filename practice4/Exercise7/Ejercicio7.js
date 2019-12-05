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
        var text = "";
        $("*", document.body).each(function() {
            var parentTag = $(this).parent().get(0).tagName;
            var tag = $(this).get(0).tagName;
            var value = $(this).get(0).text;
            text += "Tag del padre: " + parentTag +", tag: " + tag + ", valor: " + value + "\n";
        });
        $(".textarea").val(text);
    }

    sumarFilasColumnas() {
        var cols = 0;
        var rows = 0;

        // Columns
        $("#datatable tr th").each(() => cols++ );
        // Rows
        $("#datatable * tr").each(() => rows++ );

        var texto = "Filas: " + String(rows) + ", columnas: " + String(cols);
        $(".tatabla").val(texto);

    }
}
