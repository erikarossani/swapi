var template = '<div class="col s12 m6">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content indigo darken-4 white-text">' +
                            '<p>Hi, my name is <strong>{{name}}</strong></p>' +
                        '</div>' +
                        '<div class="card-action">' +
                            '<a data-show-url="{{url}}" class="blue-text text-darken-2 about">Detalle personaje</a>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>'; 

$(document).ready(function(){

    var formatResponse = function(response){          
        $.each(response.results, function(i, personaje){
            $("#especie").append('<option value ="' + personaje.people+ '">' + personaje.name + '</option>');
        });
    };

    $.getJSON("//swapi.co/api/species/", formatResponse);


    var mostrarOpciones = function(response){
        var especies = "";

        if(response.next != null)
        var especieData = response.name.replace("http", "https");
            especies += template.replace("{{name}}" , especieData)
            $("#people").append(especies);
                especies= "";    
    }
           

    var mostrarPersonajes = function(response){
        var array = $(this).val().split("/");
        var longitud = array.length;
        $("#people").html("");
        for (var i = 0; i < longitud; i++) {

            var  posicion= array[i].substr(0,longitud-1);
            var urlEspecies = "//swapi.co/api/people/" + posicion;
            $.getJSON(urlEspecies,mostrarOpciones);
        }
    }             

        $("#contenedor").on("change", ("#especie"), mostrarPersonajes);

});
