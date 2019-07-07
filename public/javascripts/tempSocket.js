$(document).ready(function(){
      var gauges = [];
      
      function createGauge(name, label, min, max)
      {
        var config = 
        {
        	size: 150,
        	label: label,
        	min: undefined != min ? min : 0,
        	max: undefined != max ? max : 50,
        	minorTicks: 5
        }
        
        var range = config.max - config.min;
        config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
        config.redZones = [{ from: config.min + range*0.9, to: config.max }];
        
        gauges[name] = new Gauge(name + "GaugeContainer", config);
        gauges[name].render();
      }
      
      function createGauges()
      {
        createGauge("cpu", "ROOM");
      }
      
      function updateGauges(tempVal)
      {
        for (var key in gauges)
        {
        	var value = getRandomValue(gauges[key], tempVal)
        	gauges[key].redraw(value);
        }
      }
      
      function getRandomValue(gauge, tempVal)
      {
        var overflow = 0; //10;
        return tempVal;
      }
      
      
      createGauges();
      
      var socket = io.connect('http://localhost:4200');
      socket.on('acceleration', function(msg){
      var dataArray = msg.split('|');
      var date = new Date();
      var temp = parseFloat(dataArray[1]);
      $('#temprature').text('Sıcaklık: ' + temp);
      $('#time').text('Zaman:' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
      updateGauges(temp);
      });
      });