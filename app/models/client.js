const { getConnection } = require("../db");

class Client {
  constructor(id, first_name, middle_name, last_name, date_of_birth, sex, contact_number) {
    this.id = id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    this.sex = sex;
    this.contact_number = contact_number;
  }

  static async createClient(client) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `INSERT INTO client (first_name, middle_name, last_name, date_of_birth, sex, contact_number)
                      VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        client.first_name,
        client.middle_name,
        client.last_name,
        client.date_of_birth,
        client.sex,
        client.contact_number
      )
      .execute();

    return result.getAutoIncrementValue();
  }

  static async getAllClient() {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `SELECT * FROM client`;
    const result = await session.sql(sqlQuery).execute();

    const clients = result.fetchAll();
    return clients;
  }

  static async getClientById(clientId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `SELECT * FROM client WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(clientId).execute();

    const clients = result.fetchAll();
    return clients.length ? clients[0] : null;
  }

  static async updateClient(client) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `UPDATE client SET first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, sex = ?, contact_number = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        client.first_name,
        client.middle_name,
        client.last_name,
        client.date_of_birth,
        client.sex,
        client.contact_number,
        client.id
      )
      .execute();

    return result.getAffectedItemsCount() > 0;
  }

  static async deleteClient(clientId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `DELETE FROM client WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(clientId).execute();

    return result.getAffectedItemsCount() > 0;
  }

}

module.exports = Client;
