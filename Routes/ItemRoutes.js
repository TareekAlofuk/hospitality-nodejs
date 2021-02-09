const express = require('express')
const router = express.Router()
const ItemController = require('../Controllers/ItemsController')

router.post('/AddItem', ItemController.addItem);


module.exports = router