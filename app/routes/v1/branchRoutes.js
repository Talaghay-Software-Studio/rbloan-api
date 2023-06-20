const express = require('express');
const router = express.Router();
const branchController = require('../../controllers/v1/branchController');

router.post('/', branchController.createBranch);
router.get('/', branchController.getAllBranch);
router.get('/search/', branchController.getBranch);
router.put('/update/', branchController.updateBranch);
router.delete('/delete/', branchController.deleteBranch);

module.exports = router;
