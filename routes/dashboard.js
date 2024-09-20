const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const dashboardcontroller =  require('./../controllers/dashboardcontroller')

router.route("/").get(dashboardcontroller.getcontrol)
module.exports=router
