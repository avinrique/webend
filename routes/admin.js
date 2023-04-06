const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const admincontroller =  require('./../controllers/admincontroller')

router.route("/").get(admincontroller.getcontrol).post(admincontroller.createeventcontrol)
module.exports=router
