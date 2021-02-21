const express = require('express')
const router = express.Router()
const AdminController = require('../Controllers/AdminController')
const fs = require('fs');

router.post('/Add', AdminController.AddAdmin);
router.patch('/Update/:adminId', AdminController.UpdateAdmin);
router.delete('/Delete/:adminId', AdminController.DeleteAdmin);
router.get('/', AdminController.showAdmins);


module.exports = router