// ** ------- DEPENDENCIES ------- **
import * as d3 from 'd3';
let crossfilter = require('crossfilter'); //CommonJS
let Awesomplete = require('awesomplete');
import 'awesomplete/awesomplete.css';

import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'

import DataLoader from './data';
import Arc from './Arc';
import Scales from './Scales'
import StationsList from './Stations'

let graphics = Arc();
let scales = Scales();

// ** ------- DataLoader() ------- **
let cf;
let data = DataLoader()
	.on('error', function(err){
		console.log(err);
	})

	.on('loaded', function(data){
	let alltrips = data.trip1.concat(data.trip2);
	let stationData = data.stations;

	// Inputs' dispatchers - ! PLAN ON PUTTING FILTER FUNCTION INSIDE .on
	let stationInputs = StationsList(stationData)
	.on('start', function(startStation){
		console.log(startStation);
	});
	
	// Filter data by any pair of stations -- CROSSFILTER NOT WORKING SEE BELOW --
	let filtered = alltrips.filter(d => {
		return d.startStn === 'University Park' && d.endStn === 'MIT at Mass Ave / Amherst St' ;
	});

	// let cf = crossfilter(alltrips);
	// let tripsByStartTime = cf.dimension(function(d, i){ return d['startTime'[i]] ? d['startTime'[i]] : "No answer"; });

	filtered.sort(function(a, b){return a.startTime - b.startTime})

	// adding a 'lvl' key for radius offsetting (see arc.js)
	filtered.forEach((d, i) => {d.lvl = i} );


	d3.select('#canvas').datum(filtered).call(graphics);
	d3.select('#scales').datum([0]).call(scales);

	});

	


// ** ------- DATA QUERY ------- **
data();
