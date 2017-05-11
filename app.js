var express = require('express');
var fs = require('fs');
var mappy = require("./mappy");

var app = express();

function initHeader(res,type){
	res.setHeader('Content-Type', type);
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
}

app.use(express.static(__dirname + '/public'));
app.listen(3000);


app.get('/getData', function(req, res) {
	initHeader(res,'text/json');

  var dataRes = new Object();

  // Get from coordinates
  mappy.getAddress(req.query.addFrom,function(res){
   dataRes.from = res ;
 } );

  // Get to coordinates
  mappy.getAddress(req.query.addTo,function(res){
   dataRes.to = res ;
 } );

  // Get data by Car
  mappy.getDataCar(0,0 , function(res){
    console.log("car : "+res);
  })

  // Get data by Train
  mappy.getDataTrain(0,0 , function(res){
    console.log(res);
  });

  var today = new Date() ;

  console.log(today.getDate());

  res.write(JSON.stringify(dataRes));
  res.end();

});
