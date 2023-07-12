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
  
    static async createClientDependents(clientDependents, userId) { // Add userId parameter
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
    
      // Write to audit_trail table
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
      await session
        .sql(auditTrailQuery)
        .bind(userId, 25) // Set the user_id from req.body and action_type to 25
        .execute();
    
      await session.close();
      return result.getAutoIncrementValue();
    }    

    static async updateClientDependents(updatedClientDependents, userId) {
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
    
      // Write to audit_trail table
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
      await session
        .sql(auditTrailQuery)
        .bind(userId, 26) // Set the user_id from req.body and action_type to 26
        .execute();
    
      await session.close();
      return result.getAffectedItemsCount() > 0;
    }
    
      
      
    static async deleteClientDependents(clientDependentsId, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 27) // Set the user_id from req.body and action_type to 27
        .execute();
    
      const sqlQuery = `DELETE FROM client_dependents WHERE id = ?`;
      const result = await session.sql(sqlQuery).bind(clientDependentsId).execute();
    
      await session.close();
      return result.getAffectedItemsCount() > 0;
    }
    
  }
  

  module.exports = ClientDependents;