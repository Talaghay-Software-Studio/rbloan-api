const express = require('express');
const router = express.Router();
const auditController = require('../../controllers/v1/auditController');

router.get('/', auditController.getAllAudit);
router.get('/search/', auditController.getAuditBy);

module.exports = router;
