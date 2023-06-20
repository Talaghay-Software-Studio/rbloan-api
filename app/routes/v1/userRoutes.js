const express = require('express');
const router = express.Router();
const userController = require('../../controllers/v1/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/search/', userController.getUser);
router.put('/update/', userController.updateUser);
router.delete('/delete/', userController.deleteUser);

module.exports = router;
