import React, { useState } from 'react';
import RecipientList from './RecipientList';
import AmountEntry from './AmountEntry';
import TransferConfirmation from './TransferConfirmation';
import '../../App.css'; // Import the team styles
import './style.css'; // Import SendMoney specific styles

const SendMoney = () => {
    const [step, setStep] = useState(1);
    const [recipient, setRecipient] = useState(null);
    const [amount, setAmount] = useState("");

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="login-right" style={{ minHeight: '100vh', width: '100%' }}>
            <div className="login-card">
                <h1 className="brand" style={{ textAlign: 'center', marginBottom: '30px' }}>Cashly Send</h1>
                
                {step === 1 && (
                    <RecipientList 
                        onSelect={(user) => { setRecipient(user); nextStep(); }} 
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