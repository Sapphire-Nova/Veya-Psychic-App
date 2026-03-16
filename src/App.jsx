import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookReading from './pages/BookReading';
import Meditations from './pages/Meditations';
import ChakraQuiz from './components/ChakraQuiz';
import ChakraLibrary from './components/ChakraLibrary';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Meditations" element={<Meditations />} />
      <Route path="/Services" element={<BookReading />} />
      <Route path="/Book-a-Reading" element={<BookReading />} />
      <Route path="/Tools/ChakraCheck" element={<ChakraQuiz />} />
      <Route path="/Chakra-Guide" element={<ChakraLibrary />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  );
}

export default App;
