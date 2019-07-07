var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var monk=require("monk");
var should = require("should");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SerialPort = require("serialport").SerialPort;
var dateFormat = require('dateformat');
var mongoose = require('mongoose');

var db = monk('localhost/WaspMote');
should.exists(db);
var collection = db.get("acceleration");
should.exists(collection);

mongoose.connect('mongodb://localhost/passport');

server.listen(4200);

var serialPort = new SerialPort("COM3", {
    baudrate: 115200,
    parser: require("serialport").parsers.readline("\n")
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);

// db router bağlantısı
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// Web Socket
io.on('connection', function(socket)
{
    console.log('Bir kullanıcı bağlandı');

    socket.on('disconnect', function()
    {
        console.log('Kullanıcı ayrıldı...');
    });
});
// db ye yaz
// Serial Port Operations
serialPort.on("open", function ()
{
    // Seri porttan okuma
    serialPort.on('data', function(data)
    {
        var date = new Date();
        var dataArray = data.split(':');
        var dataArray2 = data.split('|');
        var dataArray3 = data.split('~');

        // Tüm istemcilere gönder
        io.emit('acceleration', data);
        // MongoDB ye kaydet...
        collection.insert({"time" : date,
        "x": dataArray[0],
        "y": dataArray[1],
        "z": dataArray[2],
        "temp":parseFloat(dataArray2[1]).toFixed(3),
        "batteryLevel":dataArray3[1],
        "batteryVolt":parseFloat(dataArray3[2]).toFixed(4)}, function(err, doc)
        {
            if(err)
            {
                console.log("HATA");
            }
        });
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
