const User = require("../../models/user");
const { getConnection } = require("../../db");

const userController = {
  createUser: (req, res) => {
    const { username, password, salt, loginType, firstName, lastName, email } =
      req.body;

    const newUser = new User(
      null,
      username,
      password,
      salt,
      loginType,
      firstName,
      lastName,
      email
    );

    User.createUser(newUser)
      .then((userId) => {
        // Write to audit_trail table
        const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                                 VALUES (?, ?)`;

        getConnection()
          .then((session) => {
            if (!session) {
              throw new Error("Failed to establish a database session");
            }

            session
              .sql(auditTrailQuery)
              .bind(userId, 1) // Set the user_id from req.body and action_type to 1
              .execute()
              .then(() => {
                res
                  .status(201)
                  .json({ id: userId, message: "User created successfully" });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: "Failed to create user" });
              })
              .finally(() => {
                session.close();
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to create user" });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to create user" });
      });
  },

  getAllUsers: (req, res) => {
    User.getAllUsers(req.body.user_id) // Pass user_id from req.body
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve users" });
      });
  },
  
  getUser: (req, res) => {
    const userId = parseInt(req.query.id);
  
    User.getUserById(userId, req.body.user_id) // Pass user_id from req.body
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve user" });
      });
  },
  

  updateUser: (req, res) => {
    const userId = parseInt(req.query.id);
    const { username, password, salt, loginType, firstName, lastName, email } =
      req.body;
  
    const updatedUser = new User(
      userId,
      username,
      password,
      salt,
      loginType,
      firstName,
      lastName,
      email
    );
  
    User.updateUser(updatedUser, req.body.user_id) // Pass user_id from req.body
      .then((success) => {
        if (success) {
          res.json({ message: "User updated successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to update user" });
      });
  },
  

  deleteUser: (req, res) => {
    const userId = parseInt(req.query.id);
  
    User.deleteUser(userId, req.body.user_id) // Pass user_id from req.body
      .then((success) => {
        if (success) {
          res.json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to delete user" });
      });
  },
  
};

module.exports = userController;
