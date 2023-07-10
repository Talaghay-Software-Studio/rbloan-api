const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/v1/transactionController');

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getAllTransaction);
router.get('/search/', transactionController.getTransaction);
router.put('/update/', transactionController.updateTransaction);
router.delete('/delete/', transactionController.deleteTransaction);

module.exports = router;
