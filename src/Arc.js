import * as d3 from 'd3';

function Arc(){
	let W, H, M ={t:20,r:20,b:20,l:20};
	let dis = d3.dispatch('draw');
	let scaleX, scaleY;
	const baseRadius = 60;
	let canvas = document.querySelector("canvas"),
	context = canvas.getContext("2d");

	function exports(selection){
		W = W || selection.node().clientWidth - M.l - M.r;
		H = H || selection.node().clientHeight - M.t - M.b;
		let arr = selection.datum()?selection.datum():[];

	// ** ------- LAYOUT ------- **
	let scaleAngle = d3.scaleTime()
			.domain([0, 24])
			.range([0, 2 * Math.PI]);

	let arcGenerator = d3.arc()
		.innerRadius(function(d) { return baseRadius + d.lvl; })
		.outerRadius(function(d) { return baseRadius + d.lvl + 1; })
		.startAngle(function(d) { return scaleAngle(d.startTime); })
		.endAngle(function(d) { return scaleAngle(d.endTime); })
		.context(context);

	context.translate(M.l, M.t);

	context.beginPath();
	for (var i = 0; i < arr.length; i++) {
		  	arcGenerator(arr[i]);
	}
  	// context.lineWidth = 0;
  	context.fillStyle = "white"
  	context.fill();




		//Set up the DOM structure like so:
		/*
		<svg>
			<g class='plot'>
				<path class='line' />
			</g>
		</svg>
		*/
		// var svg = selection.selectAll('svg')
		// 	.data([_data]);

		// var svgEnter = svg.enter()
		// 	.append('svg') //ENTER
		// 	.attr('width', W + M.l + M.r)
		// 	.attr('height', H + M.t + M.b);

		// var plotEnter = svgEnter.append('g').attr('class','plot time-series')
		// 	.attr('transform','translate('+M.l+','+M.t+')');
		// plotEnter.append('path').attr('class','line');

		// //Update
		// var plot = svg.merge(svgEnter)
		// 	.select('.plot')
		// 	.attr('transform','translate('+M.l+','+M.t+')');
		// plot.select('.line').transition()
		// 	.attr('d',line)
		// 	.style('fill', 'none')
		// 	.style('stroke', '#000');
	};

	exports.on = function(event, callback){
		dis.on(event, callback);
		return this;

	}

	return exports;
}

export default Arc;
