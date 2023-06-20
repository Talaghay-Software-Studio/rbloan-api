const express = require('express');
const router = express.Router();
const clientAddressController = require('../../controllers/v1/clientAddressController');

router.post("/", clientAddressController.createClientAddress);
router.put('/update/', clientAddressController.updateClientAddress);
router.delete('/delete/', clientAddressController.deleteClientAddress);

module.exports = router;
