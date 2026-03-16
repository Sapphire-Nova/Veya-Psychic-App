import React from 'react';

const Booking = () => {
  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#FFD700' }}>Schedule Your Reading</h2>
      <p style={{ marginBottom: '30px', color: '#ccc' }}>Select a 1-hour window between 9am - 10pm.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', borderRadius: '20px', border: '2px solid #333' }}>
        <iframe 
          src="https://calendar.google.com/calendar/embed?src=558d3bcb01a052014c4c2925f282e6c3b726918f6d9deeb4c1e13902028db507%40group.calendar.google.com&ctz=America%2FLos_Angeles" 
          style={{ border: 0 }} 
          width="100%" 
          height="600" 
          frameBorder="0" 
          scrolling="no">
        </iframe>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '0.8rem', color: '#888' }}>Need to sync to your phone?</p>
        <a href="https://calendar.google.com/calendar/ical/558d3bcb01a052014c4c2925f282e6c3b726918f6d9deeb4c1e13902028db507%40group.calendar.google.com/public/basic.ics" 
           style={{ color: '#FFD700', fontSize: '0.8rem' }}>Download iCal Link</a>
      </div>
    </div>
  );
};

export default Booking;
