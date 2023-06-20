const express = require('express');
const router = express.Router();
const clientEmploymentController = require('../../controllers/v1/clientEmploymentController');

router.post("/", clientEmploymentController.createClientEmployment);
router.put('/update/', clientEmploymentController.updateClientEmployment);
router.delete('/delete/', clientEmploymentController.deleteClientEmployment);

module.exports = router;
