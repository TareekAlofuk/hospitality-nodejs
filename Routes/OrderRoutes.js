const express = require('express')
const router = express.Router()
const OrderController = require('../Controllers/OrderController')

router.post('/Add', OrderController.AddOrder);
router.patch('/Update/:orderId', OrderController.UpdateOrder);
router.delete('/Delete/:orderId', OrderController.DeleteOrder);
router.get('/', OrderController.showOrders);


module.exports = router