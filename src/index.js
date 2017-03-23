// ** ------- DEPENDENCIES ------- **
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter';
import 'bootstrap/dist/css/bootstrap.css'


// ** ------- DATA QUERY ------- **
d3.queue()
	.defer(d3.csv, './data/201601-hubway-tripdata.csv',parseTrips)
	.defer(d3.csv, './data/201602-hubway-tripdata.csv',parseTrips)
	.defer(d3.csv, './data/2016_0429_Hubway_Stations.csv',parseStations)
	.await(dataLoaded);

// >>> dataLoaded()
function dataLoaded(err,trip1, trip2, stations){
	var alltrips = trip1.concat(trip2);

	// ** ------- DATA MODEL ------- **

	// Filter data by any pair of stations
	var filtered = alltrips.filter(function(d) {
		return d.startStn === 'University Park' && d.endStn === 'MIT at Mass Ave / Amherst St' ;
	});

	// Nest filtered data by day and the mean of the duration of the trips

	var day = d3.timeFormat('%A');
	// var nestedByDay = d3.nest()
	// 	.key(function(d) { return day(d.startTime); })
	// 	// .rollup(function(i) { return { 'length': Math.round(d3.mean(i, function(d) { return d.duration; })) }; })
	// 	.rollup(function(i) { return i.startTime; })
	// 	.entries(alltrips);



	console.log(nestedByDay);

	var cf = crossfilter(alltrips);
	var tripsByStartTime = cf.dimension(function(d){ d.startTime; }),
	// 	tripsByStartStation = cf.dimension(function(d){return d.startStn; }),
	// 	tripsByEndStation = cf.dimension(function(d){return d.endStn; });

	// Filter by time of day
	// tripsByStartTime.

	// console.log(tripsByStartTime.top(Infinity));


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

	return new Date(year,month-1,day,hour,min,sec);
}