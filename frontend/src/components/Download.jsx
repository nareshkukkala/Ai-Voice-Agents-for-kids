import React from 'react';
import { Apple, Chrome } from 'lucide-react';

const Download = () => {
  return (
    <section id="download" className="py-20 px-6" style={{ background: 'var(--gradient-hero-warm)' }}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="heading-1 font-heading mb-4">Ready to Talk, Learn, and Play?</h2>
        <p className="body-large mb-12" style={{ color: 'var(--text-secondary)' }}>
          Set up KidoTalk in just a few minutes.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button className="btn-primary flex items-center gap-3 px-8">
            <Apple size={24} />
            <div className="text-left">
              <div className="text-xs uppercase tracking-wide opacity-80">Download on</div>
              <div className="text-base font-semibold">App Store</div>
            </div>
          </button>
          <button className="btn-secondary flex items-center gap-3 px-8">
            <Chrome size={24} />
            <div className="text-left">
              <div className="text-xs uppercase tracking-wide opacity-80">Use in</div>
              <div className="text-base font-semibold">Browser</div>
            </div>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
          <div className="text-center">
            <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>10K+</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Happy Families</p>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
          <div className="text-center">
            <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>4.9/5</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Average Rating</p>
          </div>
          <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
          <div className="text-center">
            <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>100%</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Parent Approved</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;