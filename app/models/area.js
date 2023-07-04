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

  static async createArea(area) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async getAllAreas() {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async getAreaById(areaId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async updateArea(area) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async deleteArea(areaId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    console.log("Deleting area with ID:", areaId);
  
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
