import React from 'react';
import { Sparkles } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-purple-600" />
            <span className="font-mono text-xs uppercase tracking-wide">New: Voice Games for Kids</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-hero font-heading mb-6">
            Meet KidoTalk, Your Child's Friendly AI Voice Buddy
          </h1>

          {/* Subheadline */}
          <p className="body-large mb-8" style={{ color: 'var(--text-secondary)' }}>
            Kids can ask questions, play games, and practice speaking safely with a smart, kid-friendly voice assistant.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={() => scrollToSection('demo')} className="btn-primary">
              Try KidoTalk
            </button>
            <button onClick={() => scrollToSection('demo')} className="btn-secondary">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex justify-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1743677077216-00a458eff9e0?w=600&q=80" 
              alt="Children interacting with friendly robot assistant"
              className="rounded-3xl shadow-2xl w-full max-w-md"
            />
            {/* Floating Speech Bubbles */}
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-3 shadow-lg hidden md:block">
              <p className="text-sm font-medium">What's 5 + 3?</p>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-3 shadow-lg hidden md:block">
              <p className="text-sm font-medium">Tell me a story!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;