const User = require('../models/usermodel')
const Events = require('./../models/eventsmodel')
const UserData = require('./../models/reviewmodel')
exports.getreviewcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        const GetReviews = await UserData.find()
        res.render('review', {data:GetReviews , eventid : req.params.id})
    }else{
        
    }
    }
    exports.reviewcontrol = async(req,res)=>{
    console.log(req.params.id)
    
        const Reviewupdate = await  UserData.create({review : req.body.review ,
            rating : req.body.rating ,
            event : req.params.id,
            user: req.user.id })
            res.redirect('/events')
        }