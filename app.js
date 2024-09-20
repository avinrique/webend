//modules
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const User = require('./models/usermodel')
var validator = require('validator');
const server = require('http').createServer(app);
const io = require("socket.io")(server,{cors: {origin:"*"}});
// declaring passport and sessions

const session = require('express-session')
const _ = require("lodash");
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')


const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')
/*






*/

// setting view engine to ejs
app.set('view engine', 'ejs')

//database configure ("monodb/mongoose")
const mongoose = require('mongoose')
const dbname = "cmakingapp"
const dburl = "mongodb+srv://avin:avin@cluster0.fhxczjk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl+dbname,
{useNewUrlParser: true},
{useCreateIndex :true}).then(()=>{
    console.log("connected to database")
})

//multer
var fs = require('fs');
var path = require('path');
const multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });


//using middlewares
//app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())
app.use(xss())
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
/*



*/


//configuring sessions
app.use(session({
    secret: 'this is my secretenviroment file',
    resave : false,
    saveUninitialized: false ,
    secure : true , 
    httpOnly : true
}))
//using passport middlewares
app.use(passport.initialize());
app.use(passport.session())
const { send, type } = require('express/lib/response');
const { authenticate } = require('passport');
const { result } = require('lodash');
const { buffer } = require('stream/consumers');
passport.use(new LocalStrategy({usernameField : 'email'},User.authenticate()));

//using limiter to limit usages

const limiter = rateLimit({
  max : 100 ,
  windows : 60*60*1000,
  message : "crossed the limit"
})
app.use('/',limiter)

//serializing and deserializing passport


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//using passport (google sign in )Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:80/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, data ,profile, cb) {
    console.log(profile.emails[0].value + "1st")
    console.log(profile.id + "2nd")



















    User.findOne({username : profile.emails[0].value},(err,result)=>{
      console.log("this is where  it should go")
      console.log(result)
      if(err || result==null){
        console.log('it should go in this block' + result)
        User.findOrCreate({ googleId: profile.id }, function (err, user ) {
          if(err){
            console.log("error is here")
          }
         User.findOneAndUpdate({googleId: profile.id},{email : profile.displayName , fname: profile.displayName , imageurl : profile._json.picture , username: profile.emails[0].value }, (err,docs)=>{
            if(err){
              console.log("yes its error")
            }
            else{
              console.log(docs)
            }
          })
          return cb(err, user );
        });
      }else{   

        console.log('is it here')
        User.findOne({googleId : profile.id},(err,idres)=>{
          if(err){
            if(!result.username && idres){
              User.findOrCreate({ googleId: profile.id }, function (err, user ) {
                if(err){
                  console.log("error is here")
                }
               User.findOneAndUpdate({googleId: profile.id},{email : profile.displayName , fname: profile.displayName , imageurl : profile._json.picture , username: profile.emails[0].value }, (err,docs)=>{
                  if(err){
                    console.log("yes its error")
                  }
                  else{
                    console.log(docs)
                  }
                })
                return cb(err, user );
              })
            }else{
              result = null
              console.log("the error is handeled")
              return cb(err,result)
            }
           
          }
          else{
            if(result.username && !idres ){
              result = null
              console.log("the error is handeled")
              return cb(err,result)

            }else{

           

            User.findOrCreate({ googleId: profile.id }, function (err, user ) {
              if(err){
                console.log("error is here")
              }
             User.findOneAndUpdate({googleId: profile.id},{email : profile.displayName , fname: profile.displayName , imageurl : profile._json.picture , username: profile.emails[0].value }, (err,docs)=>{
                if(err){
                  console.log("yes its error")
                }
                else{
                  console.log(docs)
                }
              })
              return cb(err, user );
            }); }



          }
        })
   
      }
    })
   
  }
))


//routes for sign in with google
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile" , 'email' ,] })
);
app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
app.get('/logout', (req,res)=>{
req.logOut();
res.redirect('/')
})

//Routes handler
const home = require('./routes/home')
const dashboard = require('./routes/dashboard');
const events = require('./routes/events')
const authenticateing = require('./routes/authenticate')
const profile = require('./routes/profile')
const userauth = require('./routes/userauth')
const admin = require('./routes/admin')

/*


*/

//using routes middleware
app.use('/',home )
app.use('/dashboard',dashboard)
app.use('/events',events)
app.use('/authenticate',authenticateing)
app.use('/profile',profile)
app.use('/user' , userauth)
app.use('/admin' , admin)
/*
*/
app.all('*', (req,res,next)=>{
    res.render('pagenotfound')
    next();
})

//export app.js for server
module.exports =  app
  /*
  url = "http://www.kite.com"
timeout = 5
try:
	request = requests.get(url, timeout=timeout)
	print("Connected to the Internet")
except (requests.ConnectionError, requests.Timeout) as exception:
	print("No internet connection.")
  */