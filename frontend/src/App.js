import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import KrishiConnect from './modules/krishi/KrishiConnect';
import ArogyaSetu from './modules/arogya/ArogyaSetu';
import GrameenBazaar from './modules/bazaar/GrameenBazaar';
import VoiceGov from './modules/voicegov/VoiceGov';
import MittiCheck from './modules/mitti/MittiCheck';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/krishi" element={<KrishiConnect />} />
            <Route path="/arogya" element={<ArogyaSetu />} />
            <Route path="/bazaar" element={<GrameenBazaar />} />
            <Route path="/voicegov" element={<VoiceGov />} />
            <Route path="/mitti" element={<MittiCheck />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
