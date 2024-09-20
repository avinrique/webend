const User = require('../models/usermodel')
const Events = require('./../models/eventsmodel')
const UserData = require('./../models/reviewmodel')
const APIfeatures = require('./../utils/apifeatures')
exports.getcontrol = async(req,res)=>{
    const features =  new APIfeatures(Events.find(), req.query).filters().sort().fields().proman()
    const EventsData = await features.query
    console.log(EventsData)
        if(req.isAuthenticated()){
            res.render('events',{data :EventsData, logged_in : false})
           }else{
            res.render('events',{data :EventsData , logged_in : true})
           }  
}
exports.idgetcontrol = async(req,res)=>{
    const getEvent = await Events.findOne({_id: req.params.id}).populate('reviews')
    if(!getEvent){
        console.log("cant get id of the event")
        res.redirect('/')
    }else{
        res.render('event',{data : getEvent, logged_in : true})
    }  
}
