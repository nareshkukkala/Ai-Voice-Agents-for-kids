import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="header-nav">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <span className="font-heading text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            KidoTalk
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            Home
          </button>
          <button onClick={() => scrollToSection('for-kids')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            For Kids
          </button>
          <button onClick={() => scrollToSection('for-parents')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            For Parents
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            How It Works
          </button>
          <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-70 transition-opacity">
            FAQ
          </button>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button onClick={() => scrollToSection('download')} className="btn-primary">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg border-t" style={{ borderColor: 'var(--border-light)' }}>
          <nav className="flex flex-col p-4 gap-3">
            <button onClick={() => scrollToSection('home')} className="text-left py-2 font-medium hover:opacity-70 transition-opacity">
              Home
            </button>
            <button onClick={() => scrollToSection('for-kids')} className="text-left py-2 font-medium hover:opacity-70 transition-opacity">
              For Kids
            </button>
            <button onClick={() => scrollToSection('for-parents')} className="text-left py-2 font-medium hover:opacity-70 transition-opacity">
              For Parents
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-left py-2 font-medium hover:opacity-70 transition-opacity">
              How It Works
            </button>
            <button onClick={() => scrollToSection('faq')} className="text-left py-2 font-medium hover:opacity-70 transition-opacity">
              FAQ
            </button>
            <button onClick={() => scrollToSection('download')} className="btn-primary mt-2">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;