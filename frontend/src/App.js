import React, { useEffect } from 'react';
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
import Download from './components/Download';
import Footer from './components/Footer';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
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
      <Header />
      <Hero />
      <ForKids />
      <ForParents />
      <HowItWorks />
      <VoiceDemoReal />
      <FAQ />
      <Download />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;