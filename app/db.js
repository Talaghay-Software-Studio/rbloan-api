const mysqlx = require('@mysql/xdevapi');
const dbConfig = require("../app/config/db.config");

let session;

const getConnection = async () => {
  if (session) {
    return session;
  }

  try {
    session = await mysqlx.getSession({
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      host: dbConfig.HOST,
      port: dbConfig.PORT,
      schema: dbConfig.DB
    });

    console.log("Connected to MySQL server successfully!");

    return session;
  } catch (error) {
    console.error("Failed to connect to MySQL server:", error.message);
  }
};

module.exports = { getConnection };
