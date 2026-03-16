import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookReading from './pages/BookReading';
import Meditations from './pages/Meditations';
import ChakraQuiz from './components/ChakraQuiz';
import LearnLibrary from './components/LearnLibrary';
import Sanctuary from './pages/Sanctuary';
import Login from './pages/Login';

function App() {
  return (
    <div style={{ paddingBottom: '80px' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Meditations" element={<Meditations />} />
        <Route path="/Services" element={<BookReading />} />
        <Route path="/Tools/ChakraCheck" element={<ChakraQuiz />} />
        <Route path="/Chakra-Guide" element={<LearnLibrary />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sanctuary" element={<Sanctuary />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
