import React from 'react';
import { Download, UserPlus, MessageCircle } from 'lucide-react';
import { mockSteps } from '../mock';

const iconMap = [
  Download,
  UserPlus,
  MessageCircle
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6" style={{ background: 'var(--bg-section)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-1 font-heading mb-4">How KidoTalk Works</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Get started in just three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {mockSteps.map((step, index) => {
            const Icon = iconMap[index];
            return (
              <div key={index} className="relative">
                {/* Connector Line (desktop only) */}
                {index < mockSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent" style={{ zIndex: 0 }} />
                )}
                
                <div className="voice-card accent-grey hover-lift relative" style={{ zIndex: 1 }}>
                  {/* Step Number Circle */}
                  <div className="mb-4 relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                      <Icon size={32} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full" style={{ background: 'var(--text-primary)' }}>
                      <span className="text-white font-bold flex items-center justify-center h-full">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="heading-2 font-heading text-center mb-3">{step.title}</h3>
                  <p className="body-medium text-center" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;