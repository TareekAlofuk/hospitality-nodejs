const express = require('express')
const router = express.Router()
const ItemController = require('../Controllers/ItemsController')
const fs = require('fs');

router.post('/Add', ItemController.AddItem);
router.post('/UploadImage', ItemController.UploadImage);
router.patch('/Update/:itemId', ItemController.UpdateItem);
router.delete('/Delete/:itemId', ItemController.DeleteItem);
router.get('/', ItemController.showItems);
router.get('/:itemId', ItemController.showItem);



module.exports = router