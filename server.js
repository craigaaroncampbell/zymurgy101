var app = require('express')();
var Authenticat = require('authenticat');
var mongoose = require('mongoose');
var connection = mongoose.createConnection(process.env.MONGOLAB_USERS_URI || 'mongodb://localhost/zymurgy_users_dev');
var authenticat = new Authenticat(connection);
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoURI = process.env.MONGOLAB_DATA_URI || 'mongodb://localhost/zymurgy_dev';

mongoose.connect(mongoURI); // for non-users resources that use mongoose methods rather than mongo straight-up

app.use('/api', authenticat.router);

var beersRouter = require(__dirname + '/routes/beers_routes.js');

var nonAPIRouter = require(__dirname + '/routes/non_api_routes.js');
app.use('/' , nonAPIRouter);

app.use('/api', beersRouter);

app.use('/api', authenticat.router);

app.use(function(req, res) {
	res.status(404).send('could not find file');
});

app.listen(PORT, function() {
	console.log('now pouring beer on port: ' + PORT);
});

