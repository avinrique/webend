const mongoose  = require("mongoose");
var validator = require('validator');
const EventsSchema = new mongoose.Schema({
//events data model,
    name : {
        type :String , 
        required : true , 
        default : "N  /  A"
    },
    description : {
        type : String , 
        maxlength : 1000 ,
        required : true
    } , 
    difficulty : {
        type : String ,
        
    },
    duration : {
        type : Number ,

    },
    grpsize : {
        type :Number , 
        max : 8 ,
        min : 1
    },
  //  
  startLocation : {
      type: {
          type: String,
         default : 'Point',
         enunm : ['Point']
      },
      cordinates : [Number],
      address : String,
      description : String


  },
 

//create and end date of event    
    create : {
        type : Date , 
        default : Date.now()
    },
    end_date :{
        type : Date ,
    },



// rating and reviews


    avgRating : {
         type : Number ,
         min : 1 ,
         max : 5 ,
         set : val => Math.round(val*10)/10
    }
    ,
    nRating  : {
        type : Number
    }
  
},  {
    toJSON : {virtuals : true},
    toObject :{virtuals : true}
})
EventsSchema.virtual('reviews',{
    ref : 'UserData' ,
    foreignField : 'event',
    localField : "_id"
})
const Events =  mongoose.model('Events', EventsSchema)
module.exports = Events