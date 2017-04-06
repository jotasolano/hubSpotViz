let Awesomplete = require('awesomplete');

function StationsList(data){
	let stationList = []
	data.forEach(el => { stationList.push(el.name) });

	function exports(){

		var startInput = document.getElementById('start-station-input');
		var awesomplete = new Awesomplete(startInput);
		awesomplete.list = stationList;

		window.addEventListener("awesomplete-selectcomplete", function(e){
		  console.log(startInput.value);
		}, false);

	}

	return exports;
}

export default StationsList;