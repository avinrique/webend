const express = require('express');
const router = express.Router()

const userauthcontroller =  require('./../controllers/userauthcontroller')
router.route("/forgotpassword").get(userauthcontroller.getforgotcontrol).post(userauthcontroller.forgotcontrol)
router.route("/resetpassword/:id").get(userauthcontroller.getresetcontrol).post(userauthcontroller.resetcontrol)
router.route("/verify/:id").get(userauthcontroller.getforgotcontrol)

module.exports=router