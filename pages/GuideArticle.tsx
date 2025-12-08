import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const GuideArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with email service (e.g., Mailchimp, ConvertKit)
    // For now, just show success message
    setSubscribed(true);
    setEmail('');
  };

  return (
    <>
      <Helmet>
        <title>Coming Soon - Seattle Real Estate Guide | Brandon Young</title>
        <meta 
          name="description" 
          content="This guide is coming soon. Sign up to be notified when it's published." 
        />
      </Helmet>

      <main className="min-h-screen pt-32 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Back Link */}
          <Link
            to="/guides"
            className="inline-flex items-center text-copper-500 hover:text-copper-400 transition-colors mb-8 text-sm font-medium uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Guides
          </Link>

          {/* Coming Soon Content */}
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-copper-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-copper-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              This Guide is Coming Soon
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              We're working on this comprehensive guide. Sign up to be notified when it's published.
            </p>

            {/* Email Capture Form */}
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-4 py-3 bg-charcoal-800 border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-copper-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-copper-500 hover:bg-copper-600 text-white font-semibold uppercase tracking-wide text-sm rounded-sm transition-colors whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </div>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-4 bg-green-500/10 border border-green-500/20 rounded-sm">
                <div className="flex items-center justify-center gap-2 text-green-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <p className="font-medium">Thanks! We'll notify you when this guide is ready.</p>
                </div>
              </div>
            )}

            {/* Alternative CTA */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400 mb-4">
                Need help now? Let's talk about your situation.
              </p>
              <Link
                to="/#contact"
                className="inline-block bg-white/10 hover:bg-copper-500 text-white px-6 py-3 rounded-sm font-semibold uppercase tracking-wide text-sm transition-colors"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
