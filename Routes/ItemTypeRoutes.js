const express = require('express')
const router = express.Router()
const ItemTypesController = require('../Controllers/ItemTypesController')

 router.post('/Add', ItemTypesController.AddItemType);
router.patch('/Update/:itemTypeId', ItemTypesController.UpdateItemType);
 router.delete('/Delete/:itemTypeId', ItemTypesController.DeleteItemType);
 router.get('/', ItemTypesController.showItemTypes);


module.exports = router