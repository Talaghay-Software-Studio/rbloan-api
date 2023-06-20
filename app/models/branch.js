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

  static async createBranch(branch) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async getAllBranch() {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = "SELECT * FROM branch";
    const result = await session.sql(sqlQuery).execute();

    return result.fetchAll();
  }

  static async getBranchById(branchId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `SELECT * FROM branch WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(branchId).execute();

    const branches = result.fetchAll();
    return branches.length ? branches[0] : null;
  }

  static async updateBranch(branch) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

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

  static async deleteBranch(branchId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const sqlQuery = `DELETE FROM branch WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(branchId).execute();
  
    await session.close();
    return result.getAffectedItemsCount() > 0;
    }
}



//   static async getAllUsers() {
//     const session = await getConnection();

//     if (!session) {
//       throw new Error("Failed to establish a database session");
//     }

//     const sqlQuery = `SELECT * FROM user`;
//     const result = await session.sql(sqlQuery).execute();

//     return result.fetchAll();
//   }

//   static async getUserById(userId) {
//     const session = await getConnection();
  
//     if (!session) {
//       throw new Error("Failed to establish a database session");
//     }
  
//     const sqlQuery = `SELECT * FROM user WHERE id = ?`;
//     const result = await session.sql(sqlQuery).bind(userId).execute();
  
//     const users = result.fetchAll();
//     return users.length ? users[0] : null;
//   }

//   static async updateUser(user) {
//     const session = await getConnection();
  
//     if (!session) {
//       throw new Error("Failed to establish a database session");
//     }
  
//     const sqlQuery = `
//       UPDATE user
//       SET username = ?,
//           password = ?,
//           salt = ?,
//           login_type = ?,
//           first_name = ?,
//           last_name = ?,
//           email = ?
//       WHERE id = ?
//     `;
  
//     const result = await session
//       .sql(sqlQuery)
//       .bind(
//         user.username,
//         user.password,
//         user.salt,
//         user.loginType,
//         user.firstName,
//         user.lastName,
//         user.email,
//         user.id
//       )
//       .execute();
  
//     return result.getAffectedItemsCount() > 0;
//   }
  
//   static async deleteUser(userId) {
//     const session = await getConnection();
  
//     if (!session) {
//       throw new Error("Failed to establish a database session");
//     }
  
//     const sqlQuery = `DELETE FROM user WHERE id = ?`;
//     const result = await session.sql(sqlQuery).bind(userId).execute();
  
//     return result.getAffectedItemsCount() > 0;
//   }
  
// }


module.exports = Branch;
