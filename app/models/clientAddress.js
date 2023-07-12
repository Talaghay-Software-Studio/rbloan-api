const { getConnection } = require("../db");

class ClientAddress {
  constructor(id, client_id, address_type, address_line1, address_line2, city, province, postal_code, country) {
    this.id = id;
    this.client_id = client_id;
    this.address_type = address_type;
    this.address_line1 = address_line1;
    this.address_line2 = address_line2;
    this.city = city;
    this.province = province;
    this.postal_code = postal_code;
    this.country = country;
  }

  static async createClientAddress(clientAddress, userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                           VALUES (?, ?)`;

    await session
      .sql(auditTrailQuery)
      .bind(userId, 16) // Set the user_id from req.body and action_type to 16
      .execute();

    const sqlQuery = `INSERT INTO client_address (client_id, address_type, address_line1, address_line2, city, province, postal_code, country)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        clientAddress.client_id,
        clientAddress.address_type,
        clientAddress.address_line1,
        clientAddress.address_line2,
        clientAddress.city,
        clientAddress.province,
        clientAddress.postal_code,
        clientAddress.country
      )
      .execute();

    return result.getAutoIncrementValue();
  }

  
  static async updateClientAddress(clientAddress, userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(userId, 17) // Set the user_id from req.body and action_type to 17
      .execute();
  
    const sqlQuery = `UPDATE client_address SET client_id = ?, address_type = ?, address_line1 = ?, address_line2 = ?, city = ?, province = ?, postal_code = ?, country = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        clientAddress.client_id,
        clientAddress.address_type,
        clientAddress.address_line1,
        clientAddress.address_line2,
        clientAddress.city,
        clientAddress.province,
        clientAddress.postal_code,
        clientAddress.country,
        clientAddress.id
      )
      .execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  

  static async deleteClientAddress(clientAddressId, userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(userId, 18) // Set the user_id from req.body and action_type to 18
      .execute();
  
    const sqlQuery = `DELETE FROM client_address WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(clientAddressId)
      .execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

module.exports = ClientAddress;
