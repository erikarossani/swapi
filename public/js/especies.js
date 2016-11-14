var template = '<div class="col s12 m6">' +
                '<div class="card horizontal hoverable">' +
                    '<div class="card-stacked">' +
                        '<div class="card-content indigo darken-4 white-text">' +
                            '<p>Hi, my name is <strong>{{name}}</strong></p>' +
                        '</div>' +
                        '<div class="card-action">' +
                            '<a data-show-url="{{url}}" class="blue-text text-darken-2about">Detalle personaje</a>' +
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
            especies += template.replace("{{name}}" , response.name)
            $("#people").append(especies);  
    }
           

    var mostrarPersonajes = function(response){
        var array = $(this).val().split("/"); 
            array.splice(0,5);
            var borrar= array.filter(Boolean);
        var longitud = borrar.length;
        $("#people").html("");
        for (var i = 0; i < longitud; i++) {

            var  posicion= borrar[i];
            var urlEspecies = "//swapi.co/api/people/" + posicion +"/";
            $.getJSON(urlEspecies,mostrarOpciones);
        }
    }             

        $("#contenedor").on("change", ("#especie"), mostrarPersonajes);

});