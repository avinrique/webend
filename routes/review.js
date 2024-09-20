const express = require('express');
const router = express.Router({mergeParams: true})
//calling homecontroller from controller
const reviewcontroller =  require('./../controllers/reviewcontroller')

router.route("/").get(reviewcontroller.getreviewcontrol).post(reviewcontroller.reviewcontrol)

module.exports=router

