const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = '5000';

const config = require('./config/key');

const { auth } = require('./middleware/auth');
const { User } = require('./model/User');
const mongoose = require('mongoose');

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
app.use(cookieParser());

app.post('/api/user/register', (req,res) => {
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

app.post('/api/user/login',(req,res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email : req.body.email }, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당되는 유저가 없습니다."
            })
        }

        // 이메일 검증 후 비밀번호 검증.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess : true, message : '비밀번호가 틀렸습니다.'})
        })

        // 모든 인증 후 토큰 생성
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err);

            // 토큰을 저장한다. ( 쿠키 또는 로컬 스토리지 등 -> 나중에 정리 )
            res.cookie('x_auth', user.token)
                .status(200)
                .json( {loginSuccess : true, userId : user._id} )
        })
    })
})

app.get('/api/user/auth', auth , (req,res) => {
    console.log("test");
    // // 인증성공.
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0 ? false : true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/user/logout', auth , (req,res) => {
    User.findOneAndUpdate({_id : req.user._id},
        { token : "" }
    , (err, user) => {
        if(err) return res.json({ success: false, err});
        return res.status(200).send({
            success: true
        })
    })        
})