const mongoose  = require("mongoose");
var validator = require('validator');
const BookmeetSchema = new mongoose.Schema({
mmet : {
    type : mongoose.Schema.objectId ,
    ref : 'Meeting'
},
user : {
    type : mongoose.Schema.objectId ,
    ref : 'User'
},
joinedDate : {
    type : Date,
    default : Date.now()
},
attending : {
    type : Boolean , 
    default : true
}



})
const Meeting =  mongoose.model('Meeting', MeetingSchema)
module.exports = Meeting