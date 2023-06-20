const { getConnection } = require("../db");

class User {
  constructor(
    id,
    username,
    password,
    salt,
    loginType,
    firstName,
    lastName,
    email
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.loginType = loginType;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static async createUser(user) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `INSERT INTO user (username, password, salt, login_type, first_name, last_name, email)
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        user.username,
        user.password,
        user.salt,
        user.loginType,
        user.firstName,
        user.lastName,
        user.email
      )
      .execute();

    return result.getAutoIncrementValue();
  }

  static async getAllUsers() {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const sqlQuery = `SELECT * FROM user`;
    const result = await session.sql(sqlQuery).execute();

    return result.fetchAll();
  }

  static async getUserById(userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const sqlQuery = `SELECT * FROM user WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(userId).execute();
  
    const users = result.fetchAll();
    return users.length ? users[0] : null;
  }

  static async updateUser(user) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const sqlQuery = `
      UPDATE user
      SET username = ?,
          password = ?,
          salt = ?,
          login_type = ?,
          first_name = ?,
          last_name = ?,
          email = ?
      WHERE id = ?
    `;
  
    const result = await session
      .sql(sqlQuery)
      .bind(
        user.username,
        user.password,
        user.salt,
        user.loginType,
        user.firstName,
        user.lastName,
        user.email,
        user.id
      )
      .execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  
  static async deleteUser(userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const sqlQuery = `DELETE FROM user WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(userId).execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

module.exports = User;
