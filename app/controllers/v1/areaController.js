const Area = require("../../models/area");

const areaController = {
  createArea: (req, res) => {
    const { branch_id, name, latitude, longitude, radius } = req.body;

    const newArea = new Area(branch_id, name, latitude, longitude, radius);

    Area.createArea(newArea)
      .then((areaId) => {
        res
          .status(201)
          .json({ id: areaId, message: "Area created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create area" });
      });
  },

  getAllArea: (req, res) => {
    Area.getAllAreas()
      .then((areas) => {
        res.json(areas);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve areas" });
      });
  },

  getArea: (req, res) => {
    const areaId = parseInt(req.query.id);

    Area.getAreaById(areaId)
      .then((area) => {
        if (area) {
          res.json(area);
        } else {
          res.status(404).json({ error: "Area not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve area" });
      });
  },

  updateArea: (req, res) => {
    const areaId = parseInt(req.query.id);
    const { branch_id, name, latitude, longitude, radius } = req.body;

    const updatedArea = new Area(
      areaId,
      branch_id,
      name,
      latitude,
      longitude,
      radius
    );

    console.log("Updating Area:", updatedArea);

    Area.updateArea(updatedArea)
      .then((success) => {
        if (success) {
          console.log("Area updated successfully");
          res.json({ message: "Area updated successfully" });
        } else {
          console.log("Area not found");
          res.status(404).json({ error: "Area not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to update Area:", err);
        res.status(500).json({ error: "Failed to update Area" });
      });
  },

  deleteArea: (req, res) => {
    const areaId = parseInt(req.query.id);
  
    console.log("Received delete request for area with ID:", areaId);
  
    Area.deleteArea(areaId)
      .then((success) => {
        if (success) {
          console.log("Area deleted successfully");
          res.json({ message: "Area deleted successfully" });
        } else {
          console.log("Area not found");
          res.status(404).json({ error: "Area not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to delete area:", err);
        if (err.sqlState === '23000' && err.code === 1451) {
          res.status(500).json({ error: "Area in use" });
        } else {
          res.status(500).json({ error: "Failed to delete area/area in use" });
        }
      });
  },  
}  

module.exports = areaController;

// module.exports = branchController;
