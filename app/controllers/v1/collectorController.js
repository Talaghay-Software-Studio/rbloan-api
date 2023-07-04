const Collector = require("../../models/collector");

const collectorController = {
  createCollector: (req, res) => {
    const { area_id, first_name, middle_name, last_name, contact_number } = req.body;

    const newCollector = new Collector(area_id, first_name, middle_name, last_name, contact_number );

    Collector.createCollector(newCollector)
      .then((collectorId) => {
        res
          .status(201)
          .json({ id: collectorId, message: "Collector created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create collector" });
      });
  },

  getAllCollector: (req, res) => {
    Collector.getAllCollector()
      .then((collector) => {
        res.json(collector);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve collector" });
      });
  },

  getCollector: (req, res) => {
    const collectorId = parseInt(req.query.id);

    Collector.getCollectorById(collectorId)
      .then((collector) => {
        if (collector) {
          res.json(collector);
        } else {
          res.status(404).json({ error: "Collector not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve collector" });
      });
  },

  updateCollector: (req, res) => {
    const collectorId = parseInt(req.query.id);
    const { area_id, first_name, middle_name, last_name, contact_number } = req.body;

    const updatedCollector = new Collector(
        collectorId,
        area_id, 
        first_name, 
        middle_name, 
        last_name, 
        contact_number
    );

    console.log("Updating Collector:", updatedCollector);

    Collector.updateCollector(updatedCollector)
      .then((success) => {
        if (success) {
          console.log("Collector updated successfully");
          res.json({ message: "Collector updated successfully" });
        } else {
          console.log("Collector not found");
          res.status(404).json({ error: "Collector not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to update Collector:", err);
        res.status(500).json({ error: "Failed to update Collector" });
      });
  },

  deleteCollector: (req, res) => {
    const collectorId = parseInt(req.query.id);
  
    console.log("Received delete request for area with ID:", collectorId);
  
    Collector.deleteCollector(collectorId)
      .then((success) => {
        if (success) {
          console.log("Collector deleted successfully");
          res.json({ message: "Collector deleted successfully" });
        } else {
          console.log("Collector not found");
          res.status(404).json({ error: "Collector not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to delete Collector:", err);
        if (err.sqlState === '23000' && err.code === 1451) {
          res.status(500).json({ error: "Collector in use" });
        } else {
          res.status(500).json({ error: "Failed to delete Collector/Collector in use" });
        }
      });
  },  
}  

module.exports = collectorController;
