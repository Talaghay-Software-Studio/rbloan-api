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

  try {
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
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user");
  }
}

  static async getAllUsers(user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 2) // Set the user_id from req.body and action_type to 2
      .execute();
  
    const sqlQuery = `SELECT * FROM user`;
    const result = await session.sql(sqlQuery).execute();
  
    const users = result.fetchAll();
    return users.map((user) => ({
      id: user[0],
      username: user[1],
      password: user[2],
      salt: user[3],
      loginType: user[4],
      firstName: user[5],
      lastName: user[6],
      email: user[7],
    }));
  }  

  static async getUserById(userId, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 3) // Set the user_id from req.body and action_type to 3
      .execute();
  
    const sqlQuery = `SELECT * FROM user WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(userId).execute();

    const users = result.fetchAll();
    return users.map((user) => ({
      id: user[0],
      username: user[1],
      password: user[2],
      salt: user[3],
      loginType: user[4],
      firstName: user[5],
      lastName: user[6],
      email: user[7],
    }));
  }

  static async updateUser(user, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 4) // Set the user_id from req.body and action_type to 4
      .execute();
  
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
  
  
  static async deleteUser(userId, user_id) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                             VALUES (?, ?)`;
  
    await session
      .sql(auditTrailQuery)
      .bind(user_id, 5) // Set the user_id from req.body and action_type to 5
      .execute();
  
    const sqlQuery = `DELETE FROM user WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(userId).execute();
  
    return result.getAffectedItemsCount() > 0;
  }
  
  
}

module.exports = User;
