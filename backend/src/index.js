const express 	= require('express'),
	http 		= require('http'),
	https 		= require('https'),
	bodyParser	= require('body-parser'),
	cookieParser= require('cookie-parser'),
	path		= require('path'),
	cors 		= require('cors'),
	fs          = require('fs');
		
		
//build config from params
const config = require('./config');
const {https:{ key, cert}, port, isHttps, serviceName} = config;
const credentials = {key, cert};

//setup app & its routes
const app = express();
global.app      = app;
 app.use(function(req, res, next) {
     res.setHeader("Access-Control-Allow-Origin", "*");
    next();
 });
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false,limit:'50mb'}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('./routes/')();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start http server
const httpServer = http.createServer(app);
httpServer.listen(port);
console.log(`[${serviceName}] http server listening at port ${port}`);


module.exports = { app };