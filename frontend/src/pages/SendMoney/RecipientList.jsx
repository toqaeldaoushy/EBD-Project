import React from 'react';

const RecipientList = ({ onSelect }) => {
    // These are placeholders - later we fetch these from the backend
    const contacts = [
        { id: 1, name: 'Toqa', seed: 'Toqa' },
        { id: 2, name: 'Sarah Samy', seed: 'Sarah' },
        { id: 3, name: 'Malak', seed: 'Malak' }
    ];

    return (
        <div>
            <p style={{ marginBottom: '20px', textAlign: 'center' }}>Who are you sending money to?</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {contacts.map(user => (
                    <div key={user.id} onClick={() => onSelect(user)} className="input-email" 
                         style={{ cursor: 'pointer', textAlign: 'center', padding: '15px', borderRadius: '20px' }}>
                        <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.seed}`} 
                            alt="avatar" 
                            style={{ width: '60px', marginBottom: '10px' }} 
                        />
                        <p style={{ color: 'var(--green-solid)', fontWeight: 'bold' }}>{user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipientList;