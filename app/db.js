const mysql = require("mysql");
const dbConfig = require("../app/config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  authPlugin: 'mysql_native_password'
});


// Test the database connection
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connection successful!');
  connection.end(); // Close the connection after testing
});

module.exports = connection;
