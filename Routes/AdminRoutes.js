const express = require('express')
const router = express.Router()
const AdminController = require('../Controllers/AdminController')
const fs = require('fs');


router.post('/Add' , AdminController.AddAdmin);
router.patch('/Update/:adminId', AdminController.UpdateAdmin);
router.delete('/Delete/:adminId', AdminController.DeleteAdmin);
router.get('/', AdminController.showAdmins);
router.post('/Login', AdminController.login); 
router.get('/DefaultAdmin', AdminController.AddDefaultAdmin);


module.exports = router