const { getConnection } = require("../db");

class ClientEmployment {
    constructor(id, client_id, company_name, income, status, years, address, contact_number, head) {
      this.id = id;
      this.client_id = client_id;
      this.company_name = company_name;
    this.income = income;
    this.status = status;
    this.years = years;
    this.address = address;
    this.contact_number = contact_number;
    this.head = head;
    }
  
    static async createClientEmployment(clientEmployment, userId) {
      const session = await getConnection();
    
      // if (!session) {
      //   throw new Error("Failed to establish a database session");
      // }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 28) // Set the user_id from req.body and action_type to 28
        .execute();
    
      const sqlQuery = `INSERT INTO client_employment (client_id, company_name, income, status, years, address, contact_number, head)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          clientEmployment.client_id,
          clientEmployment.company_name,
          clientEmployment.income,
          clientEmployment.status,
          clientEmployment.years,
          clientEmployment.address,
          clientEmployment.contact_number,
          clientEmployment.head
        )
        .execute();
    
      return result.getAutoIncrementValue();
    }
    

    static async updateClientEmployment(updatedClientEmployment, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 29) // Set the user_id from req.body and action_type to 29
        .execute();
    
      const sqlQuery = `UPDATE client_employment
                        SET client_id = ?,
                            company_name = ?,
                            income = ?,
                            status = ?,
                            years = ?,
                            address = ?,
                            contact_number = ?,
                            head = ?
                        WHERE id = ?`;
    
      console.log("SQL Query:", sqlQuery);
      console.log("Updated Client Employment:", updatedClientEmployment);
    
      const result = await session
        .sql(sqlQuery)
        .bind(
          updatedClientEmployment.client_id,
          updatedClientEmployment.company_name,
          updatedClientEmployment.income,
          updatedClientEmployment.status,
          updatedClientEmployment.years,
          updatedClientEmployment.address,
          updatedClientEmployment.contact_number,
          updatedClientEmployment.head,
          updatedClientEmployment.id
        )
        .execute();
    
      console.log("Execution Result:", result);
    
      return result.getAffectedItemsCount() > 0;
    }
    
        
      
      
    static async deleteClientEmployment(clientEmploymentId, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 30) // Set the user_id from req.body and action_type to 30
        .execute();
    
      const sqlQuery = `DELETE FROM client_employment WHERE id = ?`;
      const result = await session
        .sql(sqlQuery)
        .bind(clientEmploymentId)
        .execute();
    
      return result.getAffectedItemsCount() > 0;
    }    
  }
  

  module.exports = ClientEmployment;