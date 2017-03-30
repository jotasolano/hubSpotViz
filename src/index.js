// ** ------- DEPENDENCIES ------- **
import * as d3 from 'd3';
let crossfilter = require('crossfilter'); //CommonJS
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

import DataLoader from './data';
import Arc from './arc';

let graphics = Arc()


// ** ------- DataLoader() ------- **
let cf;
let data = DataLoader()
	.on('error', function(err){
		console.log(err);
	})

	.on('loaded', function(data){ //anything below only happens after data has been loaded
	var alltrips = data.trip1.concat(data.trip2);
	
	// ** ------- DATA MODEL ------- **

	// Filter data by any pair of stations

	// tripsByStartTime.filter()
	let filtered = alltrips.filter(d => {
		return d.startStn === 'University Park' && d.endStn === 'MIT at Mass Ave / Amherst St' ;
	});


	let cf = crossfilter(alltrips);
	let tripsByStartTime = cf.dimension(function(d, i){ return d['startTime'[i]] ? d['startTime'[i]] : "No answer"; });

	// console.log(tripsByStartTime.top(Infinity));

	// setting the time of each trip to "today" + specified hour:min:sec from data
	filtered.forEach((d, i) => {d.lvl = i} );

	// let scaleAngle = d3.scaleTime()
	// 		.domain([0, 24])
	// 		.range([0, 2 * Math.PI]);

	// const baseRadius = 20;
	// let arcGenerator = d3.arc()
	// 	.innerRadius(function(d) { return baseRadius + d.lvl; })
	// 	.outerRadius(function(d) { return baseRadius + d.lvl + 1; })
	// 	.startAngle(function(d) { return scaleAngle(d.startTime); })
	// 	.endAngle(function(d) { return scaleAngle(d.endTime); })

	// console.log(arcGenerator(filtered[1]));

	console.log(filtered);

	d3.select('#test').datum(filtered).call(graphics);

	});

	


// ** ------- DATA QUERY ------- **
data();
