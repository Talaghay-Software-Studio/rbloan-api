const Audit = require("../../models/audit");

const auditController = {
  getAllAudit: (req, res) => {
    Audit.getAllAudit(req.body.user_id) // Pass user_id from req.body
      .then((auditTrail) => {
        res.json(auditTrail);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve audit trail" });
      });
  },
     
    
  getAuditBy: (req, res) => {
    const { query, searchby } = req.query;

    const validSearchByValues = ["timestamp", "username", "full_name"];

    if (!validSearchByValues.includes(searchby)) {
      return res.status(400).json({ error: "Invalid search value. timestamp, username, full_name are only accepted" });
    }

    Audit.getAuditByQuery(query, searchby, req.body.user_id)
      .then((audits) => {
        if (audits.length) {
          res.json(audits);
        } else {
          res.status(404).json({ error: "No data found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve data" });
      });
  },
};
    
    module.exports = auditController;
    