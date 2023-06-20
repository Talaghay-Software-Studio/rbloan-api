const { getConnection } = require("../db");

class ClientReference {
    constructor(id, client_id, first_name, middle_name, last_name, contact_number) {
        this.id = id;
        this.client_id = client_id;
        this.first_name = first_name;
      this.middle_name = middle_name;
      this.last_name = last_name;
      this.contact_number = contact_number;
    }
  
    static async createClientReference(clientReference) {
  
      const session = await getConnection();
  
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
  
      const sqlQuery = `INSERT INTO client_reference (client_id, first_name, middle_name, last_name, contact_number)
                        VALUES (?, ?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          clientReference.client_id,
          clientReference.first_name,
          clientReference.middle_name,
          clientReference.last_name,
          clientReference.contact_number,
        
        )
        .execute();
  
      return result.getAutoIncrementValue();
    }

    static async updateClientReference(updatedClientReference) {
        const session = await getConnection();
      
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
      
        const sqlQuery = `UPDATE client_reference
                          SET client_id = ?,
                              first_name = ?,
                              middle_name = ?,
                              last_name = ?,
                              contact_number = ?
                          WHERE id = ?`;
      
        console.log("SQL Query:", sqlQuery);
        console.log("Updated Client Reference:", updatedClientReference);
      
        const result = await session
          .sql(sqlQuery)
          .bind(
            updatedClientReference.client_id,
            updatedClientReference.first_name,
            updatedClientReference.middle_name,
            updatedClientReference.last_name,
            updatedClientReference.contact_number,
            updatedClientReference.id
          )
          .execute();
      
        console.log("Execution Result:", result);
      
        return result.getAffectedItemsCount() > 0;
      }
        
      
      
      static async deleteClientReference(clientReferenceId) {
        const session = await getConnection();
    
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
    
        const sqlQuery = `DELETE FROM client_reference WHERE id = ?`;
        const result = await session
          .sql(sqlQuery)
          .bind(clientReferenceId)
          .execute();
    
        return result.getAffectedItemsCount() > 0;
      }
  }
  

  module.exports = ClientReference;