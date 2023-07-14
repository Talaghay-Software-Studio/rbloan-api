const { getConnection } = require("../db");

class Collector {
  constructor( id, area_id, first_name, middle_name, last_name, contact_number ) {
    this.id = id;
    this.area_id = area_id;
    this.first_name = first_name;
    this.middle_name = middle_name;
    this.last_name = last_name;
    this.contact_number = contact_number;
  }

  static async createCollector(collector, userId) {
    console.log("Collector object:", collector); // Log the collector object
    
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 43) 
.execute();
  
    const sqlQuery = `INSERT INTO collector (area_id, first_name, middle_name, last_name, contact_number)
                      VALUES (?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(

        collector.area_id,
        collector.first_name,
        collector.middle_name,
        collector.last_name,
        collector.contact_number
      )
      .execute();
  
    return result.getAutoIncrementValue();
  }

  static async getAllCollector(userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 44) 
.execute();

    const sqlQuery = "SELECT * FROM collector";
    const result = await session.sql(sqlQuery).execute();

    const collectors = result.fetchAll();
    return collectors.map((collector) => ({
      id: collector[0],
      area_id: collector[1],
      first_name: collector[2],
      middle_name: collector[3],
      last_name: collector[4],
      contact_number: collector[5],
    }));
  }

  static async getCollectorById(collectorId,userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 45) 
.execute();

    const sqlQuery = `SELECT * FROM collector WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(collectorId).execute();

    const collectors = result.fetchAll();
    return collectors.map((collector) => ({
        id: collector[0],
      area_id: collector[1],
      first_name: collector[2],
      middle_name: collector[3],
      last_name: collector[4],
      contact_number: collector[5],
      }));
  }

  static async updateCollector(collector, userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    console.log("Executing update query:", collector);

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 46) 
.execute();

    const sqlQuery = `UPDATE collector SET area_id = ?, first_name = ?, middle_name = ?, last_name = ?, contact_number = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        collector.area_id,
        collector.first_name,
        collector.middle_name,
        collector.last_name,
        collector.contact_number,
        collector.id
      )
      .execute();

    console.log("Affected items count:", result.getAffectedItemsCount());
    return result.getAffectedItemsCount() > 0;
  }

  static async deleteCollector(collectorId, userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    console.log("Deleting collector with ID:", collectorId);

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 47) 
.execute();
  
    const sqlQuery = `DELETE FROM collector WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(collectorId).execute();
  
    console.log("Affected items count:", result.getAffectedItemsCount());
  
    if (result.getAffectedItemsCount() === 0) {
      console.log("Failed to delete collector. collector not found or deletion failed.");
    }
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

module.exports = Collector;
