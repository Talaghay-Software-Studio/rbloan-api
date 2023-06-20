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

    ClientCollateral.createClientCollateral(newClientCollateral)
      .then((clientCollateralId) => {
        res.status(201).json({ id: clientCollateralId, message: "Client collateral created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create client collateral" });
      });
  },

  updateClientCollateral: (req, res) => {
    const clientCollateralId = parseInt(req.query.id);
    const { client_id, collateral_type, value, ownership_info } = req.body;
  
    const updatedClientCollateral = new ClientCollateral(
      clientCollateralId, // Assign to 'id' property instead of 'clientCollateralId'
      client_id,
      collateral_type,
      value,
      ownership_info
    );
  
    updatedClientCollateral.id = clientCollateralId; // Assign the 'clientCollateralId' to 'id' property
  
    ClientCollateral.updateClientCollateral(updatedClientCollateral)
      .then((success) => {
        if (success) {
          res.json({ message: "Client collateral updated successfully" });
        } else {
          res.status(404).json({ error: "Client collateral not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to update client collateral" });
      });
  },
  
      
      deleteClientCollateral: (req, res) => {
        const clientCollateralId = parseInt(req.query.id);
    
        ClientCollateral.deleteClientCollateral(clientCollateralId)
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
