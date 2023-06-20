const { getConnection } = require("../db");

class ClientSpouse {
    constructor(id, client_id, first_name, middle_name, last_name, date_of_birth, contact_number) {
        this.id = id;
        this.client_id = client_id;
        this.first_name = first_name;
      this.middle_name = middle_name;
      this.last_name = last_name;
      this.date_of_birth = date_of_birth;
      this.contact_number = contact_number;
    }
  
    static async createClientSpouse(clientSpouse) {
  
      const session = await getConnection();
  
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
  
      const sqlQuery = `INSERT INTO client_spouse (client_id, first_name, middle_name, last_name, date_of_birth, contact_number)
                        VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          clientSpouse.client_id,
          clientSpouse.first_name,
          clientSpouse.middle_name,
          clientSpouse.last_name,
          clientSpouse.date_of_birth,
          clientSpouse.contact_number,
        
        )
        .execute();
  
      return result.getAutoIncrementValue();
    }

    static async updateClientSpouse(updatedClientSpouse) {
        const session = await getConnection();
      
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
      
        const sqlQuery = `UPDATE client_spouse
                          SET client_id = ?,
                              first_name = ?,
                              middle_name = ?,
                              last_name = ?,
                              date_of_birth = ?,
                              contact_number = ?
                          WHERE id = ?`;
      
        console.log("SQL Query:", sqlQuery);
        console.log("Updated Client Spouse:", updatedClientSpouse);
      
        const result = await session
          .sql(sqlQuery)
          .bind(
            updatedClientSpouse.client_id,
            updatedClientSpouse.first_name,
            updatedClientSpouse.middle_name,
            updatedClientSpouse.last_name,
            updatedClientSpouse.date_of_birth,
            updatedClientSpouse.contact_number,
            updatedClientSpouse.id
          )
          .execute();
      
        console.log("Execution Result:", result);
      
        return result.getAffectedItemsCount() > 0;
      }
        
      
      
      static async deleteClientSpouse(clientSpouseId) {
        const session = await getConnection();
    
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
    
        const sqlQuery = `DELETE FROM client_spouse WHERE id = ?`;
        const result = await session
          .sql(sqlQuery)
          .bind(clientSpouseId)
          .execute();
    
        return result.getAffectedItemsCount() > 0;
      }
  }
  

  module.exports = ClientSpouse;