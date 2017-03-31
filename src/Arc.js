import * as d3 from 'd3';

function Arc(){
	let W, H, M ={t:20,r:20,b:20,l:20};
	let dis = d3.dispatch('draw');
	let scaleX, scaleY;
	const baseRadius = 60;
	const pixRatio = window.devicePixelRatio;
	let canvas = document.querySelector("canvas"),
	context = canvas.getContext("2d");


	function exports(selection){
		W = W || canvas.parentNode.clientWidth - M.l - M.r;
		H = H || canvas.parentNode.clientHeight - M.t - M.b;
		canvas.width = W + M.l + M.r;
		canvas.height = H + M.t + M.b;

		let radius = Math.min(canvas.width, canvas.height) / 2 - 30;
		// canvas.style.width = "6000px";
		// canvas.style.height = "6000px";
		// context.scale(2,2)


		let arr = selection.datum()?selection.datum():[];

		// ** ------- LAYOUT ------- **
		let scaleAngle = d3.scaleTime()
				.domain([0, 24])
				.range([0, 2 * Math.PI]);

		let arcGenerator = d3.arc()
			.innerRadius(function(d) { return baseRadius + d.lvl; })
			.outerRadius(function(d) { return baseRadius + d.lvl + 2; })
			.startAngle(function(d) { return scaleAngle(d.startTime); })
			.endAngle(function(d) { return scaleAngle(d.endTime); })
			.context(context);

		// ** ------- CANVAS LINES ------- **
		context.translate(canvas.width/2, canvas.height/2);

		// context.rotate(-90);
		context.beginPath();
		for (var i = 0; i < arr.length; i++) {
			  	arcGenerator(arr[i]);
		}
	  	context.fillStyle = "rgba(0, 255, 0, 0.3)"
	  	context.fill();
	};

	exports.on = function(event, callback){
		dis.on(event, callback);
		return this;
	}

	return exports;
}

export default Arc;
