
(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/users', function(err, res) {  
      if(err) {
          console.log('ERROR: connecting to Database. ' + err);
  }});


    
    /* */
    let Schema = mongoose.Schema;
   /*Esquema de la base de datos para la practica csv con mongodb*/ 
   
   let DatosSchema = new Schema({
         name: String
     });
   
   
    let EntradaSchema = new Schema({
      name1: String,
      content: String,
      _creator: [{type: Schema.Types.ObjectId, ref: "Datos"}]
    });
    
    
    const Datos = mongoose.model('Datos', DatosSchema);
    const Entrada  = mongoose.model('Entrada', EntradaSchema);
    
    
     Datos.remove({}).then(() => {
        Entrada.remove({}).then(() => {
              
              
            let usuario  = new Datos({
                  name: "Pepito"
            });
               
            usuario.save(function(err){
                if(err) return console.log(err);
                console.log(`Saved usuario : ${usuario}`);
                    
            //Ejemplos por defecto
            let entrada = new Entrada({
                        name1: "entrada2.csv",
                        content: `"producto",           "precio"  "fecha"
                                    "camisa",             "4,3",    "14/01"
                                    "libro de O\"Reilly", "7,2"     "13/02"`,
                        _creator: usuario._id
            });
                    
            entrada.save(function(err){
                if(err) return console.log(err); 
                    console.log(`Saved entrada: ${entrada}`);
            }).then(()=>{
                Entrada
                .findOne({ name1: "entrada2.csv",
                           content: `"producto",           "precio"  "fecha"
                                    "camisa",             "4,3",    "14/01"
                                    "libro de O\"Reilly", "7,2"     "13/02"`,})
                .populate('_creator')
                .exec(function(err,docs){
                        if(err) return console.log(err);
                        console.log('Mostramos las entrada: %s',docs._creator);
                }).then( () => {
                           //mongoose.connection.close(); 
                        });
              });
            });
        });
    });

   
   
 
  
  
  module.exports = { Datos:Datos, Entrada:Entrada };
})();