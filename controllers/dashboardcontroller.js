exports.getcontrol = (req,res)=>{
    if(req.isAuthenticated()){
        res.render('dashboard',{logged_in : false})
    }
    else{
        res.render('dashboard',{logged_in : true})
    }
    
}