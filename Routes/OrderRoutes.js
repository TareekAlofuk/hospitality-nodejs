const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/OrderController')

router.post('/Add', OrderController.addOrder);
router.patch('/Update/:_id', OrderController.updateOrder);
router.patch('/UpdateStatus/:_id', OrderController.updateOrderStatus);
router.delete('/Delete/:_id', OrderController.deleteOrder);
router.get('/', OrderController.showOrders);
// router.get('/:_id', OrderController.showOrder);
router.get('/showClientOrders/:userId', OrderController.showClientOrders);
router.get('/Completed', OrderController.showCompletedOrder);
router.get('/Underway', OrderController.showUnderwayOrder);
router.get('/Waiting', OrderController.showWaitingOrder);
router.get('/AllClientsReport', OrderController.allClientsReport);


module.exports = router