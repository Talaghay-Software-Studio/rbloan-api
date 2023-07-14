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
        timestamp: moment(audit[1]).format("MM-DD-YYYY, HH:mm"),
        action_type: audit[2],
        username: audit[3],
        full_name: audit[4],
      }));
    } catch (error) {
      console.log("Failed to retrieve audit trail:", error);
      throw new Error("Failed to retrieve audit trail");
    }
  }

//   static async getClientsByQuery(query, searchby, userId) {
//     try {
//       const session = await getConnection();
  
//       if (!session) {
//         console.log("Failed to establish a database session");
//         throw new Error("Failed to establish a database session");
//       }
//       const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
//       VALUES (?, ?)`;

// await session
// .sql(auditTrailQuery)
// .bind(userId, 37) // Set the user_id from req.body and action_type to 34
// .execute();
  
//       let sqlQuery = `
//         SELECT *
//         FROM v_client_search
//       `;
//       let bindParams = [];
  
//       if (searchby === "client") {
//         sqlQuery += `
//           WHERE full_name LIKE ?
//         `;
//         bindParams.push("%" + query + "%");
//       } else if (searchby === "address") {
//         sqlQuery += `
//           WHERE full_address LIKE ?
//         `;
//         bindParams.push("%" + query + "%");
//       } else if (searchby === "area") {
//         sqlQuery += `
//           WHERE client_area_name LIKE ?
//         `;
//         bindParams.push("%" + query + "%");
//       } else if (searchby === "collector") {
//         sqlQuery += `
//           WHERE client_collector_full_name LIKE ?
//         `;
//         bindParams.push("%" + query + "%");
//       }
  
//       const result = await session.sql(sqlQuery).bind(...bindParams).execute();
  
//       const clientData = result.fetchAll();
//       if (clientData.length) {
//         const clients = clientData.map((client) => ({
//           full_name: client[1],
//           full_address: client[2],
//           area_name: client[3],
//           collector_name: client[4],
//         }));
//         return clients;
//       } else {
//         return [];
//       }
//     } catch (error) {
//       console.log("Failed to retrieve clients:", error);
//       throw new Error("Failed to retrieve clients");
//     }
//   }
  

}

module.exports = Audit;
