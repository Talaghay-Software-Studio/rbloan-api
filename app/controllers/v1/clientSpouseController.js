const ClientSpouse = require("../../models/clientSpouse");

const clientSpouseController = {
    createClientSpouse: (req, res) => {
        const { client_id, first_name, middle_name, last_name, date_of_birth, contact_number } =
        req.body;
  
      const newClientSpouse = new ClientSpouse(
        null,
        client_id, 
        first_name, 
        middle_name, 
        last_name, 
        date_of_birth,
        contact_number
      );
  
      ClientSpouse.createClientSpouse(newClientSpouse, req.body.user_id)
        .then((clientSpouseId) => {
          res
            .status(201)
            .json({ id: clientSpouseId, message: "Client Spouse created successfully" });
        })
        .catch((err) => {
          console.log(err); // Add this line to print the error.
          res.status(500).json({ error: "Failed to create client Spouse" });
        });
    },  

    updateClientSpouse: (req, res) => {
        const clientSpouseId = parseInt(req.body.spouse_id);
        const { client_id, first_name, middle_name, last_name, date_of_birth, contact_number } = req.body;
      
        const updatedClientSpouse = new ClientSpouse(
          clientSpouseId,
        client_id, 
        first_name, 
        middle_name, 
        last_name, 
        date_of_birth,
        contact_number
        );
      
        ClientSpouse.updateClientSpouse(updatedClientSpouse, req.body.user_id)
          .then((success) => {
            console.log("Update Success:", success);
            if (success) {
              res.json({ message: "Client Spouse updated successfully" });
            } else {
              res.status(404).json({ error: "Client Spouse not found" });
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
            res.status(500).json({ error: "Failed to update client Spouse" });
          });
      },
      
      
      deleteClientSpouse: (req, res) => {
        const clientSpouseId = parseInt(req.body.spouse_id);
    
        ClientSpouse.deleteClientSpouse(clientSpouseId, req.body.user_id)
          .then((success) => {
            if (success) {
              res.json({ message: "Client Spouse deleted successfully" });
            } else {
              res.status(404).json({ error: "Client Spouse not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to delete client Spouse" });
          });
      },
}

module.exports = clientSpouseController;
