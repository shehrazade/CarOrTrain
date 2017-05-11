var cheerio = require('cheerio');
var JSON5 = require('json5');
var request = require('syncrequest');


function getAddress(address,callback){
	var request = require("request");
	var url_search = "https://search.mappy.net/search/1.1/find?q="+address+"&favorite_country=250&language=FRE&loc_format=geojson&mid=9265785959&tagid=SPD_RESPONSE_SEARCH_ITINERARY&abtest=NA&f=poi_xor_address"
	var coordinates = new Object();

	 		request({
			url: url_search,
			method: 'GET',
		}, function(error, response, body) {

		 var data = JSON.parse(body);
		 coordinates.c1 = data.addresses.features[0].geometry.geometries[0].coordinates[0];
		 coordinates.c2 = data.addresses.features[0].geometry.geometries[0].coordinates[1];
		 coordinates.comp = coordinates.c1+","+coordinates.c2 ;
		//console.log(address.c1);
 			callback(coordinates);
		});

}

function getDataCar(from, to , callback){
	var request = require("request");
	var url_search ="https://routemm.mappy.net/route_vehicle/1.5/roadbook?rb.veh=midcar&rt.cost=time&rt.notoll=0&rb.infotraffic=0&rb.gascost=1.447&rb.gas=petrol&rt.nbroutes=3&opt.compensation=0&routeidx=0&poiids=540a79afe4b07d4c2c380f4e&clientId=mappy&wt=json&rb.lang=fre&mid=9265785959&tagid=SPD_RESPONSE_ITINERARY&abtest=NA";
	url_search += "&from="+"2.11282063524626,49.0593280868461" ;
	url_search +="&to="+"2.241008,48.894069" ;

	var dataCar = new Object();

	 		request({
			url: url_search,
			method: 'GET',
		}, function(error, response, body) {

		 var data = JSON.parse(body);
		 dataCar.time = data.routes.route.summary.time;
		 dataCar.display = fromSecToTime(dataCar.time) ;
 			callback(dataCar);
		});
}

function getDataTrain(from, to , callback){
	var request = require("request");
	var url_search ="https://routemm.mappy.net/route/1.5/roadbook?sens=1&criteria=1&transport_mode=pub_tp&rb.veh=metro-rer-bus-boat-tram-train&poiids=540a79afe4b07d4c2c380f4e&clientId=mappy&wt=json&rb.lang=fre&mid=9265785959&tagid=SPD_RESPONSE_ITINERARY&abtest=NA";
	url_search += "&from="+"2.11282063524626,49.0593280868461" ;
	url_search +="&to="+"2.241008,48.894069" ;

	var dataTrain = new Object();

	 		request({
			url: url_search,
			method: 'GET',
		}, function(error, response, body) {

		 var data = JSON.parse(body);
		 dataTrain.time = data.routes.route.summary.costs.time;
		 dataTrain.display = fromSecToTime(dataTrain.time);
		// console.log(dataTrain);
 			callback(dataTrain);
		});
}

function fromSecToTime(min){
	var date = new Date(null);
	var res ;

	date.setSeconds(min);
	res = date.toTimeString().split(' ')[0] ;
	//console.log("time : "+date.toTimeString().split(' ')[0]) ;
	return res ;
}

exports.getDataTrain = getDataTrain;
exports.getDataCar = getDataCar;
exports.getAddress = getAddress;
