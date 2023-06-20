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
    try {
      const session = await getConnection();
  
      if (!session) {
        console.log("Failed to establish a database session");
        throw new Error("Failed to establish a database session");
      }
  
      const sqlQuery = `
        SELECT c.id, c.first_name, c.middle_name, c.last_name, ca.province, ca.city
        FROM client c
        LEFT JOIN client_address ca ON c.id = ca.client_id
      `;
      const result = await session.sql(sqlQuery).execute();
  
      const clients = result.fetchAll();
      const transformedClients = clients.map((client) => ({
        client_id: client[0],
        full_name: `${client[1]} ${client[2]} ${client[3]}`,
        address: `${client[5]} ${client[4]}`,
        total_loan: 200000.00,
        remaining_balance: 300000.00,
        is_delinquent: "No",
      }));
  
      return transformedClients;
    } catch (error) {
      console.log("Failed to retrieve clients:", error);
      throw new Error("Failed to retrieve clients");
    }
  }
  
  
  static async getClientById(clientId) {
    try {
      const session = await getConnection();
  
      if (!session) {
        console.log("Failed to establish a database session");
        throw new Error("Failed to establish a database session");
      }
  
      const sqlQuery = `
        SELECT 
          c.id AS client_id,
          c.first_name,
          c.middle_name,
          c.last_name,
          c.date_of_birth,
          c.sex,
          c.contact_number,
          c.created_at,
          c.modified_at,
          ca.id,
          ca.address_type,
          ca.address_line1,
          ca.address_line2,
          ca.city,
          ca.province,
          ca.postal_code,
          ca.country,
          ca.created_at AS address_created_at,
          ca.modified_at AS address_modified_at
        FROM 
          client c
        LEFT JOIN 
          client_address ca ON c.id = ca.client_id
        WHERE 
          c.id = ?
      `;
      const result = await session.sql(sqlQuery).bind(clientId).execute();
  
      const clientData = result.fetchAll();
      if (clientData.length) {
        const client = clientData[0];
        const transformedClient = {
          client_id: client[0],
          first_name: client[1],
          middle_name: client[2],
          last_name: client[3],
          birth_date: client[4],
          sex: client[5],
          contact_number: client[6],
          created_at: new Date(client[7]).toLocaleString(),
          modified_at: new Date(client[8]).toLocaleString(),
          address: clientData.map((address) => ({
            address_id: address[9],
            address_type: address[10],
            address_line1: address[11],
            address_line2: address[12],
            city: address[13],
            province: address[14],
            postal_code: address[15],
            country: address[16],
            created_at: new Date(address[17]).toLocaleString(),
            modified_at: new Date(address[18]).toLocaleString(),
          })),
        };
        return transformedClient;
      } else {
        return null;
      }
    } catch (error) {
      console.log("Failed to retrieve client:", error);
      throw new Error("Failed to retrieve client");
    }
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
