const db = require('../db');

// User model
class User {
  constructor(id, username, password, salt, loginType, firstName, lastName, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.loginType = loginType;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO user (username, password, salt, login_type, first_name, last_name, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.username, user.password, user.salt, user.loginType, user.firstName, user.lastName, user.email],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            const userId = results.insertId;
            resolve(userId);
          }
        }
      );
    });
  }

  static getAllUsers() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user', (err, results) => {
        if (err) {
          reject(err);
        } else {
          const users = results.map((row) => {
            return new User(
              row.id,
              row.username,
              row.password,
              row.salt,
              row.login_type,
              row.first_name,
              row.last_name,
              row.email
            );
          });
          resolve(users);
        }
      });
    });
  }

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // User not found
          } else {
            const row = results[0];
            const user = new User(
              row.id,
              row.username,
              row.password,
              row.salt,
              row.login_type,
              row.first_name,
              row.last_name,
              row.email
            );
            resolve(user);
          }
        }
      });
    });
  }

  static updateUser(user) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE user SET username = ?, password = ?, salt = ?, login_type = ?, first_name = ?, last_name = ?, email = ? WHERE id = ?',
        [user.username, user.password, user.salt, user.loginType, user.firstName, user.lastName, user.email, user.id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows > 0);
          }
        }
      );
    });
  }

  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  }
}

module.exports = User;
