"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

var pmongo = require("promised-mongo");
var db = pmongo(connectionString, [collections]);


var port = process.env.PORT || 3000;
var ip = process.env.IP || '0.0.0.0';
var addr = `${ip}:${port}`;

var host = db.serverStatus().host;
var prompt = function(){ return db+"@"+host+">";}

//app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));

//calculate o hace falta llamarlo con el .js .
const calculate = require('./models/calculate.js');

app.get('/', (request, response) => {
  response.render('index',
  {title : 'Comma Separated Value Analyze (CSV) myApp with Ajax', error:"" })
});

app.get('/csv', (request, response) => {
    response.send({ "rows": calculate(request.query.input) });
});

//app.listen(app.get('port'), () => {
//    console.log(`Node app is running at localhost: ${app.get('port')}` );

app.listen(port,ip,function(){
    console.log(`chat server listening at ${addr}`);
});