const express = require('express');
const app = express();

// 방화벽 관련 module
// const cors = require('cors');

const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://193.122.126.92:27017/test');
var db = mongoose.connection
.on('error', function(){
    console.log('Connection Failed!');
})
.once('open', function() {
    console.log('Connected!');
});

// app.use(cors());

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`express is running on ${port}`);
})
