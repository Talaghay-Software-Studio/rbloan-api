const express = require('express');
const router = express.Router();
const clientDependentsController = require('../../controllers/v1/clientDependentsController');

router.post("/", clientDependentsController.createClientDependents);
router.put('/update/', clientDependentsController.updateClientDependents);
router.delete('/delete/', clientDependentsController.deleteClientDependents);

module.exports = router;
