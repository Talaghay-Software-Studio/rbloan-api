const express = require('express');
const router = express.Router();
const clientSpouseController = require('../../controllers/v1/clientSpouseController');

router.post("/", clientSpouseController.createClientSpouse);
router.put('/update/', clientSpouseController.updateClientSpouse);
router.delete('/delete/', clientSpouseController.deleteClientSpouse);

module.exports = router;
