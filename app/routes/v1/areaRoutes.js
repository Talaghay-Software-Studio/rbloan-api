const express = require('express');
const router = express.Router();
const areaController = require('../../controllers/v1/areaController');

router.post('/', areaController.createArea);
router.get('/', areaController.getAllArea);
router.get('/search/', areaController.getArea);
router.put('/update/', areaController.updateArea);
router.delete('/delete/', areaController.deleteArea);

module.exports = router;
