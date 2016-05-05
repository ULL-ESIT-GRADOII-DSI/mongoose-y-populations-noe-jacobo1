// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

/* Volcar la tabla con el resultado en el HTML */
    const fillTable = (data) => {
    console.log("dato d filltable"+ resultTemplate);
    $("#finaltable").html(_.template(resultTemplate, { rows: data.rows }));
};

/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
  $.get(fileName,function (data){
    $("#original").val(data);
  });
};

//ficheros
const handleFileSelect = (evt) => {
  evt.stopPropagation();//evita que los controladores de eventos de los padres sean ejecutados
  evt.preventDefault();//los link los deja inutilizables(la accion que pertenece al bojeto no ocurrira)

 var files=evt.target.files;
 console.log("mostramos lo contenido con target" + files);

 var reader = new FileReader();
 console.log("READER" + reader);
 reader.onload = (e) => {
   $("#original").val(e.target.result);
 };
 reader.readAsText(files[0])
}

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.
    var reader = new FileReader();
    reader.onload = (e) => {

      $("#original").val(e.target.result);
      evt.target.style.background = "grey";
    };
    reader.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "light-grey";
}

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
      console.log("Pillamos el valor" + original.value);
    }
    
    //cargamos ejemplos input.txt
    $('button.example').each( (_,y) => {
     //$(y).css("display", "none");
     $(y).click( () => { 
         dump(`${$(y).text()}.txt`); });
         
   });
    //Guardamos el nombre
    $("#Boton_nombre").click(() => {
        
      
         $("#div_a_ocultar").css("display","none");
       
              //textbox a rellenar
                    $("#div_oculto").css("display", "block");
        
                    $("#Boton_enviar").click( () => {
                        console.log(DB.value);
                        console.log(original.value);
                    //ocultamos textbox
                    $("#div_oculto").css("display", "none");
            
             $.get("/user", {
           name: $("#USER").val(),
           namefich: $("#DB").val(),
           content: $("#original").val()
       });
            
         /*   $.get("/entrada", {
                name: $("#DB").val(),
                content: $("#original").val()
                
            });*/
            /*Cambio en esta parte, creamos el nuevo botón con el id y el nombre que se introduce al guardar
              sin embargo, cambiamos la clase a una nueva a la que pertenecerán todos los nuevos botones. 
              Posteriormente ocultamos los botones antiguos por clase y colgamos la nueva clase de botones del
              div superior que los contendrá, el que tiene de clase: examples.*/
            var non = $("#DB").val();
            var r= $('<button class="example_saved" type="button" id="' + non +  '">'+ non + '</button>');
            $(".example").css("display","none");
            $(r).css("display", "block");
            
            $(".examples").append(r);
        
    
        /* Aqui modifiqué la primera línea para dar funcionalidad a los nuevos botones y que accedan a la base de datos
           para buscar su correspondiente salida y ponerla en el textarea */
        //$('button.example').each( (_,y) => {//sabe que es de guardar y busca en el bton creado
        $('button.example_saved').each( (_,y) => {
        $(y).click( () => {                                     
            $.get("/findMongo",{name: $(y).text()},(data) => {
                $("#original").val(data[0].content);///////////////////////////////////////////////////////////////////////////////////////
               
            });
        });
        });
        });  
    });
    //Analizamos
    $("#parse").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/csv", 
          { input: original.value },
          fillTable,
          'json'
        );
    });
   
 
        
     //boton de guardar nueva entrada   
     $("#Guardar").click(() => {
        if (window.localStorage) localStorage.original = original.value;
        
                    //textbox a rellenar
                    $("#div_oculto").css("display", "block");
        
                    $("#Boton_enviar").click( () => {
                        console.log(DB.value);
                        console.log(original.value);
                    //ocultamos textbox
                    $("#div_oculto").css("display", "none");
        
            $.get("/entrada", {
                name: $("#DB").val(),
                content: $("#original").val()
                
            });
            /*Cambio en esta parte, creamos el nuevo botón con el id y el nombre que se introduce al guardar
              sin embargo, cambiamos la clase a una nueva a la que pertenecerán todos los nuevos botones. 
              Posteriormente ocultamos los botones antiguos por clase y colgamos la nueva clase de botones del
              div superior que los contendrá, el que tiene de clase: examples.*/
            var non = $("#DB").val();
            var r= $('<button class="example_saved" type="button" id="' + non +  '">'+ non + '</button>');
            $(".example").css("display","none");
            $(r).css("display", "block");
            
            $(".examples").append(r);
        
    
        /* Aqui modifiqué la primera línea para dar funcionalidad a los nuevos botones y que accedan a la base de datos
           para buscar su correspondiente salida y ponerla en el textarea */
        //$('button.example').each( (_,y) => {//sabe que es de guardar y busca en el bton creado
        $('button.example_saved').each( (_,y) => {
        $(y).click( () => {                                     
            $.get("/findMongo",{name: $(y).text()},(data) => {
                $("#original").val(data[0].content);///////////////////////////////////////////////////////////////////////////////////////
               
            });
        });
        });
        });
    });
       
         //mostramos botones almacenados en mongodb
    $.get("/showButtons", {}, (data) => {
        console.log("--->>>> "+data.length);
            for (var i = 0; i < data.length; i++) {
                 //$('<button class="example" type="button" id="' + non +  '">'+ non + '</button>');
                $('button.example').get(i).className = "example";///////////////////////////////////7////////
                $('button.example').get(i).content = data[i].name;
            }
    });
/*
        //buscariamos al clikar y devolveriamso el contenido de mongodb a la etiqueta original
    $('button.example').each( (_,y) => {
        $(y).click( () => {                         
            $.get("/findMongo",{name: $(y).text()},(data) => {
                        $("#original").val(data[0].content);////////////////////////////////////////////////////////
            });
        });
    });
   */

    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);
 });
})();



