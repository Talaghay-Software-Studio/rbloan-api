const ClientAddress = require("../../models/clientAddress");

const clientAddressController = {
  createClientAddress: (req, res) => {
    const { client_id, address_type, address_line1, address_line2, city, province, postal_code, country, user_id } =
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
  
    ClientAddress.createClientAddress(newClientAddress, user_id) // Pass user_id from req.body
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
    const clientAddressId = parseInt(req.body.address_id);
    const { client_id, address_type, address_line1, address_line2, city, province, postal_code, country, user_id } =
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
  
    ClientAddress.updateClientAddress(updatedClientAddress, user_id) // Pass user_id from req.body
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
    const clientAddressId = parseInt(req.body.address_id);
  
    ClientAddress.deleteClientAddress(clientAddressId, req.body.user_id) // Pass user_id from req.body
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
  }
  
}

module.exports = clientAddressController;
