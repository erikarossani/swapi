var categoria = '<option value="{{num}}">{{especie}}</option>';

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
        var personajes  = "";
        $.each(response.results, function(i, personaje){
            personajes += template
                          .replace("{{name}}", personaje.name)
                          .replace("{{url}}", personaje.url);
        });
        $("#people").html(personajes);
    };

    var nombreEspecies = function(response){        
        var especies  = "";

        $.each(response.results, function(i, especie){
            var posicion = "";
            var urlEspecies = "swapi.co/api/people/";

            $.each(especie.people, function (i, valor) {
			posicion += valor.replace( urlEspecies, "");
		    });

            especies += categoria
                     .replace("{{num}}", posicion)
                     .replace("{{especie}}", especie.name);
           

            for(var i = 0, l = especie.people.length; i < l; i++){
                posicion += especie.people[i].substr(-2);
            }
            

            var mostrarPersonajes = function(response){

            	var array = $(this).val().split("/");
                for(var i = 0; i < array.length; i++){
                    $.getJSON(urlEspecies + array[i] , formatResponse);
                    var caracteriscaSpecie = template.replace("{{name}}", response.name);
                }
             }             

             $("#contenedor").on("change", ("#especie"), mostrarPersonajes);
        });

        $("#especie").append(especies);
    }
    
    $.getJSON("http://swapi.co/api/species/", nombreEspecies);

});