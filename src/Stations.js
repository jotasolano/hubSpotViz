import {dispatch} from 'd3';
const Awesomplete = require('awesomplete');

function StationsList(data){
	let dis = dispatch('start', 'end');
	let stationList = []
	data.forEach(el => { stationList.push(el.name) });

	function exports(){

		const startInput = document.getElementById('start-station-input');
		const stAwesomplete = new Awesomplete(startInput);
		stAwesomplete.list = stationList;

		const endImput = document.getElementById('end-station-input');
		const edAwesomplete = new Awesomplete(endImput);
		edAwesomplete.list = stationList;

		startInput.addEventListener("awesomplete-selectcomplete", function(e){
			let startStation = startInput.value;
			dis.call('start', null, startStation);
			console.log('dis:start');

			// console.log(startInput.value);
		}, false);

		endImput.addEventListener("awesomplete-selectcomplete", function(e){
			// console.log(endImput.value);
		}, false);

	}

	exports.on = function(event, callback){
		dis.on(event, callback);
		return this; //this = exports
	}

	return exports;
}

export default StationsList;