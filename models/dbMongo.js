(function() {
  "use strict";
  
  const util = require('util');
  const mongoose = require('mongoose');
  //var ObjectId = mongoose.Schema.Types.ObjectId;

  mongoose.connect('mongodb://localhost/documentos');
  
  const EntradaSchema =  //Introducimos el esquema csv
     mongoose.Schema({
        "name": { type: String, unique: true },
        "content": String
    });

  const Entrada = mongoose.model("Entrada", EntradaSchema);

  //let nombre = document.getElementById("Boton_enviar");
  /*
 let entrada1 = new Entrada({
        "name": nombre,
        "content": original.value
    });
    
 console.log("dbMongo.js ejecutándose...");

  let promesa1 = entrada1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${entrada1}`);
  });


  Promise.all(promesa1).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  */
    mongoose.connection.close(); 
  //});

  
 console.log("dbMongo.js ejecutándose...");
  module.exports = Entrada;
})();