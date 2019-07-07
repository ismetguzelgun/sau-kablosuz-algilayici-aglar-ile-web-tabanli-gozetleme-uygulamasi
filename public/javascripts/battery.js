var config1 = liquidFillGaugeDefaultSettings();
config1.circleColor = "#BCC1C7";
config1.textColor = "#BCC1C7";
config1.waveTextColor = "#CD8181";
config1.waveColor = "#E3D5C6";
config1.circleThickness = 0.2;
config1.textVertPosition = 0.2;
config1.waveAnimateTime = 1000;

var gauge2= loadLiquidFillGauge("fillgauge2", 0, config1);

var socket = io.connect('http://localhost:4200');
socket.on('acceleration', function(msg){
    var dataArray = msg.split('~');
    var date = new Date();
    var level = parseFloat(dataArray[1]);
    var volt = parseFloat(dataArray[2]);
    $('#volt').text('Volt: ' + volt.toFixed(2) + ' V');
      /*$('#xVal').text('x: ' + xVal);
      $('#yVal').text('y: ' + yVal);
      $('#time').text('time: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
    */
    gauge2.update(level);
});
