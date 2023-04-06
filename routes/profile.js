const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const profilecontroller =  require('./../controllers/profilecontroller')

router.route("/").get(profilecontroller.getprofilecontrol)
router.route("/profile_edit").get(profilecontroller.getprofile_editcontrol).post(profilecontroller.profile_editcontrol)
router.route("/changePassword").get(profilecontroller.getchangepasscontrol).post(profilecontroller.changepasscontrol)
module.exports=router
