import React from 'react';
import { Section } from './ui/Section';
import { Music, Briefcase, Key, TrendingUp } from 'lucide-react';

const AudienceCard: React.FC<{ title: string; desc: string; icon: React.ReactNode; index: number }> = ({ title, desc, icon, index }) => (
  <div 
    className="group p-8 border border-white/10 bg-charcoal-800 hover:bg-charcoal-700 transition-all duration-300 rounded-sm hover:-translate-y-2 hover:border-copper-500/50"
  >
    <div className="mb-6 p-4 inline-flex items-center justify-center bg-charcoal-900 rounded-full text-copper-500 group-hover:bg-copper-500 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="font-display text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export const Audience: React.FC = () => {
  const audiences = [
    {
      title: "Creative Professionals",
      desc: "Musicians, photographers, and artists who need a broker who understands gig economy income and unconventional financial records.",
      icon: <Music className="w-6 h-6" />
    },
    {
      title: "Tech Workers & Founders",
      desc: "For those building the future who want a partner that operates at their speed and understands the startup grind.",
      icon: <Briefcase className="w-6 h-6" />
    },
    {
      title: "First-Time Buyers",
      desc: "Intimidated by the Seattle market? I cut through the noise and industry jargon to get you into your first asset.",
      icon: <Key className="w-6 h-6" />
    },
    {
      title: "Investors",
      desc: "Entrepreneurs looking to diversify into real estate. From single-family rentals to commercial turnarounds.",
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <Section id="audience" className="bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
            I speak your language.
          </h2>
          <p className="text-gray-400 text-lg">
            Most brokers look at W-2s. I look at vision. Here is who I serve best in the Seattle market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((aud, idx) => (
            <AudienceCard key={idx} index={idx} title={aud.title} desc={aud.desc} icon={aud.icon} />
          ))}
        </div>
      </div>
    </Section>
  );
};