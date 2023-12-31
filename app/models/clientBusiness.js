const { getConnection } = require("../db");

class ClientBusiness {
    constructor(id, client_id, business_name, years, capital, stock, kind_of_business, daily_income, monthly, address, contact_number) {
      this.id = id;
      this.client_id = client_id;
      this.business_name = business_name;
      this.years = years;
      this.capital = capital;
      this.stock = stock;
      this.kind_of_business = kind_of_business;
      this.daily_income = daily_income;
      this.monthly = monthly;
      this.address = address;
      this.contact_number = contact_number;
    }
  
    static async createClientBusiness(clientBusiness, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 19) // Set the user_id from req.body and action_type to 19
        .execute();
    
      const sqlQuery = `INSERT INTO client_business (client_id, business_name, years, capital, stock, kind_of_business, daily_income, monthly, address, contact_number)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          clientBusiness.client_id,
          clientBusiness.business_name,
          clientBusiness.years,
          clientBusiness.capital,
          clientBusiness.stock,
          clientBusiness.kind_of_business,
          clientBusiness.daily_income,
          clientBusiness.monthly,
          clientBusiness.address,
          clientBusiness.contact_number
        )
        .execute();
    
      await session.close();
      return result.getAutoIncrementValue();
    }
    

    static async updateClientBusiness(updatedClientBusiness, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 20) // Set the user_id from req.body and action_type to 20
        .execute();
    
      const sqlQuery = `UPDATE client_business
                        SET client_id = ?,
                            business_name = ?,
                            years = ?,
                            capital = ?,
                            stock = ?,
                            kind_of_business = ?,
                            daily_income = ?,
                            monthly = ?,
                            address = ?,
                            contact_number = ?
                        WHERE id = ?`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          updatedClientBusiness.client_id,
          updatedClientBusiness.business_name,
          updatedClientBusiness.years,
          updatedClientBusiness.capital,
          updatedClientBusiness.stock,
          updatedClientBusiness.kind_of_business,
          updatedClientBusiness.daily_income,
          updatedClientBusiness.monthly,
          updatedClientBusiness.address,
          updatedClientBusiness.contact_number,
          updatedClientBusiness.id
        )
        .execute();
    
      await session.close();
      return result.getAffectedItemsCount() > 0;
    }
    

    static async deleteClientBusiness(clientBusinessId, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 21) // Set the user_id from req.body and action_type to 21
        .execute();
    
      const sqlQuery = `DELETE FROM client_business WHERE id = ?`;
      const result = await session
        .sql(sqlQuery)
        .bind(clientBusinessId)
        .execute();
    
      await session.close();
      return result.getAffectedItemsCount() > 0;
    }
    
  }
  

  module.exports = ClientBusiness;