const express = require('express')
const router = express.Router()
const ItemController = require('../Controllers/ItemsController')

router.post('/AddItem', ItemController.AddItem);
router.patch('/EditItem/:itemId', ItemController.UpdateItem);
router.delete('/DeleteItem/:itemId', ItemController.DeleteItem);


module.exports = router