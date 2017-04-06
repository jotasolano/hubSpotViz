import {dispatch} from 'd3';

function Dispatch(){
	let dis = dispatch('update', 'error')

	function exports(){
		console.log('working dispatcher');
	}

	return exports;
}

export default Dispatch;