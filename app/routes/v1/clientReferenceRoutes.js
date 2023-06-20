const express = require('express');
const router = express.Router();
const clientReferenceController = require('../../controllers/v1/clientReferenceController');

router.post("/", clientReferenceController.createClientReference);
router.put('/update/', clientReferenceController.updateClientReference);
router.delete('/delete/', clientReferenceController.deleteClientReference);

module.exports = router;
