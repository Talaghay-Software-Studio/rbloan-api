const ClientBusiness = require("../../models/clientBusiness");

const clientBusinessController = {
  createClientBusiness: (req, res) => {
    const { client_id, business_name, years, capital, stock, kind_of_business, daily_income, monthly, address, contact_number } =
      req.body;
  
    const newClientBusiness = new ClientBusiness(
      null,
      client_id, 
      business_name,
      years, 
      capital, 
      stock, 
      kind_of_business, 
      daily_income, 
      monthly, 
      address, 
      contact_number
    );
  
    ClientBusiness.createClientBusiness(newClientBusiness, req.body.user_id) // Pass user_id from req.body
      .then((clientBusinessId) => {
        res
          .status(201)
          .json({ id: clientBusinessId, message: "Client business created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create client business" });
      });
  },  

  updateClientBusiness: (req, res) => {
    const clientBusinessId = parseInt(req.body.business_id);
    const { client_id, business_name, years, capital, stock, kind_of_business, daily_income, monthly, address, contact_number } =
      req.body;
  
    const updatedClientBusiness = new ClientBusiness(
      clientBusinessId,
      client_id, 
      business_name, 
      years, 
      capital, 
      stock, 
      kind_of_business, 
      daily_income, 
      monthly, 
      address, 
      contact_number
    );
  
    ClientBusiness.updateClientBusiness(updatedClientBusiness, req.body.user_id) // Pass user_id from req.body
      .then((success) => {
        if (success) {
          res.json({ message: "Client business updated successfully" });
        } else {
          res.status(404).json({ error: "Client business not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to update client business" });
      });
  },  
      
  deleteClientBusiness: (req, res) => {
    const clientBusinessId = parseInt(req.body.business_id);
  
    ClientBusiness.deleteClientBusiness(clientBusinessId, req.body.user_id) // Pass user_id from req.body
      .then((success) => {
        if (success) {
          res.json({ message: "Client business deleted successfully" });
        } else {
          res.status(404).json({ error: "Client business not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete client business" });
      });
  }
  
}

module.exports = clientBusinessController;
