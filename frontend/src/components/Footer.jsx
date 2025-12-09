import React from 'react';
import { Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t" style={{ borderColor: 'var(--border-light)', background: 'var(--bg-page)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="font-heading text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                KidoTalk
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Your child's friendly AI voice buddy for learning, playing, and growing.
            </p>
          </div>

          {/* KidoTalk Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>KidoTalk</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>About</a></li>
              <li><a href="#blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Blog</a></li>
              <li><a href="#contact" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Contact</a></li>
            </ul>
          </div>

          {/* Parents Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Parents</h4>
            <ul className="space-y-2">
              <li><a href="#safety" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Safety & Privacy</a></li>
              <li><a href="#help" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Help Center</a></li>
              <li><a href="#terms" className="text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Terms of Use</a></li>
            </ul>
          </div>

          {/* Follow Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Follow</h4>
            <div className="flex gap-4">
              <a href="#instagram" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={20} style={{ color: 'var(--text-primary)' }} />
              </a>
              <a href="#youtube" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube size={20} style={{ color: 'var(--text-primary)' }} />
              </a>
              <a href="#newsletter" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors" aria-label="Newsletter">
                <Mail size={20} style={{ color: 'var(--text-primary)' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t text-center" style={{ borderColor: 'var(--border-light)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2025 KidoTalk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;