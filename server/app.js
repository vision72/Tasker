const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config();
var app = express();

const connection_url = process.env.DB_URL;
const buildPath = path.join(__dirname, '..', 'build');

app.use(express.static(buildPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use(function(req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1214');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

mongoose.Promise = global.Promise;

// connecting to the database
mongoose
	.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch((err) => {
		console.log('Could not connect to the database, Exiting now...', err);
		process.exit();
	});

// listen for requests
app.listen(process.env.PORT || 1214, () => {});

require('./task.routes')(app);
