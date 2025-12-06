import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';

const CONTACT_EMAIL = "brandeauxmedia@gmail.com";
const SUBJECT = "Real Estate Strategy Call";
const BODY = "Hi Brandon,\n\nI'd like to schedule a call to talk about my real estate goals.\n\nMy name:\nPhone number:\nBest time to reach me:\n\nThanks!";

const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', contact: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formState);
    setIsSubmitted(true);
    // In a real app, this would send to an API
  };

  return (
    <Section id="contact" className="bg-gradient-to-br from-charcoal-800 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Option A: Book a Call */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Let's talk about <br/><span className="text-copper-500">your goals</span>.
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                No pressure. No sales pitch. Just a conversation about what you're trying to build and how I can help you get there.
              </p>
            </div>

            <div className="bg-charcoal-900 border border-white/10 p-8 rounded-sm">
              <h3 className="text-xl font-bold text-white mb-4">Ready to start?</h3>
              <p className="text-gray-500 mb-6 text-sm">Book a 30-minute strategy session directly on my calendar.</p>
              <Button href={mailtoLink} fullWidth className="justify-between group">
                Schedule Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="mt-4 text-xs text-center text-gray-600">
                I usually book out 1 week in advance.
              </p>
            </div>

            <div className="flex items-center space-x-4 text-gray-500 text-sm">
                <span className="w-12 h-[1px] bg-gray-700"></span>
                <span>OR</span>
                <span className="w-12 h-[1px] bg-gray-700"></span>
            </div>

            <div>
               <p className="text-gray-400">Prefer to text? <a href="tel:2065550123" className="text-copper-500 font-semibold hover:underline">206-555-0123</a></p>
            </div>
          </div>

          {/* Option B: Quick Question Form */}
          <div className="relative">
             <div className="absolute -inset-4 bg-copper-500/10 rounded-lg blur-xl"></div>
             <div className="relative bg-charcoal-900 p-8 md:p-10 border border-white/10 rounded-sm">
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-3 mb-2 text-copper-500">
                        <MessageSquare className="w-5 h-5" />
                        <h3 className="font-bold uppercase tracking-wider text-sm">Quick Question?</h3>
                    </div>
                    
                    <div className="space-y-1">
                      <label htmlFor="name" className="text-sm font-medium text-gray-400">Name</label>
                      <input 
                        id="name"
                        type="text" 
                        required
                        className="w-full bg-charcoal-800 border border-gray-700 text-white p-3 rounded-sm focus:border-copper-500 focus:ring-1 focus:ring-copper-500 outline-none transition-all"
                        placeholder="Your name"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact" className="text-sm font-medium text-gray-400">Email or Phone</label>
                      <input 
                        id="contact"
                        type="text" 
                        required
                        className="w-full bg-charcoal-800 border border-gray-700 text-white p-3 rounded-sm focus:border-copper-500 focus:ring-1 focus:ring-copper-500 outline-none transition-all"
                        placeholder="how can I reach you?"
                        value={formState.contact}
                        onChange={(e) => setFormState({...formState, contact: e.target.value})}
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-sm font-medium text-gray-400">What's on your mind?</label>
                      <textarea 
                        id="message"
                        required
                        rows={4}
                        className="w-full bg-charcoal-800 border border-gray-700 text-white p-3 rounded-sm focus:border-copper-500 focus:ring-1 focus:ring-copper-500 outline-none transition-all resize-none"
                        placeholder="I'm thinking about buying a condo in Capitol Hill..."
                        value={formState.message}
                        onChange={(e) => setFormState({...formState, message: e.target.value})}
                      />
                    </div>

                    <Button type="submit" fullWidth variant="secondary">
                      Send Message
                    </Button>
                    <p className="text-center text-xs text-gray-600 mt-2">I respond personally within 24 hours.</p>
                  </form>
                ) : (
                  <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-fade-in-up">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-gray-400">Thanks for reaching out, {formState.name}. I'll get back to you shortly.</p>
                    <button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormState({ name: '', contact: '', message: '' });
                      }}
                      className="text-copper-500 text-sm font-semibold hover:underline mt-4"
                    >
                      Send another message
                    </button>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </Section>
  );
};