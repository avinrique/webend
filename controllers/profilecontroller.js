const User = require('./../models/usermodel')

exports.getprofilecontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        const Userprofile = await User.findById({_id : req.user.id})
        if(!Userprofile){
            console.log("no data found")
        }else{
            
            res.render('profile' ,{name : Userprofile.fname  ,username : Userprofile.email, email : Userprofile.username , work : Userprofile.occupation  , pic : Userprofile.inageurl , website : Userprofile.website ,github : Userprofile.github, twitter : Userprofile.twitter, facebook : Userprofile.facebook , instagram : Userprofile.instagram,address : Userprofile.address ,phone :Userprofile.phone })
        }
    }else{
        res.redirect('/')
    } 
}

exports.getprofile_editcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        
        const Userprofile = await User.findById({_id : req.user.id})
        if(!Userprofile){
            console.log("no data found")
        }else{
            
            res.render('profile_edit' ,{name : Userprofile.fname  ,username : Userprofile.email, email : Userprofile.username , work : Userprofile.occupation  , pic : Userprofile.inageurl , website : Userprofile.website ,github : Userprofile.github, twitter : Userprofile.twitter, facebook : Userprofile.facebook , instagram : Userprofile.instagram,address : Userprofile.address ,phone :Userprofile.phone })
        }
    }else{
        res.redirect('/')
    } 
}
exports.profile_editcontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        console.log(req.body)
        console.log("------------------------"+req.body.image+"------------------------------")
        const UpadteProfile = await User.findOneAndUpdate({_id : req.user.id}, {
            
            fname : req.body.name  , email : req.body.username , occupation : req.body.work  , website : req.body.website ,github : req.body.github, twitter : req.body.github, facebook : req.body.facebook , instagram : req.body.instagram ,address : req.body.address , phone :req.body.number 

        })
        if(!UpadteProfile){
            console.log("profile not updated")
        }else{
            console.log(UpadteProfile)
            res.redirect('/profile')
        }

        
        




      }else{
          res.redirect('/')
      }
}






exports.getchangepasscontrol =async(req,res)=>{
    if(req.isAuthenticated()){
        const googleUSer =await User.findById({_id :req.user.id})
        
        if(!googleUSer.googleId || googleUSer.googleId == null ){
            res.render('changepass')
        }else{
            res.render("googleusererror",{errormsg : "You are logged in using google"})
        }
        
    }else{

    }

 
}
exports.changepasscontrol = async(req,res)=>{
    if(req.isAuthenticated()){
        if(req.body.newpassword == req.body.confirmpassword){

      
        const UpdatePassword = await User.findById({_id :req.user.id})
        console.log(UpdatePassword)
        if(!UpdatePassword){
            console.log('cannot get the user to update passsword')
        }else{
            UpdatePassword.changePassword(req.body.oldpassword, req.body.newpassword, function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('password updated')
                    res.redirect('/profile')
                }
            })
        }
    }else{
        res.render('changepass',{errormsg : "password not mached"})
    }
    }else{
        res.redirect('/')
    }

 
}

 


