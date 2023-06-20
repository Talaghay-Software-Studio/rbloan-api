const ClientDependents = require("../../models/clientDependents");

const clientDependentsController = {
    createClientDependents: (req, res) => {
      const { client_id, first_name, middle_name, last_name, date_of_birth } =
        req.body;
  
      const newClientDependents = new ClientDependents(
        null,
        client_id, 
        first_name, 
        middle_name, 
        last_name, 
        date_of_birth
      );
  
      ClientDependents.createClientDependents(newClientDependents)
        .then((clientDependentsId) => {
          res
            .status(201)
            .json({ id: clientDependentsId, message: "Client dependents created successfully" });
        })
        .catch((err) => {
          console.log(err); // Add this line to print the error.
          res.status(500).json({ error: "Failed to create client dependents" });
        });
    },  

    updateClientDependents: (req, res) => {
        const clientDependentsId = parseInt(req.query.id);
        const { client_id, first_name, middle_name, last_name, date_of_birth } = req.body;
      
        console.log("Request Data:");
        console.log("clientDependentsId:", clientDependentsId);
        console.log("client_id:", client_id);
        console.log("first_name:", first_name);
        console.log("middle_name:", middle_name);
        console.log("last_name:", last_name);
        console.log("date_of_birth:", date_of_birth);
      
        const updatedClientDependents = new ClientDependents(
          clientDependentsId,
          client_id,
          first_name,
          middle_name,
          last_name,
          date_of_birth
        );
      
        console.log("Updated Client Dependents Object:", updatedClientDependents);
      
        ClientDependents.updateClientDependents(updatedClientDependents)
          .then((success) => {
            console.log("Update Success:", success);
            if (success) {
              res.json({ message: "Client dependents updated successfully" });
            } else {
              res.status(404).json({ error: "Client dependents not found" });
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
            res.status(500).json({ error: "Failed to update client dependents" });
          });
      },
      
      
      
      
      deleteClientDependents: (req, res) => {
        const clientDependentsId = parseInt(req.query.id);
    
        ClientDependents.deleteClientDependents(clientDependentsId)
          .then((success) => {
            if (success) {
              res.json({ message: "Client dependents deleted successfully" });
            } else {
              res.status(404).json({ error: "Client dependents not found" });
            }
          })
          .catch((err) => {
            res.status(500).json({ error: "Failed to delete client dependents" });
          });
      },
}

module.exports = clientDependentsController;
