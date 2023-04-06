const mongoose  = require("mongoose");
var validator = require('validator');
const User = require("./usermodel");
const Events = require('./eventsmodel')
const UserDataSchema = new mongoose.Schema({
    review : {
        type : String
    },
    rating :{
        type : Number,
        min :1 ,
        max : 5
    },
    reviewDate : {
        type : Date,
        default : Date.now()
    },
    event : {
        type : mongoose.Schema.ObjectId,
        ref : 'Events'
    },
    user :{
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
}, {
    toJSON : {virtuals : true},
    toObject :{virtuals : true}
})
UserDataSchema.pre(/^find/,function(next){
    this.populate({
        path: 'user',
        select : 'name username'
    })
    next()
})
UserDataSchema.index({event : 1 , user :1},{unique :true} )
UserDataSchema.statics.calcAverageRating =async function(eventId){
    console.log(eventId + "this id is needed")
   const stats = await  this.aggregate([
        {
            $match : {event : eventId}
        },{
            $group : {
                _id : "$event",
                nRating : {$sum : 1},
                avgRating : {$avg : '$rating'}
            }
        }
    ])
    console.log(stats)
    if(stats.lengthb> 0){
        await Events.findByIdAndUpdate({_id : eventId},{
            nRating : stats[0].nRating,
            avgRating : stats[0].avgRating
        })

    }else{
        await Events.findByIdAndUpdate({_id : eventId},{
            nRating : 0 ,
            avgRating : 0
        })
    }
 
}
UserDataSchema.post('save', function(){
    this.constructor.calcAverageRating(this.event)
    
})
UserDataSchema.pre(/^findOneAnd/ , async function(next){
    this.r = await this.findOne();
    next()
})

UserDataSchema.post(/^findOneAnd/, async function(){
    await this.r.constructor.calcAverageRating(this.r.event)
})
const UserData =  mongoose.model('UserData', UserDataSchema)
module.exports = UserData