const User = require("../../models/user");

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
        res
          .status(201)
          .json({ id: userId, message: "User created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create user" });
      });
  },

  getAllUsers: (req, res) => {
    User.getAllUsers()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve users" });
      });
  },

  getUser: (req, res) => {
    const userId = parseInt(req.query.id);
  
    User.getUserById(userId)
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

    User.updateUser(updatedUser)
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

    User.deleteUser(userId)
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
