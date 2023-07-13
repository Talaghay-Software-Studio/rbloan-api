const ClientCollateral = require("../../models/clientCollateral");

const clientCollateralController = {
  createClientCollateral: (req, res) => {
    const { client_id, collateral_type, value, ownership_info } = req.body;
  
    const newClientCollateral = new ClientCollateral(
      null,
      client_id,
      collateral_type,
      value,
      ownership_info
    );
  
    ClientCollateral.createClientCollateral(newClientCollateral, req.body.user_id) // Pass user_id from req.body
      .then((clientCollateralId) => {
        res.status(201).json({ id: clientCollateralId, message: "Client collateral created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create client collateral" });
      });
  },
  

  updateClientCollateral: (req, res) => {
    const clientCollateralId = parseInt(req.body.collateral_id);
    const { client_id, collateral_type, value, ownership_info, user_id } = req.body;
  
    const updatedClientCollateral = new ClientCollateral(
      clientCollateralId,
      client_id,
      collateral_type,
      value,
      ownership_info
    );
  
    updatedClientCollateral.id = clientCollateralId;
  
    console.log("Updated Client Collateral:", updatedClientCollateral);
    console.log("User ID:", user_id);
  
    ClientCollateral.updateClientCollateral(updatedClientCollateral, user_id)
      .then((success) => {
        if (success) {
          res.json({ message: "Client collateral updated successfully" });
        } else {
          res.status(404).json({ error: "Client collateral not found" });
        }
      })
      .catch((err) => {
        console.log(err); // Print the error for debugging purposes
        res.status(500).json({ error: "Failed to update client collateral" });
      });
  },
  
      
  deleteClientCollateral: (req, res) => {
    const clientCollateralId = parseInt(req.body.collateral_id);
  
    const userId = req.body.user_id; // Get user_id from req.body
  
    ClientCollateral.deleteClientCollateral(clientCollateralId, userId) // Pass user_id as an argument
      .then((success) => {
        if (success) {
          res.json({ message: "Client collateral deleted successfully" });
        } else {
          res.status(404).json({ error: "Client collateral not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete client collateral" });
      });
  },
  
}

module.exports = clientCollateralController;
