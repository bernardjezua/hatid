import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <section className="premium-gradient py-32 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-8 gap-4 transform rotate-12">
            {Array(32).fill(0).map((_, i) => <div key={i} className="w-full h-24 bg-white rounded-2xl"></div>)}
          </div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Connecting Hearts <br/> <span className="text-primary-sage">& Harvests.</span></h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            HATID is more than a marketplace. We are a digital cooperative dedicated to empowering the Filipino farmer through technology and direct community access.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black text-primary-forest mb-6">Our Mission</h2>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Founded in the heart of agricultural heritage, HATID (meaning "to deliver" or "to bring") was created to solve the supply chain inefficiencies that have long hindered our local farmers. 
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-sage/30 rounded-full flex items-center justify-center text-primary-forest text-2xl">🚜</div>
              <div>
                <h4 className="font-bold text-primary-900">Direct Access</h4>
                <p className="text-sm text-neutral-500">Removing middlemen to ensure farmers get the best price for their hard work.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary-sage/30 rounded-full flex items-center justify-center text-primary-forest text-2xl">🌿</div>
              <div>
                <h4 className="font-bold text-primary-900">Sustainable Growth</h4>
                <p className="text-sm text-neutral-500">Promoting organic and sustainable farming practices through quality supplies.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bento-card bg-primary-forest p-2 rotate-2 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
              alt="Farmer field" 
              className="rounded-2xl w-full h-[400px] object-cover"
            />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-24 px-6 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-primary-forest text-center mb-16">The HATID Promise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
              <span className="text-4xl mb-4 block">🛡️</span>
              <h3 className="text-xl font-bold mb-2">Quality Verified</h3>
              <p className="text-neutral-500 text-sm">Every product, from seeds to machinery, is verified by our agricultural experts.</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
              <span className="text-4xl mb-4 block">🤝</span>
              <h3 className="text-xl font-bold mb-2">Fair Trade</h3>
              <p className="text-neutral-500 text-sm">We ensure a transparent ecosystem where both buyers and vendors thrive equally.</p>
            </div>
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100">
              <span className="text-4xl mb-4 block">⚡</span>
              <h3 className="text-xl font-bold mb-2">Fast Logistics</h3>
              <p className="text-neutral-500 text-sm">Efficient delivery systems built to handle fresh produce and heavy equipment alike.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-black text-primary-forest mb-6">Ready to grow with us?</h2>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn-forest px-10">Get Started</Link>
          <Link to="/" className="btn-sage">Back to Market</Link>
        </div>
      </section>
    </div>
  );
}
