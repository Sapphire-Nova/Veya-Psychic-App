import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookReading from './pages/BookReading';
import Meditations from './pages/Meditations';
import ChakraQuiz from './components/ChakraQuiz';
import ChakraLibrary from './components/ChakraLibrary';
import Login from './pages/Login';

function App() {
  return (
    <div style={{ paddingBottom: '80px' }}> {/* Space for the bottom navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Meditations" element={<Meditations />} />
        <Route path="/Services" element={<BookReading />} />
        <Route path="/Book-a-Reading" element={<BookReading />} />
        <Route path="/Tools/ChakraCheck" element={<ChakraQuiz />} />
        <Route path="/Chakra-Guide" element={<ChakraLibrary />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
