import React from 'react';
const TarotChat = ({ currentCard = "The Fool" }) => {
  const s3Base = "https://your-bucket-name.s3.amazonaws.com/Tarot%20Cards/";
  const cardImageUrl = s3Base + currentCard.toLowerCase() + ".jpg";
  return (
    <div className="p-6 bg-slate-800 rounded-2xl border border-purple-500/30 flex flex-col items-center">
      <img src={cardImageUrl} alt={currentCard} className="w-64 h-96 object-cover rounded-lg shadow-2xl" 
           onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/256x384?text=Card+Back'; }} />
      <p className="mt-4 text-purple-300 text-xl font-bold">{currentCard}</p>
    </div>
  );
};
export default TarotChat;

