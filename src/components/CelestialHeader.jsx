import React from 'react';

const CelestialHeader = ({ activeChakra = "Crown Chakra" }) => {
  // Replace with your actual S3 bucket URL
  const s3Base = "https://your-bucket-name.s3.amazonaws.com/Chakras/";
  
  // Logic to format: "Crown Chakra" -> "crown chakra" (since you have spaces)
  const formattedName = activeChakra.toLowerCase();
  
  // Combine strings without using template literals to keep PowerShell happy
  const chakraImageUrl = s3Base + formattedName + ".png";

  return (
    <header className="relative w-full h-64 overflow-hidden rounded-b-3xl shadow-2xl bg-slate-900">
      {/* Background Image from S3 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-700"
        style={{ backgroundImage: 'url(' + chakraImageUrl + ')' }}
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-gradient-to-t from-slate-900/80 to-transparent">
        <h1 className="text-4xl font-bold tracking-widest uppercase">{activeChakra}</h1>
        <div className="mt-2 h-1 w-24 bg-purple-500 rounded-full animate-pulse"></div>
      </div>
    </header>
  );
};

export default CelestialHeader;
