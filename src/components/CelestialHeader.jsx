import React from 'react';
const CelestialHeader = ({ activeChakra = "Crown Chakra" }) => {
  const s3Base = "https://your-bucket-name.s3.amazonaws.com/Chakras/";
  const chakraImageUrl = s3Base + activeChakra.toLowerCase() + ".png";
  return (
    <header className="relative w-full h-64 overflow-hidden bg-slate-900">
      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(' + chakraImageUrl + ')' }} />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{activeChakra}</h1>
      </div>
    </header>
  );
};
export default CelestialHeader;
