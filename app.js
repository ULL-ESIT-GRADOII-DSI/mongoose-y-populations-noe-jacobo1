"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


//var db = pmongo(connectionString, [collections]);

var port = process.env.PORT || 8080;
var ip = process.env.IP || '0.0.0.0';
var addr = `${ip}:${port}`;



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

//calculate o hace falta llamarlo con el .js .
const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render('index',{title : 'Comma Separated Value Analyze (CSV) myApp with Ajax', error:"" })
});

app.get('/csv', (request, response) => {
    response.send({ "rows": calculate(request.query.input) });
});

//const Entrada = require('./models/dbMongo');
const Esquema = require('./models/dbMongouser');
console.log("JUSTO DESPUES DEL REQUIRE ENTRADA");
    
    const User = Esquema.Datos;
    const Entrada = Esquema.Entrada;
    
//    console.log("UUUSSEERR: "+User);
    
/*app.get('/entrada', function(request, response) {
       
       Entrada.find({}, function(err, docs) {
           console.log("longitud bd"+docs.length);
        if (err){
            console.log("Entramos en el error");
            return err;
        }
        if (docs.length >= 4) {
            Entrada.find({ name: docs[3].name }).remove().exec();
        }
         });
       
        let input = new Entrada({
        name: request.query.name,//"name": "jijio",
        content: request.query.content//"content":"eii"
        });
        
        
   
        input.save(function(err) {
            if (err) {
                console.log(`Hubieron errores:\n${err}`);
                return err;
            }else{
                console.log(`Guardado: ${input}`);
            }
            
        });
     
});*/

/////////////////////////
/*
app.param('ejemplo', function (req, res, next, ejemplo) {  
  if (ejemplo.match(/^[a-z_]\w*\.csv$/i)) { 
      req.ejemplo = ejemplo;
  } else { 
      next(new Error(`<${ejemplo}> does not match 'ejemplo' requirements`));
      /* Error: <input1.csx> does not match 'ejemplo' requirements at app.js:85:12 *//*
   }
  next();
});


*/




/////////////////////////
app.get('/user', function(request, response) {
   // console.log("estamos en app.js en /user");
    

    
    let nombre = new User ({
        name: request.query.name
    });
    let dato = new Entrada({
        name1: request.query.name1,
        content: request.query.content,
        _creator:nombre._id
    })


    nombre.save();
    dato.save();
    
    console.log(`la variable nombre es${nombre}`);
    console.log(`la variable dato es${dato}`);
    User.find({}, function(err,data){  
        console.log(data.length+"acabamos de poner lengh de data users") 
         const id = mongoose.Types.ObjectId(data[0]._id);//id pepito bd
         const id1 = mongoose.Types.ObjectId(data[1]._id);//id de entrada
                console.log("Id:"+id);
                console.log("Id1:"+id1);
        
    });
    
  
    
    
});


/*
app.get('/showButtons', function(request, response) {
    Entrada.find({}, function(err, docs) {
        if (err){
            console.log("error showbutton");
            return err;
        }else{
            console.log("Estamos en showbutton (mostramos)");
            console.log(docs.length);
        response.send(docs);
        }
    });
});*/



app.get('/findMongo', function(request, response) {

  Entrada.find({name1: request.query.name1},
    function(err, docs) {
        console.log("chivato nombre" +request.query.name);
        console.log(request.query.content);
        console.log("docs"+docs);
      if (err){
          console.log("error al buscar en mongo bd");
        return err;
      }else{
        console.log("cargamos con exito el fichero de bd y mostramos");
      //console.log(docs);
      response.send(docs);
      }
    });
});



    
    app.listen(port,ip,function(){
    console.log(`chat server listening at ${addr,ip}`);
});