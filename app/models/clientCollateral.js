const { getConnection } = require("../db");

class ClientCollateral {
    constructor(clientCollateralId, client_id, collateral_type, value, ownership_info) {
      this.clientCollateralId = clientCollateralId;
      this.client_id = client_id;
      this.collateral_type = collateral_type;
      this.value = value;
      this.ownership_info = ownership_info;
    }
  
    static async createClientCollateral(newClientCollateral, userId) {
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
    
      await session
        .sql(auditTrailQuery)
        .bind(userId, 22) // Set the user_id from req.body and action_type to 22
        .execute();
    
      const sqlQuery = `INSERT INTO client_collateral (client_id, collateral_type, value, ownership_info)
                        VALUES (?, ?, ?, ?)`;
      const result = await session
        .sql(sqlQuery)
        .bind(
          newClientCollateral.client_id,
          newClientCollateral.collateral_type,
          newClientCollateral.value,
          newClientCollateral.ownership_info
        )
        .execute();
    
      await session.close();
      return result.getAutoIncrementValue();
    }    

    static async updateClientCollateral(updatedClientCollateral, userId) {
      try {
        const session = await getConnection();
    
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
    
        console.log("Updated Client Collateral in Model:", updatedClientCollateral);
        console.log("User ID in Model:", userId);
    
        const sqlQuery = `UPDATE client_collateral SET 
                            client_id = ?, 
                            collateral_type = ?, 
                            value = ?, 
                            ownership_info = ?
                            WHERE id = ?`;
        const result = await session
          .sql(sqlQuery)
          .bind(
            updatedClientCollateral.client_id,
            updatedClientCollateral.collateral_type,
            updatedClientCollateral.value,
            updatedClientCollateral.ownership_info,
            updatedClientCollateral.id
          )
          .execute();
    
        // Write to audit_trail table
        const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                                 VALUES (?, ?)`;
    
        console.log("Audit Trail Query:", auditTrailQuery);
    
        await session
          .sql(auditTrailQuery)
          .bind(userId, 23)
          .execute();
    
        
        const affectedRows = result.getAffectedItemsCount();
        return affectedRows > 0;
      } catch (error) {
        console.log(error); // Print the error for debugging purposes
        throw new Error("Failed to update client collateral");
      }
    }
    

    static async deleteClientCollateral(clientCollateralId, userId) { // Add userId parameter
      const session = await getConnection();
    
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
    
      const sqlQuery = `DELETE FROM client_collateral WHERE id = ?`;
      const result = await session
        .sql(sqlQuery)
        .bind(clientCollateralId)
        .execute();
    
      // Write to audit_trail table
      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;
      await session
        .sql(auditTrailQuery)
        .bind(userId, 24) // Set the user_id from req.body and action_type to 24
        .execute();
    
      return result.getAffectedItemsCount() > 0;
    }
    
  }

  module.exports = ClientCollateral;