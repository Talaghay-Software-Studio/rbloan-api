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

    await session.close();
    return result.getAutoIncrementValue();
  }

  // Other methods go here...
}

module.exports = User;
