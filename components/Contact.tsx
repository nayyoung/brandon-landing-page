import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { CONTACT_EMAIL, EMAIL_SUBJECTS, EMAIL_BODIES, createMailtoLink } from '../constants';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', contact: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fingerprint, setFingerprint] = useState<string>('');

  useEffect(() => {
    let fp = localStorage.getItem('visitor_fingerprint');
    if (!fp) {
      fp = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('visitor_fingerprint', fp);
    }
    setFingerprint(fp);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Try to save to Supabase
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([
          { 
            name: formState.name, 
            contact: formState.contact, 
            message: formState.message,
            client_fingerprint: fingerprint
          }
        ]);

      if (supabaseError) throw supabaseError;

      // 2. Success!
      setIsSubmitted(true);
      
    } catch (err) {
      // 3. Fallback: If DB fails, open email client so lead isn't lost
      setError("Failed to save to database. Opening your email client as a backup.");
      
      setTimeout(() => {
         const subject = EMAIL_SUBJECTS.WEBSITE_LEAD(formState.name);
         const body = EMAIL_BODIES.WEBSITE_LEAD(formState.name, formState.contact, formState.message);
         window.location.href = createMailtoLink(CONTACT_EMAIL, subject, body);
         setIsSubmitted(true);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
        <Section id="contact" className="bg-gradient-to-br from-charcoal-800 to-black">
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4 animate-fade-in-up py-20">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Message Received!</h3>
            <p className="text-gray-400 max-w-md mx-auto">Thanks {formState.name}. I've got your info safely and will reach out to <strong>{formState.contact}</strong> shortly.</p>
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
        </Section>
    )
  }

  return (
    <Section id="contact" className="bg-gradient-to-br from-charcoal-800 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Let's talk about <br/><span className="text-copper-500">your goals</span>.
              </h2>
              <p className="text-gray-400 text-lg max-w-md">
                No pressure. No sales pitch. Just a conversation about what you're trying to build.
              </p>
            </div>

            <div className="bg-charcoal-900 border border-white/10 p-8 rounded-sm">
              <h3 className="text-xl font-bold text-white mb-4">Ready to start?</h3>
              <p className="text-gray-500 mb-6 text-sm">Book a 30-minute strategy session directly on my calendar.</p>
              <Button href={`mailto:${CONTACT_EMAIL}`} fullWidth className="justify-between group">
                Schedule Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative">
             <div className="absolute -inset-4 bg-copper-500/10 rounded-lg blur-xl"></div>
             <div className="relative bg-charcoal-900 p-8 md:p-10 border border-white/10 rounded-sm">
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

                    {error && <p className="text-copper-400 text-sm animate-pulse">{error}</p>}

                    <Button type="submit" fullWidth variant="secondary" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};