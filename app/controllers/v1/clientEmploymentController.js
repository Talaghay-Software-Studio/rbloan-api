const ClientEmployment = require("../../models/clientEmployment");

const clientEmploymentController = {
    createClientEmployment: (req, res) => {
      const { client_id, company_name, income, status, years, address, contact_number, head } =
        req.body;
  
      const newClientEmployment = new ClientEmployment(
        null,
        client_id, 
        company_name, 
        income, status, 
        years, address, 
        contact_number, 
        head 
      );
  
      ClientEmployment.createClientEmployment(newClientEmployment)
        .then((clientEmploymentId) => {
          res
            .status(201)
            .json({ id: clientEmploymentId, message: "Client Employment created successfully" });
        })
        .catch((err) => {
          console.log(err); // Add this line to print the error.
          res.status(500).json({ error: "Failed to create client Employment" });
        });
    },  

    updateClientEmployment: (req, res) => {
        const clientEmploymentId = parseInt(req.query.id);
        const { client_id, company_name, income, status, years, address, contact_number, head } = req.body;
      
        const updatedClientEmployment = new ClientEmployment(
          clientEmploymentId,
          client_id, 
        company_name, 
        income, 
        status, 
        years, 
        address, 
        contact_number, 
        head 
        );
      
        ClientEmployment.updateClientEmployment(updatedClientEmployment)
          .then((success) => {
            console.log("Update Success:", success);
            if (success) {
              res.json({ message: "Client Employment updated successfully" });
            } else {
              res.status(404).json({ error: "Client Employment not found" });
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
            res.status(500).json({ error: "Failed to update client Employment" });
          });
      },
      
      
      deleteClientEmployment: (req, res) => {
        const clientEmploymentId = parseInt(req.query.id);
    
        ClientEmployment.deleteClientEmployment(clientEmploymentId)
          .then((success) => {
            if (success) {
              res.json({ message: "Client Employment deleted successfully" });
            } else {
              res.status(404).json({ error: "Client Employment not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to delete client Employment" });
          });
      },
}

module.exports = clientEmploymentController;
