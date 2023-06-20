const { getConnection } = require("../db");

class ClientDependents {
    constructor(id, client_id, first_name, middle_name, last_name, date_of_birth) {
      this.id = id;
      this.client_id = client_id;
      this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    }
  
    static async createClientDependents(clientDependents) {
  
      const session = await getConnection();
  
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
  
      const sqlQuery = `INSERT INTO client_dependents (client_id, first_name, middle_name, last_name, date_of_birth)
                        VALUES (?, ?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          clientDependents.client_id,
          clientDependents.first_name,
          clientDependents.middle_name,
          clientDependents.last_name,
          clientDependents.date_of_birth
        )
        .execute();
  
      await session.close();
      return result.getAutoIncrementValue();
    }

    static async updateClientDependents(updatedClientDependents) {
        const session = await getConnection();
      
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
      
        const sqlQuery = `UPDATE client_dependents
                          SET client_id = ?,
                              first_name = ?,
                              middle_name = ?,
                              last_name = ?,
                              date_of_birth = ?
                          WHERE id = ?`;
      
        console.log("SQL Query:", sqlQuery);
        console.log("Updated Client Dependents:", updatedClientDependents);
      
        const result = await session
          .sql(sqlQuery)
          .bind(
            updatedClientDependents.client_id,
            updatedClientDependents.first_name,
            updatedClientDependents.middle_name,
            updatedClientDependents.last_name,
            updatedClientDependents.date_of_birth,
            updatedClientDependents.id
          )
          .execute();
      
        console.log("Execution Result:", result);
      
        return result.getAffectedItemsCount() > 0;
      }
        
      
      
      static async deleteClientDependents(clientDependentsId) {
        const session = await getConnection();
    
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
    
        const sqlQuery = `DELETE FROM client_dependents WHERE id = ?`;
        const result = await session
          .sql(sqlQuery)
          .bind(clientDependentsId)
          .execute();
    
        return result.getAffectedItemsCount() > 0;
      }
  }
  

  module.exports = ClientDependents;