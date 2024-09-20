const sendEmails = require('./../utils/email')
const User = require('./../models/usermodel')
const passport =  require('passport')
randurl = ""
exports.getlogincontrol = (req,res)=>{
    try {
        if(req.isAuthenticated()){
            res.redirect('/')
        }else{
            res.render('login' , {errormsg : ""})
        }
    } catch (error) {
        console.log(error)
    }   
 }
 exports.logincontrol =async (req,res)=>{
     
    try {
        const user =new User({
            username: req.body.email, 
            password: req.body.password
        })
       await req.login(user,function(err){
            if(err){
                console.log(err)
                res.render("invalid email or password ")
            }
            else{
                passport.authenticate('local')(req,res,function(){
                    res.redirect('/')
                })
            }
        })
    }catch(error){
        console.log(error)
        res.redirect('/')
    }
     
}










 exports.getsignupcontrol = (req,res)=>{
    res.render('signup' , {errormsg : ""})
 }

 exports.signupcontrol = async(req,res)=>{
   
    try {
        if(req.body.password == req.body.passcode){

            randurl = "ftdyrftchtrfxdct5exyyhrexct"

          
           badhttp = "http://localhost:3000/authenticate/verify/"+randurl
            try{
                await sendEmails({
                    email  : req.body.email ,
                    subject :badhttp
                })
                console.log("the email was sent tried to sent to be specific")

               }catch(error){
                   console.log(error)
                   console.log("maybe email was not sent")
               }
            
        await  User.register({email : req.body.username , username: req.body.email, active :"false" }, req.body.password,(err,user)=>{
            if(err){   
                console.log(err)
                res.render('signup',{errormsg : "email already taken"})
            }
            else{
                if(User.findOne({email : req.body.email , active : false}) != null ){
                    req.session.lau = req.body.email
                    console.log(req.lau)
                    console.log("sessions")
                }else{
                    passport.authenticate('local')(req,res,function(){
                        res.redirect('/')
                        })
                }
                
            }
            console.log(user)
        })
    }else{
        res.render('signup', {errormsg : "password didnot mached"})
    }
     } catch (error) {
         console.log(error)
         res.redirect('/')
     }
}
exports.getVerified = (req,res)=>{
    if(req.params.id == randurl){
        res.render('verify' , {
            check : req.params.id
        })
    }
console.log(req.params)
console.log(randurl)


}
exports.Verify = (req,res)=>{
    console.log("avin")
}

 