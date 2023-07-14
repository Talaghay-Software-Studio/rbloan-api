const { getConnection } = require("../db");

class Area {
  constructor(id, branch_id, name, latitude, longitude, radius) {
    this.id = id;
    this.branch_id = branch_id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
  }

  static async createArea(area, userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 38) // Set the user_id from req.body and action_type to 34
.execute();

    const sqlQuery = `INSERT INTO area (branch_id, name, latitude, longitude, radius)
                      VALUES (?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        area.branch_id,
        area.name,
        area.latitude,
        area.longitude,
        area.radius
      )
      .execute();

    return result.getAutoIncrementValue();
  }

  static async getAllAreas(userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 39) // Set the user_id from req.body and action_type to 34
.execute();

    const sqlQuery = "SELECT * FROM area";
    const result = await session.sql(sqlQuery).execute();

    const areas = result.fetchAll();
    return areas.map((area) => ({
      id: area[0],
      branch_id: area[1],
      name: area[2],
      latitude: area[3],
      longitude: area[4],
      radius: area[5],
    }));
  }

  static async getAreaById(areaId,userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 40) // Set the user_id from req.body and action_type to 34
.execute();

    const sqlQuery = `SELECT * FROM area WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(areaId).execute();

    const areas = result.fetchAll();
    return areas.map((area) => ({
        id: area[0],
        branch_id: area[1],
        name: area[2],
        latitude: area[3],
        longitude: area[4],
        radius: area[5],
      }));
  }

  static async updateArea(area, userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 41) // Set the user_id from req.body and action_type to 34
.execute();

    console.log("Executing update query:", area);

    const sqlQuery = `UPDATE area SET branch_id = ?, name = ?, latitude = ?, longitude = ?, radius = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        area.branch_id,
        area.name,
        area.latitude,
        area.longitude,
        area.radius,
        area.id
      )
      .execute();

    console.log("Affected items count:", result.getAffectedItemsCount());
    return result.getAffectedItemsCount() > 0;
  }

  static async deleteArea(areaId, userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    console.log("Deleting area with ID:", areaId);

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 42) // Set the user_id from req.body and action_type to 34
.execute();
  
    const sqlQuery = `DELETE FROM area WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(areaId).execute();
  
    console.log("Affected items count:", result.getAffectedItemsCount());
  
    if (result.getAffectedItemsCount() === 0) {
      console.log("Failed to delete area. Area not found or deletion failed.");
    }
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

function validateLatitude(latitude) {
  if (latitude < -90 || latitude > 90) {
    throw new Error("Latitude value is out of range");
  }
}

module.exports = Area;

// module.exports = Branch;
