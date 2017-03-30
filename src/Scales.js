import * as d3 from 'd3';

function Scales(){
	let W, H, M ={t:20,r:20,b:20,l:20};

	function exports(selection){
		W = W || d3.select('#canvas').node().clientWidth - M.l - M.r;
		H = H || d3.select('#canvas').node().clientHeight - M.t - M.b;

		console.log();

		let radius = Math.min(W, H) / 2 - 150; //how far do the lines go

		var svg = selection.selectAll('svg')
			.data([0]);

		var svgEnter = svg.enter()
			.append('svg') //ENTER
			.attr('width', W + M.l + M.r)
			.attr('height', H + M.t + M.b);

		var plotEnter = svgEnter.append('g').attr('class','plot time-series')
			.attr('transform','translate('+M.l+','+M.t+')')
		
		plotEnter.append('circle').attr('class', 'point');
		plotEnter.append('g').attr('class', 'a axis');

		// selection.selectAll('.point').data([0])
		// 	.attr('transform','translate('+ (M.l + W / 2) + "," + (M.t + H / 2) + ') rotate('+0+')')
		//     .attr('cx', 0)
		//     .attr('cy', 0)
		//     .attr('r', 5)
		//     .style('fill', 'green');


		let ga = svgEnter.select('.axis').selectAll("g").data(d3.range(0, 360, 30))
			.enter()
			.append('g')
			.attr('transform', 'translate(' + (M.l + W/2) + ',' + (M.t + H/2) + ')')
			.append('line')
			.attr("x2", radius)
    		.style('stroke', 'white')
    		.style('opacity', 0.5)
    		.style('stroke-width', 0.5)
			// .enter().append('g')
			.attr("transform", function(d) { return "rotate(" + -d + ")"; });
	};
	return exports;
}

export default Scales;
