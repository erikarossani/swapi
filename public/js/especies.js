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

    var nombreEspecies = function(response){        
        var especies  = "";
        $.each(response.results, function(i, especie){
            var posicion = "";
            var urlEspecies = "https://swapi.co/api/people/";

            $.each(especie.people, function (i, valor) {
            posicion += valor.replace( urlEspecies, "").replace("/", ",");
            }); 

             $("#especie").append('<option value ="' + posicion.slice(0,-1) + '">' + especie.name + '</option>');

        });
    };
    $.getJSON("https://swapi.co/api/species/", nombreEspecies);

    var mostrarOpciones = function(response){
        var especies = "";
            especies = template.replace("{{name}}" , response.name)
            $("#people").append(especies);
                especies= "";    
    };
           

    var mostrarPersonajes = function(response){
        var array = $(this).val().split("/");
        var longitud = array.length;
        $("#people").html("");
        for (var i = 0; i < longitud; i++) {

            var  posicion= array[i].substring(0, longitud-1);
            var urlEspecies = "https://swapi.co/api/people/" + posicion;
            $.getJSON(urlEspecies,mostrarOpciones);
        }
    };             

        $("#contenedor").on("change", ("#especie"), mostrarPersonajes);

});