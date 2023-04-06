const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const authenticatecontroller =  require('./../controllers/authenticatecontroller')

router.route("/login").get(authenticatecontroller.getlogincontrol).post(authenticatecontroller.logincontrol)
router.route("/signup").get(authenticatecontroller.getsignupcontrol).post(authenticatecontroller.signupcontrol)
router.route("/verify/:id").get(authenticatecontroller.getVerified)
module.exports=router
