const express = require('express');
const router = express.Router();
const clientCollateralController = require('../../controllers/v1/clientCollateralController');

router.post("/", clientCollateralController.createClientCollateral);
router.put('/update/', clientCollateralController.updateClientCollateral);
router.delete('/delete/', clientCollateralController.deleteClientCollateral);

module.exports = router;
