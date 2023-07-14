const Transaction = require("../../models/transaction");

const transactionController = {
  createTransaction: (req, res) => {
    const { transaction_type_id, amount, collector_id, client_id } = req.body;

    const newTransaction = new Transaction(null, transaction_type_id, amount, collector_id, client_id );

    Transaction.createTransaction(newTransaction, req.body.user_id)
      .then((transactionId) => {
        res
          .status(201)
          .json({ id: transactionId, message: "Transaction created successfully" });
      })
      .catch((err) => {
        console.log(err); // Add this line to print the error.
        res.status(500).json({ error: "Failed to create transaction" });
      });
  },

  getAllTransaction: (req, res) => {
    Transaction.getAllTransaction(req.body.user_id)
      .then((transaction) => {
        res.json(transaction);
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve transactions" });
      });
  },

  getTransaction: (req, res) => {
    const transactionId = parseInt(req.body.transaction_id);

    Transaction.getTransactionById(transactionId, req.body.user_id)
      .then((transaction) => {
        if (transaction) {
          res.json(transaction);
        } else {
          res.status(404).json({ error: "Transaction not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Failed to retrieve transaction" });
      });
  },

  updateTransaction: (req, res) => {
    const transactionId = parseInt(req.body.transaction_id);
    const { transaction_type_id, amount, collector_id, client_id } = req.body;

    const updatedTransaction = new Transaction(
        transactionId,
        transaction_type_id, 
        amount, 
        collector_id, 
        client_id
    );

    console.log("Updating Transaction:", updatedTransaction);

    Transaction.updateTransaction(updatedTransaction, req.body.user_id)
      .then((success) => {
        if (success) {
          console.log("Transaction updated successfully");
          res.json({ message: "Transaction updated successfully" });
        } else {
          console.log("Transaction not found");
          res.status(404).json({ error: "Transaction not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to update Transaction:", err);
        res.status(500).json({ error: "Failed to update Transaction" });
      });
  },

  deleteTransaction: (req, res) => {
    const transactionId = parseInt(req.body.transaction_id);
  
    console.log("Received delete request for transaction with ID:", transactionId);
  
    Transaction.deleteTransaction(transactionId,req.body.user_id)
      .then((success) => {
        if (success) {
          console.log("Transaction deleted successfully");
          res.json({ message: "Transaction deleted successfully" });
        } else {
          console.log("Transaction not found");
          res.status(404).json({ error: "Transaction not found" });
        }
      })
      .catch((err) => {
        console.error("Failed to delete Transaction:", err);
        if (err.sqlState === '23000' && err.code === 1451) {
          res.status(500).json({ error: "Transaction in use" });
        } else {
        //   res.status(500).json({ error: "Failed to delete Collector/Collector in use" });
        }
      });
  },  
}  

module.exports = transactionController;
