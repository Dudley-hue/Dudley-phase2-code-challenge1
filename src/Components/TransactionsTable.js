import React, { useState, useEffect } from "react";
import "./TransactionsTable.css";
 

const TransactionTable = () => {
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem("transactions");
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({ 
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (newTransaction.date && newTransaction.description && newTransaction.amount) {
      setTransactions([...transactions, newTransaction]);
      setNewTransaction({
        date: "",
        description: "",
        category: "",
        amount: "",
      });
    }
  };

  const filteredTransactions = searchTerm
    ? transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  return (
    <div className="transaction-table-container">
      <div className="search-container">
        <input
          type="text"
          className="search-box"
          placeholder="Search your Recent Transactions"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="form-container">
        <form onSubmit={addTransaction}>
          <input
            className="input-group"
            type="date"
            name="date"
            placeholder="Date"
            value={newTransaction.date}
            onChange={handleInputChange}
          />
          <input
            className="input-group"
            type="text"
            name="description"
            placeholder="Description"
            value={newTransaction.description}
            onChange={handleInputChange}
          />
          <input
            className="input-group"
            type="text"
            name="category"
            placeholder="Category"
            value={newTransaction.category}
            onChange={handleInputChange}
          />
          <input
            className="input-group"
            type="text"
            name="amount"
            placeholder="Amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
          />
          <button type="submit">Add Transaction</button>
        </form>
      </div>
      <div className="transaction-list-container">
        <table className="transaction-list">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th  scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index} className="transaction-row">
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
