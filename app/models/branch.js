const { getConnection } = require("../db");

class Branch {
  constructor(id, name, address_line1, address_line2, city, province, postal_code, country) {
    this.id = id;
    this.name = name;
    this.address_line1 = address_line1;
    this.address_line2 = address_line2;
    this.city = city;
    this.province = province;
    this.postal_code = postal_code;
    this.country = country;
  }

  static async createBranch(branch, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 6) // Set the user_id from req.body and action_type to 6
      .execute();
  
    const sqlQuery = `INSERT INTO branch (name, address_line1, address_line2, city, province, postal_code, country)
                      VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        branch.name,
        branch.address_line1,
        branch.address_line2,
        branch.city,
        branch.province,
        branch.postal_code,
        branch.country
      )
      .execute();
  
    return result.getAutoIncrementValue();
  }
  

  static async getAllBranch(user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 7) // Set the user_id from req.body and action_type to 7
      .execute();
  
    const sqlQuery = "SELECT * FROM branch";
    const result = await session.sql(sqlQuery).execute();
  
    const branches = result.fetchAll();
    return branches.map((branch) => ({
      id: branch[0],
      name: branch[1],
      address_line1: branch[2],
      address_line2: branch[3],
      city: branch[4],
      province: branch[5],
      postal_code: branch[6],
      country: branch[7],
    }));
  }
  

  static async getBranchById(branchId, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 8) // Set the user_id from req.body and action_type to 8
      .execute();
  
    const sqlQuery = `SELECT * FROM branch WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(branchId).execute();
  
    const branches = result.fetchAll();
    return branches.map((branch) => ({
      id: branch[0],
      name: branch[1],
      address_line1: branch[2],
      address_line2: branch[3],
      city: branch[4],
      province: branch[5],
      postal_code: branch[6],
      country: branch[7],
    }));
  }
  

  static async updateBranch(branch, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 9) // Set the user_id from req.body and action_type to 9
      .execute();
  
    const sqlQuery = `UPDATE branch SET name = ?, address_line1 = ?, address_line2 = ?, city = ?, province = ?, postal_code = ?, country = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        branch.name,
        branch.address_line1,
        branch.address_line2,
        branch.city,
        branch.province,
        branch.postal_code,
        branch.country,
        branch.id
      )
      .execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  

  static async deleteBranch(branchId, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 10) // Set the user_id from req.body and action_type to 9
      .execute();
  
    const sqlQuery = `DELETE FROM branch WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(branchId).execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

module.exports = Branch;
