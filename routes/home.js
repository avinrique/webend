//constants 
const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const homecontroller =  require('./../controllers/homecontroller')
console.log("msnsdgubkuytddvsyh")

router.route("/").get(homecontroller.getcontrol)
router.route("/about").get(homecontroller.getaboutcontrol)
router.route("/game").get(homecontroller.getgame)

router.route("/login").get((req,res)=>{
    res.redirect('/')
})
router.route('/project').get(homecontroller.getprojects)
router.route('/prices').get(homecontroller.getprices)
module.exports=router
