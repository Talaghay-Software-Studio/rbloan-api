const express = require('express');
const router = express.Router();
const clientController = require('../../controllers/v1/clientController');

router.post('/', clientController.createClient);
router.get('/', clientController.getAllClient);
router.get('/search/', clientController.getClient);
router.put('/update/', clientController.updateClient);
router.delete('/delete/', clientController.deleteClient);
router.get('/newsearch/', clientController.getClientByNameOrAddress);

module.exports = router;
