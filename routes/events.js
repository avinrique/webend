const express = require('express');
const router = express.Router()
//calling homecontroller from controller
const eventscontroller =  require('./../controllers/eventscontroller')
const reviewrouter =  require('./../routes/review')


router.route("/").get(eventscontroller.getcontrol)
router.use("/:id/reviews" ,reviewrouter)
router.route("/:id").get(eventscontroller.idgetcontrol)
module.exports=router
