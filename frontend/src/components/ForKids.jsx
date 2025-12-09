import React from 'react';
import { Gamepad2, BookOpen, Mic } from 'lucide-react';
import { mockFeatures } from '../mock';

const iconMap = {
  'gamepad-2': Gamepad2,
  'book-open': BookOpen,
  'mic': Mic
};

const ForKids = () => {
  return (
    <section id="for-kids" className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-1 font-heading mb-4">Fun for Kids</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Designed to make learning and talking super fun.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="feature-grid">
          {mockFeatures.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            const colorClass = `accent-${feature.color}`;
            
            return (
              <div key={index} className={`voice-card ${colorClass}`}>
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                    <Icon size={32} style={{ color: 'var(--text-primary)' }} />
                  </div>
                </div>
                <h3 className="heading-2 font-heading mb-3">{feature.title}</h3>
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Visual Examples */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1722230360984-2b0581aef534?w=400&q=80" 
              alt="Kids playing interactive games"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium">Interactive Voice Games</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1758687126234-89901f426283?w=400&q=80" 
              alt="Kids learning together"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium">Educational Content</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src="https://images.unsplash.com/photo-1571593992702-27f222d4059a?w=400&q=80" 
              alt="Kids practicing communication"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-white font-medium">Speaking Practice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForKids;