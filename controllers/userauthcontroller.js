const User = require('./../models/usermodel')
const sendEmails = require('./../utils/email')
const crypto =  require('crypto')
exports.getforgotcontrol = async(req,res)=>{
    res.render('forgotpass' ,{ errormsg :""})
}

exports.forgotcontrol = async(req,res)=>{
    

    const googleUSer =await User.findOne({username :req.body.email})
    if(googleUSer == null){
        console.log("shitman the entered email was incorrect")
        res.redirect("/")

    }else{
       
        if(!googleUSer.googleId || googleUSer.googleId == null ){
            const user =  await User.findOne({username : req.body.email})
            console.log(user)
            if(!user){
                console.log('no user found')
                res.render("forgotpass",  {errormsg : "no account with the provided email "} )
            }
            else{
                const resetToken = user.createpasswordresettoken();
                await user.save({validateBeforeSave : false})
                console.log(resetToken + "its from the auth route forgot password route")
                const reseturl = `localhost:3001/user/resetpassword/${resetToken}`
                console.log()
                try{
                 await sendEmails({
                     email  : req.body.email ,
                     subject : reseturl
                 })
                 console.log("i did make it")
                 res.redirect('/')
                }catch(error){
                    console.log(error)
                    console.log("error but dont know why")
                    user.passwordresettoken = undefined 
                    user.passwordresetdate = undefined
                    await user.save({validateBeforeSave : false})
                    
                }
            }
        }else{
            res.render('googleusererror',{errormsg : "User was logged in via google, so no password was created"})
        }
    }
 


    

 
}
exports.getresetcontrol = async(req,res)=>{
    const hashedtoken = crypto.createHash('sha256').update(req.params.id).digest('hex')
    console.log(hashedtoken)
    const users = await User.findOne({passwordresettoken : hashedtoken , passwordresetdate : {$gt : Date.now()}})
    console.log(users)
    if(!users){
        console.log("url not valid")
        res.redirect('/')
    }else{
        res.render('resetpass' , {resttoken : req.params.id})
    }
}


exports.resetcontrol = async(req,res)=>{

  const hashedtoken = crypto.createHash('sha256').update(req.params.id).digest('hex')
    console.log(hashedtoken)
    const users = await User.findOne({passwordresettoken : hashedtoken , passwordresetdate : {$gt : Date.now()}})
    console.log(users)
    if(!users){
        console.log("url not valid")
        res.redirect('/')
    }else{
       if(req.body.password == req.body.passcode){
        users.setPassword(req.body.password, function(err, user){ 
            // it's done here, I can redirect
            console.log(user._id)
            if(err){
                console.log(err)
            }else{
                User.findByIdAndUpdate({_id : user._id } , {hash : user.hash , salt : user.salt },(err,result)=>{
                    if(err){
                        console.log(err)
                    }else{
                        res.redirect('/')
                    }
                })
            }
        })
       }else{
           res.send("resetpass", {resettoken : "",errormsg : "password did not mached"})
       }
    }
}



