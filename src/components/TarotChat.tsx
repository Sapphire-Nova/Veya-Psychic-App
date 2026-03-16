import React, { useState } from 'react';
import { db } from '../services/aws-config';

export const TarotChat: React.FC = () => {
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const userId = "USER_ID_123"; // Logic to get current user ID

  const sendMessage = async () => {
    if (!input.trim()) return;
    const CREDIT_COST = 25;

    try {
      // 1. Deduct Credits from DynamoDB
      await db.updateItem({
        TableName: 'VeyaUserCredits',
        Key: { userId: { S: userId } },
        UpdateExpression: "SET credits = credits - :val",
        ConditionExpression: "credits >= :val",
        ExpressionAttributeValues: { ":val": { N: CREDIT_COST.toString() } }
      });

      // 2. Add user message to UI
      const newMessages = [...messages, { role: 'user', text: input }];
      setMessages(newMessages);
      setInput('');

      // 3. Simulated Tarot Response (Integrate AI here later)
      setTimeout(() => {
        setMessages([...newMessages, { role: 'bot', text: "The cards suggest a change is coming. Trust your intuition." }]);
      }, 1000);

    } catch (err) {
      alert("Insufficient credits! Please go to the Top Up page.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', background: '#1e1e1e', color: 'white', borderRadius: '10px' }}>
      <div style={{ height: '400px', overflowY: 'scroll', marginBottom: '10px', borderBottom: '1px solid #333' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '10px 0' }}>
            <span style={{ background: m.role === 'user' ? '#9c27b0' : '#333', padding: '8px 12px', borderRadius: '10px' }}>{m.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '5px', border: 'none' }} placeholder="Ask the cards..." />
        <button onClick={sendMessage} style={{ padding: '10px 20px', background: '#9c27b0', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Send (25c)</button>
      </div>
    </div>
  );
};
