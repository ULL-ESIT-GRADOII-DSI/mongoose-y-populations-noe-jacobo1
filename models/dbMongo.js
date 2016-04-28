
(function() {
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/test', function(err, res) {  
if(err) {
  console.log('ERROR: connecting to Database. ' + err);
}});

  const EntradaSchema =  //Introducimos el esquema csv
     mongoose.Schema({
        "name": { type: String, unique: true },
        "content": String
    });

  const Entrada = mongoose.model("Entrada", EntradaSchema);

  /*let entrada1 = new Entrada({"rank":"ace", "suit":"spades ♠",   "chuchu": [{a: "hello", b: "world!"}]});
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
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${entrada1}`);
  });

  let promesa2 = entrada2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${entrada2}`);
  });

  let promesa3 = Entrada.create(entrada3, function (err, x) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved promesa3: ${x}`);
  });

  Promise.all([promesa1, promesa2, promesa3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
    mongoose.connection.close(); 
  });
  
  module.exports = Entrada;
})();