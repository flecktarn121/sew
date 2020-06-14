class SearchEngine{

    search() {
       let query = document.getElementsByTagName("input")[0].value;
        $.get("https://flecktarn121.github.io/sew/extraordinary/library/library-validated.xml", function(xmlData){
            console.log(xmlData);
            $('#results').empty();
            let data = '<h3>Resultados</h3>'
                + '<p>Estos son los rsultados de su búsqueda</p>'
                + '<ul>'
            $(xmlData.documentElement.children).each(function(child){
                console.log($(this).find('title').text());
                if ($(this).find('title').text().includes(query)) {
                    console.log('hola')
                    data += ('<li><strong>' + $(this).find('title').first().text() + '</strong>');
                    data += '<ul>';
                    let avaliable = $(this).attr('avaliable');
                    avaliable === 'true'? data += '<li>Disponible</li>': data += '<li>No disponible</li>'
                    data += '<li>Autor: ' + $(this).find('author').first().find('name').text() + '</li>'
                    data += '</ul>';
                }
            });
            data += '</ul>'
            console.log(data)
            // Add it to the DOM tree
            $("#results").append(data);

        }).fail(function() {
            alert("Imposible recuperar los datos");
        });
    }
}
let searchEngine;
window.onload=function() {
    searchEngine = new SearchEngine();
};
