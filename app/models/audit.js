const { getConnection } = require("../db");
const moment = require("moment");

class Audit {
  // Existing code...

  static async getAllAudit(user_id) {
    try {
      const session = await getConnection();

      if (!session) {
        console.log("Failed to establish a database session");
        throw new Error("Failed to establish a database session");
      }

      const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                               VALUES (?, ?)`;

      await session
        .sql(auditTrailQuery)
        .bind(user_id, 53) // Set the user_id from req.body and action_type to 53
        .execute();

      const sqlQuery = `
        SELECT audit_id, timestamp, action_type, username, full_name
        FROM audit_view
      `;
      const result = await session.sql(sqlQuery).execute();

      const audits = result.fetchAll();
      return audits.map((audit) => ({
        id: audit[0],
        timestamp: moment(audit[1]).format("YYYY-MM-DD, HH:mm"),
        action_type: audit[2],
        username: audit[3],
        full_name: audit[4],
      }));
    } catch (error) {
      console.log("Failed to retrieve audit trail:", error);
      throw new Error("Failed to retrieve audit trail");
    }
  }


    static async getAuditByQuery(query, searchby, userId) {
      try {
        const session = await getConnection();
  
        if (!session) {
          console.log("Failed to establish a database session");
          throw new Error("Failed to establish a database session");
        }
  
        const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
                                 VALUES (?, ?)`;
  
        await session
          .sql(auditTrailQuery)
          .bind(userId, 54) // Set the user_id from req.body and action_type to 54
          .execute();
  
        let sqlQuery = `
          SELECT *
          FROM audit_view
        `;
        let bindParams = [];
  
        if (searchby === "client") {
          sqlQuery += `
            WHERE full_name LIKE ?
          `;
          bindParams.push("%" + query + "%");
        } else if (searchby === "timestamp") {
          sqlQuery += `
            WHERE timestamp LIKE ?
          `;
          bindParams.push("%" + query + "%");
        } else if (searchby === "username") {
          sqlQuery += `
            WHERE username LIKE ?
          `;
          bindParams.push("%" + query + "%");
        } else if (searchby === "full_name") {
          sqlQuery += `
            WHERE full_name LIKE ?
          `;
          bindParams.push("%" + query + "%");
        }
  
        const result = await session.sql(sqlQuery).bind(...bindParams).execute();
  
        const auditData = result.fetchAll();
        if (auditData.length) {
          const audits = auditData.map((audit) => ({
            audit_id: audit[0],
            timestamp: moment(audit[1]).format("YYYY-MM-DD, HH:mm"),
            action_type: audit[2],
            username: audit[3],
            full_name: audit[4],
          }));
          return audits;
        } else {
          return [];
        }
      } catch (error) {
        console.log("Failed to retrieve audits:", error);
        throw new Error("Failed to retrieve audits");
      }
    }
  }

module.exports = Audit;
