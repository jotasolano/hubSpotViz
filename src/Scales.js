import * as d3 from 'd3';

function Scales(){
	let W, H, M ={t:20,r:20,b:20,l:20};

	function exports(selection){

		W = W || selection.node().clientWidth - M.l - M.r;
		H = H || selection.node().clientHeight - M.t - M.b;
		const radius = Math.min(W, H) / 2 - 150; //how far out do the axes go

		var svg = selection.selectAll('svg')
			.data([0]);

		var svgEnter = svg.enter()
			.append('svg') //ENTER
			.attr('width', W + M.l + M.r)
			.attr('height', H + M.t + M.b);

		var plotEnter = svgEnter.append('g').attr('class','plot time-series')
			.attr('transform','translate('+M.l+','+M.t+')')
		
		plotEnter.append('circle').attr('class', 'disc');
		plotEnter.append('g').attr('class', 'axis');
		plotEnter.append('g').attr('class', 'sm-axis');

		selection.selectAll('.disc').data([0])
			.attr('transform','translate('+ (W / 2) + "," + (H / 2) + ') rotate('+0+')')
		    .attr('cx', 0)
		    .attr('cy', 0)
		    .attr('r', 60)
		    .style('fill', 'white')
		    .style('opacity', 0.4);

		svgEnter.select('.axis').selectAll("g").data(d3.range(0, 360, 30))
			.enter()
			.append('g')
			.attr('transform', 'translate(' + (W/2) + ',' + (H/2) + ')')
			.append('line')
			.attr('x1', 60)
			.attr('x2', radius)
    		// .style('stroke-width', 0.5)
			.attr("transform", function(d) { return "rotate(" + -d + ")"; });

		svgEnter.select('.sm-axis').selectAll("g").data(d3.range(0, 360, 30))
			.enter()
			.append('g')
			.attr('transform', 'translate(' + (W/2) + ',' + (H/2) + ')')
			.append('line')
			.attr('x1', radius-20)
			.attr('x2', radius)
			.attr("transform", function(d) { return "rotate(" + -d + ")"; });
	};
	return exports;
}

export default Scales;
