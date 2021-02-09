const express = require('express')
const router = express.Router()
const ItemTypesController = require('../Controllers/ItemTypesController')

 router.post('/AddItemType', ItemTypesController.AddItemType);
router.patch('/UpdateItemType/:itemTypeId', ItemTypesController.UpdateItemType);
 router.delete('/DeleteItemType/:itemTypeId', ItemTypesController.DeleteItemType);
 router.get('/', ItemTypesController.showItemTypes);


module.exports = router