import React, { useState } from 'react';
import RecipientList from './RecipientList';
import AmountEntry from './AmountEntry';
import TransferConfirmation from './TransferConfirmation';
import '../../App.css';
import './style.css';

const SendMoney = () => {
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState("");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    // ✅ APPLY THE CORRECT BACKGROUND CLASS
    <div className="send-money-bg">
      <div className="login-card">

        <h1 style={{ textAlign: 'center', marginBottom: '30px' ,color: '#ffffffff'}}> Cashly Send </h1>

        {step === 1 && (
          <RecipientList
            onSelect={(user) => {
              setRecipient(user);
              nextStep();
            }}
          />
        )}

        {step === 2 && (
          <AmountEntry
            recipient={recipient}
            amount={amount}
            setAmount={setAmount}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}

        {step === 3 && (
          <TransferConfirmation
            recipient={recipient}
            amount={amount}
            onBack={prevStep}
          />
        )}

      </div>
    </div>
  );
};

export default SendMoney;
