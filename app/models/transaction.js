const { getConnection } = require("../db");

class Transaction {
  constructor(id, transaction_type_id, amount, collector_id, client_id) {
    this.id = id;
    this.transaction_type_id = transaction_type_id;
    this.amount = amount;
    this.collector_id = collector_id;
    this.client_id = client_id;
  }

  static async createTransaction(transaction, userId) {
    console.log("Transaction object:", transaction); // Log the collector object
    
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 48) 
.execute();
  
    const sqlQuery = `INSERT INTO transaction (transaction_type_id, amount, collector_id, client_id)
                      VALUES (?, ?, ?, ?)`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        transaction.transaction_type_id,
        transaction.amount,
        transaction.collector_id,
        transaction.client_id
      )
      .execute();
  
    return result.getAutoIncrementValue();
  }

  static async getAllTransaction(userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 49) 
.execute();

    const sqlQuery = "SELECT * FROM v_transaction_search";
    const result = await session.sql(sqlQuery).execute();

    const transactions = result.fetchAll();
    return transactions.map((transaction) => ({
      id: transaction[0],
      full_name: transaction[1],
      amount: transaction[2],
      transaction_type: transaction[3],
      collector_type_id: transaction[4],
      reference_no: transaction[5]
    }));
  }

  static async getTransactionById(transactionId,userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 50) 
.execute();

    const sqlQuery = `SELECT * FROM v_transaction_search WHERE transaction_id = ?`;
    const result = await session.sql(sqlQuery).bind(transactionId).execute();

    const transactions = result.fetchAll();
    return transactions.map((transaction) => ({
        id: transaction[0],
        full_name: transaction[1],
        amount: transaction[2],
        transaction_type: transaction[3],
        collector_type_id: transaction[4],
        reference_no: transaction[5]
      }));
  }

  static async updateTransaction(transaction,userId) {
    const session = await getConnection();

    if (!session) {
      throw new Error("Failed to establish a database session");
    }

    console.log("Executing update query:", transaction);

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 51) 
.execute();

    const sqlQuery = `UPDATE transaction SET transaction_type_id = ?, amount = ?, collector_id = ?, client_id = ? WHERE id = ?`;
    const result = await session
      .sql(sqlQuery)
      .bind(
        transaction.transaction_type_id,
        transaction.amount,
        transaction.collector_id,
        transaction.client_id,
        transaction.id
      )
      .execute();

    console.log("Affected items count:", result.getAffectedItemsCount());
    return result.getAffectedItemsCount() > 0;
  }

  static async deleteTransaction(transactionId, userId) {
    const session = await getConnection();
  
    if (!session) {
      throw new Error("Failed to establish a database session");
    }
  
    console.log("Deleting transaction with ID:", transactionId);

    const auditTrailQuery = `INSERT INTO audit_trail (user_id, action_type)
    VALUES (?, ?)`;

await session
.sql(auditTrailQuery)
.bind(userId, 52) 
.execute();
  
    const sqlQuery = `DELETE FROM transaction WHERE id = ?`;
    const result = await session.sql(sqlQuery).bind(transactionId).execute();
  
    console.log("Affected items count:", result.getAffectedItemsCount());
  
    if (result.getAffectedItemsCount() === 0) {
      console.log("Failed to delete transaction. transaction not found or deletion failed.");
    }
  
    return result.getAffectedItemsCount() > 0;
  }
  
}

module.exports = Transaction;
