import React from 'react';

// Accurate SVG representations of the 7 chakra yantras / Sanskrit symbols
const symbols = {
  root: (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Muladhara - 4-petal lotus with downward triangle and square */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 4 petals */}
      {[0,90,180,270].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="10" ry="20" fill={color} opacity="0.5"
          transform={`rotate(${a} 50 50) translate(0 -28)`}/>
      ))}
      {/* Square */}
      <rect x="30" y="30" width="40" height="40" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"
        transform="rotate(45 50 50)"/>
      {/* Downward triangle */}
      <polygon points="50,38 38,62 62,62" fill={color} opacity="0.6"/>
      {/* Inner dot */}
      <circle cx="50" cy="50" r="4" fill={color}/>
      {/* Sanskrit ल */}
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" opacity="0.9">ल</text>
    </svg>
  ),
  sacral: (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Svadhisthana - 6-petal lotus with circle and crescent */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 6 petals */}
      {[0,60,120,180,240,300].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="9" ry="18" fill={color} opacity="0.5"
          transform={`rotate(${a} 50 50) translate(0 -28)`}/>
      ))}
      {/* Circle */}
      <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
      {/* Crescent moon */}
      <path d="M 38 50 A 12 12 0 0 0 62 50 A 8 8 0 0 1 38 50 Z" fill={color} opacity="0.7"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" opacity="0.9">व</text>
    </svg>
  ),
  'solar-plexus': (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Manipura - 10-petal lotus with downward triangle */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 10 petals */}
      {[0,36,72,108,144,180,216,252,288,324].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="7" ry="16" fill={color} opacity="0.5"
          transform={`rotate(${a} 50 50) translate(0 -27)`}/>
      ))}
      {/* Downward triangle */}
      <polygon points="50,28 28,65 72,65" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.2"/>
      {/* Inner triangle with T-bars (fire) */}
      <polygon points="50,36 34,60 66,60" fill={color} opacity="0.5"/>
      <line x1="34" y1="60" x2="34" y2="52" stroke={color} strokeWidth="2"/>
      <line x1="66" y1="60" x2="66" y2="52" stroke={color} strokeWidth="2"/>
      <line x1="50" y1="36" x2="44" y2="44" stroke={color} strokeWidth="2"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" opacity="0.9">र</text>
    </svg>
  ),
  heart: (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Anahata - 12-petal lotus with Star of David (two triangles) */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 12 petals */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="6" ry="15" fill={color} opacity="0.5"
          transform={`rotate(${a} 50 50) translate(0 -27)`}/>
      ))}
      {/* Upward triangle */}
      <polygon points="50,28 28,65 72,65" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
      {/* Downward triangle */}
      <polygon points="50,72 28,35 72,35" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.15"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" opacity="0.9">य</text>
    </svg>
  ),
  throat: (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Vishuddha - 16-petal lotus with downward triangle in circle */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 16 petals */}
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map(a => (
        <ellipse key={a} cx="50" cy="50" rx="5" ry="13" fill={color} opacity="0.5"
          transform={`rotate(${a} 50 50) translate(0 -28)`}/>
      ))}
      {/* Circle */}
      <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1"/>
      {/* Downward triangle inside circle */}
      <polygon points="50,35 35,62 65,62" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.4"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontFamily="serif" opacity="0.9">ह</text>
    </svg>
  ),
  'third-eye': (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ajna - 2-petal lotus with inverted triangle and Om */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* 2 petals (left and right) */}
      <ellipse cx="50" cy="50" rx="22" ry="10" fill={color} opacity="0.3" transform="rotate(0 50 50) translate(-24 0)"/>
      <ellipse cx="50" cy="50" rx="22" ry="10" fill={color} opacity="0.3" transform="rotate(0 50 50) translate(24 0)"/>
      {/* Circle */}
      <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
      {/* Downward triangle */}
      <polygon points="50,33 34,60 66,60" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.35"/>
      {/* Om symbol */}
      <text x="50" y="55" textAnchor="middle" fill="white" fontSize="18" fontFamily="serif" opacity="0.95">ॐ</text>
    </svg>
  ),
  crown: (color) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sahasrara - 1000-petal lotus represented as radiating lines + circle */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
      {/* Radiating "petals" as lines */}
      {Array.from({length:24}).map((_, i) => {
        const angle = (i * 15) * Math.PI / 180;
        const x1 = 50 + 22 * Math.cos(angle);
        const y1 = 50 + 22 * Math.sin(angle);
        const x2 = 50 + 40 * Math.cos(angle);
        const y2 = 50 + 40 * Math.sin(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" opacity="0.6"/>;
      })}
      {/* Inner circles */}
      <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1"/>
      <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15"/>
      <circle cx="50" cy="50" r="6" fill={color} opacity="0.8"/>
      <text x="50" y="53" textAnchor="middle" fill="white" fontSize="8" fontFamily="serif" opacity="0.9">ॐ</text>
    </svg>
  ),
};

export default function ChakraSymbol({ chakraId, color, size = 192 }) {
  const render = symbols[chakraId];
  if (!render) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 20px ${color}80)`,
      }}
    >
      {render(color)}
    </div>
  );
}
