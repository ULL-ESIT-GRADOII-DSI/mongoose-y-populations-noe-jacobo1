
(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/lista', function(err, res) {  
      if(err) {
          console.log('ERROR: connecting to Database. ' + err);
  }});


    
    /* */
    let Schema = mongoose.Schema;
   /*Esquema de la base de datos para la practica csv con mongodb*/ 
   /*
   let DatosSchema = new Schema({
         name:String
     });
   
   
    let EntradaSchema = new Schema({
      name: String,
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
                        name: "entrada2.csv",
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
                .findOne({ name: "entrada2.csv",
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
    */
   
   
  const EntradaSchema =  //Introducimos el esquema csv
     mongoose.Schema({
        "name": String,
        "content": String
    });

  const Entrada = mongoose.model("Entrada", EntradaSchema);
  
  /*if (Entrada) {
        Entrada.remove({}).exec();
    }*/
  /*
  let entrada1 = new Entrada({"rank":"ace", "suit":"spades ♠",   "chuchu": [{a: "hello", b: "world!"}]});
  let entrada2 = new Entrada({"rank":"2",   "suit":"hearts ♥",   "chuchu": [{a: "hola", b: "mundo"}]});
  let entrada3 = new Entrada({"rank":"3",   "suit":"clubs ♣",    "chuchu": [{a: "hola", b: "mundo"}]});
  let c4 = new Entrada({"rank":"4",   "suit":"diamonds ♦", "chuchu": [{a: "hola", b: "mundo"}]});*/
    let entrada1 = new Entrada({
        "name": "entrada1.csv",
        "content": `"producto",           "precio"
                    "camisa",             "4,3"
                    "libro de O\"Reilly", "7,2"`
    });
    let entrada2 = new Entrada({
        "name": "entrada2.csv",
        "content": `"producto",           "precio"  "fecha"
                    "camisa",             "4,3",    "14/01"
                    "libro de O\"Reilly", "7,2"     "13/02"`
    });
    let entrada3 = new Entrada({
        "name": "entrada3.csv",
        "content": `"edad",  "sueldo",  "peso"
                    ,         "6000€",  "90Kg"
                    47,       "3000€",  "100Kg"`

    });

  let promesa1 = entrada1.save(function (err) {
    if (err) { console.log(`Hubieron errores p1:\n${err}`); return err; }
    console.log(`Saved p1`);
  });

  let promesa2 = entrada2.save(function (err) {
    if (err) { console.log(`Hubieron errores p2:\n${err}`); return err; }
    console.log(`Saved p2`);
  });
  
  let promesa3 = entrada3.save(function (err) {
    if (err) { console.log(`Hubieron errores p3:\n${err}`); return err; }
    console.log(`Saved p3`);
  });
 
  
  Promise.all([promesa1,promesa2,promesa3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    //mongoose.connection.close(); 
  });
  
  
  module.exports = Entrada;//Datos;
})();