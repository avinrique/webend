const User = require('./../models/usermodel')
const Events = require('./../models/eventsmodel')
exports.getcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        const admin = await User.findOne({_id : req.user.id , usertype : "admin"})
        if(!admin || admin ==null){
           // res.redirect("/")
           res.render("admin")
        }else{
            res.render('admin')
        }
    }
    else{
        res.redirect('/')
    }
}
exports.createeventcontrol = async(req,res)=>{
    const Create_event = await Events.create({name  : req.body.name, 
        duration : req.body.duration , 
        difficulty : req.body.difficulty,
         grpsize :req.body.grpsize 
         ,description : req.body.description})
    if(!Create_event){
        console.log('events were not created due to errors')
    }else{
        console.log(Create_event)
        res.redirect("/events")
    }
}