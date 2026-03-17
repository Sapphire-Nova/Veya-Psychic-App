import React from 'react';
import { getAssetUrl } from '../services/assetService';

const LearnLibrary = ({ category = "Crystals", items = [] }) => {
  return (
    <div className="p-8 bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-400 mb-8 border-b border-purple-800 pb-2">
        {category} Archive
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <div key={item} className="group bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-purple-500 transition-all transform hover:-translate-y-2">
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-slate-900 flex items-center justify-center">
              <img 
                src={getAssetUrl(category, item)} 
                alt={item}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Spirit+Loading'; }}
              />
            </div>
            <p className="text-center text-sm font-medium text-slate-300 group-hover:text-purple-300 capitalize">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnLibrary;
