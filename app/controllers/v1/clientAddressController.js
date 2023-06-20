const ClientAddress = require("../../models/clientAddress");

const clientAddressController = {
    createClientAddress: (req, res) => {
      const { client_id, address_type, address_line1, address_line2, city, province, postal_code, country } =
        req.body;
  
      // Check if address_type is valid
      if (address_type !== 'provincial' && address_type !== 'permanent') {
        return res.status(400).json({ error: "Only provincial or permanent address types are accepted" });
      }
  
      const newClientAddress = new ClientAddress(
        null,
        client_id, 
        address_type, 
        address_line1, 
        address_line2, 
        city, 
        province, 
        postal_code, 
        country
      );
  
      ClientAddress.createClientAddress(newClientAddress)
        .then((clientAddressId) => {
          res
            .status(201)
            .json({ id: clientAddressId, message: "Client address created successfully" });
        })
        .catch((err) => {
          console.log(err); // Add this line to print the error.
          res.status(500).json({ error: "Failed to create client address" });
        });
    },  

    updateClientAddress: (req, res) => {
        const clientAddressId = parseInt(req.query.id);
        const { client_id, address_type, address_line1, address_line2, city, province, postal_code, country } =
          req.body;
    
        // Check if address_type is valid
        if (address_type !== 'provincial' && address_type !== 'permanent') {
          return res.status(400).json({ error: "Only provincial or permanent address types are accepted" });
        }
    
        const updatedClientAddress = new ClientAddress(
          clientAddressId,
          client_id, 
          address_type, 
          address_line1, 
          address_line2, 
          city, 
          province, 
          postal_code, 
          country
        );
    
        ClientAddress.updateClientAddress(updatedClientAddress)
          .then((success) => {
            if (success) {
              res.json({ message: "Client Address updated successfully" });
            } else {
              res.status(404).json({ error: "Client Address not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to update client address" });
          });
      },  
      
      deleteClientAddress: (req, res) => {
        const clientAddressId = parseInt(req.query.id);
    
        ClientAddress.deleteClientAddress(clientAddressId)
          .then((success) => {
            if (success) {
              res.json({ message: "Client Address deleted successfully" });
            } else {
              res.status(404).json({ error: "Client Address not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to delete client address" });
          });
      },
}

module.exports = clientAddressController;
