const { getConnection } = require("../db");

class ClientCollateral {
    constructor(clientCollateralId, client_id, collateral_type, value, ownership_info) {
      this.clientCollateralId = clientCollateralId;
      this.client_id = client_id;
      this.collateral_type = collateral_type;
      this.value = value;
      this.ownership_info = ownership_info;
    }
  
    static async createClientCollateral(newClientCollateral) {
      const session = await getConnection();
  
      if (!session) {
        throw new Error("Failed to establish a database session");
      }
  
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
  
      return result.getAutoIncrementValue();
    }

    static async updateClientCollateral(updatedClientCollateral) {
        try {
          const session = await getConnection();
      
          if (!session) {
            throw new Error("Failed to establish a database session");
          }
      
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
              updatedClientCollateral.id // Add the missing id property
            )
            .execute();
      
          const affectedRows = result.getAffectedItemsCount();
          return affectedRows > 0; // Return true if the update was successful
        } catch (error) {
          throw new Error("Failed to update client collateral");
        }
      }      

      static async deleteClientCollateral(clientCollateralId) {
        const session = await getConnection();
    
        if (!session) {
          throw new Error("Failed to establish a database session");
        }
    
        const sqlQuery = `DELETE FROM client_collateral WHERE id = ?`;
        const result = await session
          .sql(sqlQuery)
          .bind(clientCollateralId)
          .execute();
    
        return result.getAffectedItemsCount() > 0;
      }
  }

  module.exports = ClientCollateral;