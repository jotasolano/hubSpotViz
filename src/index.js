// ** ------- DEPENDENCIES ------- **
import * as d3 from 'd3';
let crossfilter = require('crossfilter'); //CommonJS
import 'bootstrap/dist/css/bootstrap.css'

// >> ------- DEPENDENCIES – MODULES ------- **
import DataLoader from './data';

let cf;

let data = DataLoader()
	.on('loaded', function(data){ //anything below only happens after data has been loaded
		cf = crossfilter(data.trip1)
		console.log(cf);
	})
	.on('error', function(err){
		console.log(err);
	})

// calling the data
data();

// import Arc from './modules/Arc.js'
// ** ------- DATA QUERY ------- **
// d3.queue()
// 	.defer(d3.csv, './data/201601-hubway-tripdata.csv',parseTrips)
// 	.defer(d3.csv, './data/201602-hubway-tripdata.csv',parseTrips)
// 	.defer(d3.csv, './data/2016_0429_Hubway_Stations.csv',parseStations)
// 	.await(dataLoaded);

// >>> dataLoaded()
function dataLoaded(err,trip1, trip2, stations){
	var alltrips = trip1.concat(trip2);

	console.log(alltrips);

	// ** ------- DATA MODEL ------- **

	// Filter data by any pair of stations

	// tripsByStartTime.filter()
	var filtered = alltrips.filter(function(d) {
		return d.startStn === 'University Park' && d.endStn === 'MIT at Mass Ave / Amherst St' ;
	});

	// var cf = crossfilter(alltrips);
	// var tripsByStartTime = cf.dimension(function(d){ d.startTime; });

	var hourParse = d3.timeFormat('%H:%M:%S'); //parse as HOUR:MINUTE:SECOND

	//setting the time of each trip to "today" + specified hour:min:sec from data
	var today = new Date();
	today.setHours(0, 0, 0, 0) //H, M, S, mS
	var todayMillis = today.getTime();

	filtered.forEach(function(d) {
		var split = d.startTime.split(':');
	    var timePeriodMillis = (parseInt(split[0], 10) * 60 * 60 * 1000) +
            (parseInt(split[1], 10) * 60 * 1000) + 
            (parseInt(split[2], 10) * 1000);

        d.timeSt = new Date();
        d.timeSt.setTime(todayMillis + timePeriodMillis);
	});


	filtered.forEach(function(d) {
		var split = d.endTime.split(':');
	    var timePeriodMillis = (parseInt(split[0], 10) * 60 * 60 * 1000) +
            (parseInt(split[1], 10) * 60 * 1000) + 
            (parseInt(split[2], 10) * 1000);

        d.timeEd = new Date();
        d.timeEd.setTime(todayMillis + timePeriodMillis);
	});

	console.log(filtered);

	// var stack = d3.stack()
	//     .keys(['timeSt', 'timeEd'])
	//     .order(d3.stackOrderNone)
	//     .offset(d3.stackOffsetNone);

	// var series = stack(filtered);
	// console.log(series);

	var scaleAngle = d3.scaleTime()
			.domain([new Date(2016,0,1,0,0,0), new Date(2016,11,31,0,0,0)]) // do we need a domain?
			.range([0, 2 * Math.PI]);

	// var scaleY = d3.scaleLinear().domain([0,maxY]).range([H,0]);

	const baseRadius = 20;
	var arcGenerator = d3.arc()
		.innerRadius(function(d, i) { return baseRadius + i; })
		.outerRadius(function(d, i) { return baseRadius + 1 + i; })
		.startAngle(function(d) { return scaleAngle(d.timeSt) ; })
		.endAngle(function(d) { return scaleAngle(d.timeEd); })


	console.log(arcGenerator([filtered]));




	// var radiallineGenerator = d3.radialLine()
	// 	.angle(function(d){ return console.log((d.duration)/60); })
	// 		// .angle(function(d){ return console.log(Math.PI*((d.endTime - d.startTime)/3600/60)); })
	// 		.radius(function(d, i){ return console.log(i+1); });

	// console.log(radiallineGenerator([filtered[0], filtered[1]]));


} // <<< dataLoaded()



function parseTrips(d){
	return {
		bike_nr:d.bikeid,
		duration:+d.tripduration,
		startStn:d['start station name'],
		startStnId:d['start station id'],
		startTime:parseTime(d.starttime),
		endStn:d['end station name'],
		endStnId:d['end station id'],
		endTime:parseTime(d.stoptime),
		userType:d.usertype,
		userGender:d.gender?d.gender:undefined,
		userBirthdate:d['birth year']?+d['birth year']:undefined
	};
}

function parseStations(d){
	return {
		name:d.Station,
		id:d['Station ID'],
		lngLat:[+d.Longitude,+d.Latitude],
		city:d.Municipality
	};
}

function parseTime(timeStr){ //2016-01-01 00:08:07
	var time = timeStr.split(' ')[1].split(':'),
		hour = +time[0],
		min = +time[1],
		sec = +time[2];

	var	date = timeStr.split(' ')[0].split('-'),
		year = date[0],
		month = date[1],
		day = date[2];

	// return new Date(year,month-1,day,hour,min,sec);
	return (hour + ':' + min + ':' + sec);
}