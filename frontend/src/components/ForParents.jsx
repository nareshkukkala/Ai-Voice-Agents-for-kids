import React from 'react';
import { ShieldCheck, Clock, Activity, XCircle } from 'lucide-react';
import { mockParentFeatures } from '../mock';

const iconMap = {
  'shield-check': ShieldCheck,
  'clock': Clock,
  'activity': Activity,
  'x-circle': XCircle
};

const ForParents = () => {
  return (
    <section id="for-parents" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-1 font-heading mb-4">Built with Parents in Mind</h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            Safe, transparent, and always under your control.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Feature Bullets */}
          <div>
            <div className="grid sm:grid-cols-2 gap-6">
              {mockParentFeatures.map((feature, index) => {
                const Icon = iconMap[feature.icon];
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Icon size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Safety Card with Image */}
          <div className="voice-card accent-green">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1629360057380-18b15b42e650?w=500&q=80" 
                alt="Parent and child safely using technology together"
                className="rounded-lg w-full h-64 object-cover"
              />
            </div>
            <h3 className="heading-2 font-heading mb-3">Safety & Privacy</h3>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              KidoTalk is designed to protect your child's privacy. Voice data is handled securely, and parents can view or delete history at any time.
            </p>
            <div className="mt-6 flex gap-3">
              <div className="flex-1 bg-white/50 rounded-lg p-3 text-center">
                <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>100%</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Safe Content</p>
              </div>
              <div className="flex-1 bg-white/50 rounded-lg p-3 text-center">
                <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>0</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Ads Shown</p>
              </div>
              <div className="flex-1 bg-white/50 rounded-lg p-3 text-center">
                <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>24/7</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForParents;