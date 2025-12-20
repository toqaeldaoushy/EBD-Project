import React from 'react';

const historyCard = ({ transaction }) => {
  return (
    <div className="transaction-card">
      <div className="transaction-date">{transaction.date}</div>
      <div className="transaction-description">{transaction.description}</div>
      <div className="transaction-amount">{transaction.amount}</div>
      <div className="transaction-type">{transaction.type}</div>
    </div>
  );
};

export default historyCard;
