// ** ------- DEPENDENCIES ------- **
import * as d3 from 'd3';
let crossfilter = require('crossfilter'); //CommonJS
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

import DataLoader from './data';
import Arc from './Arc';
import Scales from './Scales'

let graphics = Arc();
let scales = Scales();


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

	filtered.sort(function(a, b){return a.startTime - b.startTime})

	// setting the time of each trip to "today" + specified hour:min:sec from data
	filtered.forEach((d, i) => {d.lvl = i} );


	d3.select('#canvas').datum(filtered).call(graphics);
	d3.select('#scales').datum([0]).call(scales);

	});

	


// ** ------- DATA QUERY ------- **
data();
