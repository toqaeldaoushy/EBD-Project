import React from 'react';

const AmountEntry = ({ recipient, amount, setAmount, onNext, onBack }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

    const handleKey = (key) => {
        if (key === '⌫') setAmount(amount.slice(0, -1));
        else if (key === '.' && amount.includes('.')) return;
        else setAmount(amount + key);
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div className="input-password" style={{ padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <p>Sending to {recipient.name}</p>
                <h1 style={{ color: 'var(--red-solid)', fontSize: '36px' }}>${amount || '0'}</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {keys.map(k => (
                    <button key={k} onClick={() => handleKey(k)} 
                            style={{ padding: '15px', border: 'none', background: 'var(--snow-gradient)', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                        {k}
                    </button>
                ))}
            </div>

            <button onClick={onNext} disabled={!amount} 
                    style={{ marginTop: '20px', width: '100%', padding: '15px', background: 'var(--green-gradient)', color: 'white', border: 'none', borderRadius: '999px', fontWeight: 'bold' }}>
                Continue
            </button>
            <p onClick={onBack} style={{ marginTop: '15px', cursor: 'pointer', color: 'var(--text-muted)' }}>← Go Back</p>
        </div>
    );
};

export default AmountEntry;