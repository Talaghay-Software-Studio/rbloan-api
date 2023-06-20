const express = require('express');
const router = express.Router();
const clientBusinessController = require('../../controllers/v1/clientBusinessController');

router.post("/", clientBusinessController.createClientBusiness);
router.put('/update/', clientBusinessController.updateClientBusiness);
router.delete('/delete/', clientBusinessController.deleteClientBusiness);

module.exports = router;
