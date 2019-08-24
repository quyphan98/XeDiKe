const express = require("express");
const router = express.Router();
const tripController = require("./tripController");
const {authenticate,authorize} = require("../../../middlewares/auth")

router.post('/',authenticate,authorize(['driver']),tripController.createTrip)
router.get('/',tripController.getTrips)
router.get('/:tripId',tripController.getTripById)
router.delete(
  "/:tripId",
  authenticate,
  authorize(["driver"]),
  tripController.deleteTrip
);
router.put('/:tripId',authenticate,authorize(['driver']),tripController.updateTrip)
router.put('/book-trip/:tripId',authenticate,
// authorize(['passenger']),
  tripController.bookTrip)
  router.put('/:tripId',authenticate,authorize(['driver']),tripController.updateTrip)
router.put('/finishTrip/:tripId',authenticate,
// authorize(['passenger']),
  tripController.finishTrip)
module.exports = router;
