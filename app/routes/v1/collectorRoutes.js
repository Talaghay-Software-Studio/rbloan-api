const express = require('express');
const router = express.Router();
const collectorController = require('../../controllers/v1/collectorController');

router.post('/', collectorController.createCollector);
router.get('/', collectorController.getAllCollector);
router.get('/search/', collectorController.getCollector);
router.put('/update/', collectorController.updateCollector);
router.delete('/delete/', collectorController.deleteCollector);

module.exports = router;
