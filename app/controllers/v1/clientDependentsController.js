const ClientDependents = require("../../models/clientDependents");

const clientDependentsController = {
  createClientDependents: (req, res) => {
    const { client_id, first_name, middle_name, last_name, date_of_birth } = req.body;
  
    const newClientDependents = new ClientDependents(
      null,
      client_id,
      first_name,
      middle_name,
      last_name,
      date_of_birth
    );
  
    const userId = req.body.user_id; // Get user_id from req.body
  
    ClientDependents.createClientDependents(newClientDependents, userId) // Pass user_id as an argument
      .then((clientDependentsId) => {
        res.status(201).json({ id: clientDependentsId, message: "Client dependents created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to create client dependents" });
      });
  },
  

  updateClientDependents: (req, res) => {
    const clientDependentsId = parseInt(req.body.dependent_id);
    const { client_id, first_name, middle_name, last_name, date_of_birth } = req.body;
  
    // Check if clientDependentsId is a valid number
    if (isNaN(clientDependentsId)) {
      res.status(400).json({ error: "Invalid client dependents ID" });
      return;
    }
  
    const updatedClientDependents = new ClientDependents(
      clientDependentsId,
      client_id,
      first_name,
      middle_name,
      last_name,
      date_of_birth
    );
  
    const userId = req.body.user_id; // Get user_id from req.body
  
    ClientDependents.updateClientDependents(updatedClientDependents, userId)
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
    const clientDependentsId = parseInt(req.body.dependent_id);
  
    const userId = req.body.user_id; // Get user_id from req.body
  
    ClientDependents.deleteClientDependents(clientDependentsId, userId) // Pass user_id as an argument
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
