"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');



//var mongoose = require('mongoose');

//var pmongo = require("promised-mongo");

//var db = pmongo(connectionString, [collections]);

var port = process.env.PORT || 8080;
var ip = process.env.IP || '0.0.0.0';
var addr = `${ip}:${port}`;
/*
var host = db.serverStatus().host;
var prompt = function(){ return db+"@"+host+">";}
*/
//app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

//calculate o hace falta llamarlo con el .js .
const calculate = require('./models/calculate');

app.get('/', (request, response) => {
  response.render('index',
  {title : 'Comma Separated Value Analyze (CSV) myApp with Ajax', error:"" })
});

app.get('/csv', (request, response) => {
    response.send({ "rows": calculate(request.query.input) });
});

    const Entrada = require('./models/dbMongo');
    console.log("JUSTO DESPUES DEL REQUIRE ENTRADA");
    
    app.get('/entrada', (request, response) => {
        
        let input1 = new Entrada({
            "name": "JACOBO",
            "content": "1,2,3\n1,2,3"
        })
       
        let input = new Entrada({
            "name": request.query.name,
            "content": request.query.content
        });
        
        
        db.input1.save();
        console.log("LLEGO AQUI");
        /*
        input.save();(function(err) {
            if(err) {
                console.log(`Han surgido errores: ${err}` );
                return err;
            }
            //console.log(request.query.name);
            //console.log(`Guardado ${input}` );
        });*/
    });
    
    app.listen(port,ip,function(){
    console.log(`chat server listening at ${addr}`);
});