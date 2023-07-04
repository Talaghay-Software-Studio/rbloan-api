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

  static async createCollector(collector) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async getAllCollector() {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async getCollectorById(collectorId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async updateCollector(collector) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    console.log("Executing update query:", collector);

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

  static async deleteCollector(collectorId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    console.log("Deleting collector with ID:", collectorId);
  
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
