const ClientReference = require("../../models/clientReference");

const clientReferenceController = {
    createClientReference: (req, res) => {
        const { client_id, first_name, middle_name, last_name, contact_number } =
        req.body;
  
      const newClientReference = new ClientReference(
        null,
        client_id, 
        first_name, 
        middle_name, 
        last_name, 
        contact_number
      );
  
      ClientReference.createClientReference(newClientReference)
        .then((clientReferenceId) => {
          res
            .status(201)
            .json({ id: clientReferenceId, message: "Client Reference created successfully" });
        })
        .catch((err) => {
          console.log(err); // Add this line to print the error.
          res.status(500).json({ error: "Failed to create client Reference" });
        });
    },  

    updateClientReference: (req, res) => {
        const clientReferenceId = parseInt(req.query.id);
        const { client_id, first_name, middle_name, last_name, contact_number } = req.body;
      
        const updatedClientReference = new ClientReference(
          clientReferenceId,
        client_id, 
        first_name, 
        middle_name, 
        last_name, 
        contact_number
        );
      
        ClientReference.updateClientReference(updatedClientReference)
          .then((success) => {
            console.log("Update Success:", success);
            if (success) {
              res.json({ message: "Client Reference updated successfully" });
            } else {
              res.status(404).json({ error: "Client Reference not found" });
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
            res.status(500).json({ error: "Failed to update client Reference" });
          });
      },
      
      
      deleteClientReference: (req, res) => {
        const clientReferenceId = parseInt(req.query.id);
    
        ClientReference.deleteClientReference(clientReferenceId)
          .then((success) => {
            if (success) {
              res.json({ message: "Client Reference deleted successfully" });
            } else {
              res.status(404).json({ error: "Client Reference not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to delete client Reference" });
          });
      },
}

module.exports = clientReferenceController;
