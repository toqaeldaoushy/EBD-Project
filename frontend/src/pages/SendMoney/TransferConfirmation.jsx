import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../../api/client"; // 1. Make sure you import the API client

const TransferConfirmation = ({ recipient, amount, onBack }) => {
    const navigate = useNavigate();

    // 2. Put the handleConfirm function right here
    const handleConfirm = async () => {
        try {
            const response = await api.post('/transfer/send', {
                receiverPhone: recipient.phone, 
                amount: Number(amount),
                description: "App Transfer"
            });

            if (response.status === 200) {
                alert("YAAAYYYY!💰,Transfer Successful! 💸");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Transfer Error:", error.response?.data);
            alert(error.response?.data?.message || "OH NO, Transfer Error");
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="confirm-box">
                <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recipient.seed}`} 
                    style={{ width: '80px' }} 
                    alt="avatar"
                />
                <h3>Confirm Transfer</h3>
                <p>You are sending</p>
                <h1 style={{ color: 'var(--green-solid)' }}>{amount} EGP</h1>
                <p>to <b>{recipient.name}</b></p>
            </div>

            {/* 3. Link the function to the button using onClick */}
            <button 
                onClick={handleConfirm} 
                className="input-email" 
                style={{ width: '100%', padding: '15px', background: 'var(--green-gradient)', color: 'white', border: 'none', borderRadius: '999px', fontWeight: 'bold', cursor: 'pointer' }}
            >
                Confirm & Send
            </button>
            
            <p onClick={onBack} style={{ marginTop: '15px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                Edit Amount
            </p>
        </div>
    );
};

export default TransferConfirmation;