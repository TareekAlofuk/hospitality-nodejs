const express = require('express')
const router = express.Router()
const ItemController = require('../Controllers/ItemsController')

router.post('/AddItem', ItemController.AddItem);
router.patch('/UpdateItem/:itemId', ItemController.UpdateItem);
router.delete('/DeleteItem/:itemId', ItemController.DeleteItem);
router.get('/', ItemController.showItems);
router.get('/:itemId', ItemController.showItem);


module.exports = router