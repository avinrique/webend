exports.getcontrol = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('home', {logged_in :"false"
    })
    }
    else{
        res.render('home' ,{logged_in :"true"
        })
    }
    
}
exports.getaboutcontrol = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('about',{logged_in :"false"
    })
    }
    else{
        res.render('about',{logged_in :"true"
    })
    }
    
}
exports.getgame = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('game')
    }
    else{
        res.render('game')
    }
    
}
exports.getprojects = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('projects' , {logged_in : false})
    }
    else{
        res.render('projects' , {
            logged_in : true
        })
    }
    
}
exports.getprices = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('prices' , {logged_in : false})
    }
    else{
        res.render('prices' , {
            logged_in : true
        })
    }
    
}