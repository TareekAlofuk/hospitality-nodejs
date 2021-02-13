const express = require('express')
const router = express.Router()
const RoomsController = require('../Controllers/RoomsController')


router.get('/', RoomsController.showRooms);
router.post('/Add', RoomsController.AddRoom);
router.patch('/Update/:roomId', RoomsController.UpdateRoom);
router.delete('/Delete/:roomId', RoomsController.DeleteRoom);


module.exports = router