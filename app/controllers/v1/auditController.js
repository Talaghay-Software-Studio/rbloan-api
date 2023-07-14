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
     
    
    //   getClientByNameOrAddress: (req, res) => {
    //     const { query, searchby } = req.query;
      
    //     const validSearchByValues = ["client", "address", "area", "collector"];
      
    //     if (!validSearchByValues.includes(searchby)) {
    //       return res.status(400).json({ error: "Invalid search value. client, address, area, collector are only accepted" });
    //     }
      
    //     Client.getClientsByQuery(query, searchby, req.body.user_id)
    //       .then((clients) => {
    //         if (clients.length) {
    //           res.json(clients);
    //         } else {
    //           res.status(404).json({ error: "No data found" });
    //         }
    //       })
    //       .catch((err) => {
    //         res.status(500).json({ error: "Failed to retrieve data" });
    //       });
    //   },  
      
    };
    
    module.exports = auditController;
    