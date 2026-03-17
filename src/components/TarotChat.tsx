import React from 'react';

const TarotChat = ({ currentCard = "The Fool" }) => {
  // Replace with your actual S3 bucket URL
  const s3Base = "https://your-bucket-name.s3.amazonaws.com/Tarot%20Cards/";
  
  // Logic to format: "The Moon" -> "the_moon.jpg"
  const formattedName = currentCard.toLowerCase().replace(/ /g, "_");
  const cardImageUrl = ${s3Base}.jpg;

  return (
    <div className="flex flex-col items-center p-6 bg-slate-800 rounded-2xl border border-purple-500/30">
      <h2 className="text-2xl font-bold text-white mb-4">Your Guidance</h2>
      <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl border-2 border-indigo-400">
        <img 
          src={cardImageUrl} 
          alt={currentCard}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/256x384?text=Card+Back'; }}
        />
      </div>
      <p className="mt-4 text-purple-300 font-medium text-lg">{currentCard}</p>
    </div>
  );
};

export default TarotChat;
