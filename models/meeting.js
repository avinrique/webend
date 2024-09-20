const mongoose  = require("mongoose");
var validator = require('validator');
const MeetingSchema = new mongoose.Schema({
    name : {
        type :String , 
        required : true , 
        default : "N  /  A"
    },
    description : {
        type : String , 
        maxlength : 1000 ,
        required : true
    },
    startingTime :{
        type : Date 
    }, duration :{
        type : Number,
        max : 6
    },
    endingTime :{
        type : Date ,
    },
    usertype : {
        type : String ,
        enum : ['official']
    },
    link : {
        type : String
    },
    workplace : {
        type : String ,
        enum  : ['online' , 'in people'] ,
        default : 'online'
    },

})
const Meeting =  mongoose.model('Meeting', MeetingSchema)
module.exports = Meeting