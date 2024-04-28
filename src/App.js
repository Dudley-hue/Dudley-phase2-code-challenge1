import React from 'react';
import './App.css';
import Header from './Components/Header.js';
import TransactionTable from './Components/TransactionsTable.js';

function App() {
  const addTransaction = (formData) => {
    console.log(formData);
  };

  return (
    <div className="App">
      <Header />
      <TransactionTable addTransaction={addTransaction} />
    </div>
  );
}

export default App;
