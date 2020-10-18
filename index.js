const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = '5000';

const config = require('./config/key');

const {User} = require('./model/User');
const mongoose = require('mongoose');

console.log(config);

mongoose.connect(config.mongoURL);
var db = mongoose.connection
.on('error', function(){
    console.log('Connection Failed!');
})
.once('open', function() {
    console.log('Connected!');
});

// app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.post('/register', (req,res) => {
    console.log("atest");
    // 회원가입 정보
    const user = new User(req.body);
    user.save((err,doc) => {
        if(err) return res.json({success : false,err});
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
	console.log(`express is running on ${port}`);
})
