$(document).ready(function(){
    // svgX,Y,Z
    var svgX = d3.select("#X")
            .append("svg:svg")
            .attr("width", 200)
            .attr("height", 180);
    var svgY = d3.select("#Y")
            .append("svg:svg")
            .attr("width", 200)
            .attr("height", 180);
    var svgZ = d3.select("#Z")
            .append("svg:svg")
            .attr("width", 200)
            .attr("height", 180);
            
            
    // gaugeX
    var gaugeX = iopctrl.arcslider()
            .radius(75)
            .events(false)
            .indicator(iopctrl.defaultGaugeIndicator);
    gaugeX.axis().orient("in")
            .normalize(true)
            .ticks(12)
            .tickSubdivide(10)
            .tickSize(8, 5, 10)
            .tickPadding(1)
            .scale(d3.scale.linear()
                    .domain([-1000, 1000])
                    .range([-3*Math.PI/4, 3*Math.PI/4]));
    	
    // gaugeY			
    var gaugeY = iopctrl.arcslider()
            .radius(75)
            .events(false)
            .indicator(iopctrl.defaultGaugeIndicator);
    gaugeY.axis().orient("in")
            .normalize(true)
            .ticks(12)
            .tickSubdivide(10)
            .tickSize(8, 5, 10)
            .tickPadding(1)
            .scale(d3.scale.linear()
                    .domain([-1000, 1000])
                    .range([-3*Math.PI/4, 3*Math.PI/4]));
    				
    // gaugeZ		
    var gaugeZ = iopctrl.arcslider()
            .radius(75)
            .events(false)
            .indicator(iopctrl.defaultGaugeIndicator);
    gaugeZ.axis().orient("in")
            .normalize(true)
            .ticks(12)
            .tickSubdivide(10)
            .tickSize(8, 5, 10)
            .tickPadding(1)
            .scale(d3.scale.linear()
                    .domain([-1000, 1000])
                    .range([-3*Math.PI/4, 3*Math.PI/4]));
    				
    
    // segDisplayX
    var segDisplayX = iopctrl.segdisplay()
            .width(35)
            .digitCount(3)
            .negative(true)
            .decimals(0);
    svgX.append("g")
            .attr("class", "segdisplay")
            .attr("transform", "translate(105, 140)")
            .call(segDisplayX);
    svgX.append("g")
            .attr("class", "gauge")
            .call(gaugeX);
            		
    // segDisplayY	
    var segDisplayY = iopctrl.segdisplay()
            .width(35)
            .digitCount(3)
            .negative(true)
            .decimals(0);
    svgY.append("g")
            .attr("class", "segdisplay")
            .attr("transform", "translate(105, 140)")
            .call(segDisplayY);
    svgY.append("g")
            .attr("class", "gauge")
            .call(gaugeY);
    
    // segDisplayZ
    var segDisplayZ = iopctrl.segdisplay()
            .width(35)
            .digitCount(3)
            .negative(true)
            .decimals(0);
    svgZ.append("g")
            .attr("class", "segdisplay")
            .attr("transform", "translate(105, 140)")
            .call(segDisplayZ);
    svgZ.append("g")
            .attr("class", "gauge")
            .call(gaugeZ);
    
    segDisplayX.value(0);
    gaugeX.value(0);
    
    segDisplayY.value(0);
    gaugeY.value(0);
    
    segDisplayZ.value(0);
    gaugeZ.value(0);
	
    var socket = io.connect('http://localhost:4200');
    socket.on('acceleration', function(msg){
    var dataArray = msg.split(':');
    var date = new Date();
    var xVal = parseFloat(dataArray[0]);
    var yVal = parseFloat(dataArray[1]);
    var zVal = parseFloat(dataArray[2]);
    $('#xVal').text('x: ' + xVal);
    $('#yVal').text('y: ' + yVal);
    $('#zVal').text('z: ' + zVal);
    $('#time').text('time: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
	
    // Values		
    segDisplayX.value(xVal);
    gaugeX.value(xVal);
    
    segDisplayY.value(yVal);
    gaugeY.value(yVal);
    
    segDisplayZ.value(zVal);
    gaugeZ.value(zVal);
    });
    });