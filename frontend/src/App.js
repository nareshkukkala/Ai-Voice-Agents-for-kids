import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import './styles/kidotalk.css';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import ForKids from './components/ForKids';
import ForParents from './components/ForParents';
import HowItWorks from './components/HowItWorks';
import VoiceDemoReal from './components/VoiceDemoReal';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// Context
import { AuthProvider } from './contexts/AuthContext';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="relative">
      <Header onGetStartedClick={() => setAuthModalOpen(true)} />
      <Hero />
      <ForKids />
      <ForParents />
      <HowItWorks />
      <VoiceDemoReal />
      <FAQ />
      <Footer />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;