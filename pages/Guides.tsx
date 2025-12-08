import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Book, Zap, Clock } from 'lucide-react';
import { Contact } from '../components/Contact';

interface Article {
  title: string;
  type: 'Learn' | 'Action';
  readTime: string;
  tags: string[];
}

interface Category {
  id: string;
  hubTitle: string;
  description: string;
  articles: Article[];
}

const guidesData: Category[] = [
  {
    id: 'musicians',
    hubTitle: "The Musician's Guide to Buying a Home in Seattle",
    description: "Navigate homebuying with gig income, touring schedules, and creative work patterns.",
    articles: [
      {
        title: "How to Qualify for a Mortgage with Gig Income",
        type: "Learn",
        readTime: "8 min",
        tags: ["Income Documentation", "Mortgages"]
      },
      {
        title: "Best Seattle Neighborhoods for Home Studios",
        type: "Learn",
        readTime: "10 min",
        tags: ["Neighborhoods", "Soundproofing"]
      },
      {
        title: "Tax Strategies for Musicians Buying Property",
        type: "Learn",
        readTime: "12 min",
        tags: ["Taxes", "Deductions"]
      },
      {
        title: "Condos vs Houses: What's Better for Musicians?",
        type: "Action",
        readTime: "6 min",
        tags: ["Property Types", "Decision Making"]
      },
      {
        title: "Building Credit as a Touring Musician",
        type: "Learn",
        readTime: "9 min",
        tags: ["Credit", "Financial Health"]
      }
    ]
  },
  {
    id: 'tech',
    hubTitle: "Real Estate for Seattle Founders & Tech Workers",
    description: "Leverage RSUs, equity, and tech compensation for smart real estate moves.",
    articles: [
      {
        title: "Using RSUs and Stock Options for Down Payments",
        type: "Learn",
        readTime: "10 min",
        tags: ["RSUs", "Down Payments"]
      },
      {
        title: "Best Neighborhoods Near Seattle Tech Hubs",
        type: "Learn",
        readTime: "8 min",
        tags: ["Neighborhoods", "Commute"]
      },
      {
        title: "How Lenders View Startup Salaries vs Equity",
        type: "Learn",
        readTime: "11 min",
        tags: ["Income Documentation", "Startups"]
      },
      {
        title: "Investment Properties for Tech Workers",
        type: "Action",
        readTime: "14 min",
        tags: ["Investing", "Wealth Building"]
      },
      {
        title: "Buying During a Funding Round: Timing Your Purchase",
        type: "Action",
        readTime: "7 min",
        tags: ["Timing", "Liquidity"]
      }
    ]
  },
  {
    id: 'creatives',
    hubTitle: "The Creative Professional's Property Playbook",
    description: "For photographers, designers, and freelancers building wealth through real estate.",
    articles: [
      {
        title: "Documenting Freelance Income for Mortgage Approval",
        type: "Learn",
        readTime: "9 min",
        tags: ["Income Documentation", "Self-Employed"]
      },
      {
        title: "Live/Work Spaces in Seattle: What to Know",
        type: "Learn",
        readTime: "12 min",
        tags: ["Property Types", "Zoning"]
      },
      {
        title: "Seattle Neighborhoods with Natural Light & Space",
        type: "Learn",
        readTime: "8 min",
        tags: ["Neighborhoods", "Studio Space"]
      },
      {
        title: "Turning Your Home into a Tax-Advantaged Studio",
        type: "Action",
        readTime: "10 min",
        tags: ["Taxes", "Home Office"]
      },
      {
        title: "First-Time Buyer Programs for Self-Employed Creatives",
        type: "Action",
        readTime: "7 min",
        tags: ["First-Time Buyers", "Programs"]
      }
    ]
  },
  {
    id: 'investors',
    hubTitle: "Seattle Real Estate Investment Guide",
    description: "Build wealth through rental properties, house hacking, and smart acquisitions.",
    articles: [
      {
        title: "House Hacking in Seattle: A Complete Guide",
        type: "Learn",
        readTime: "15 min",
        tags: ["House Hacking", "Strategy"]
      },
      {
        title: "Seattle's Best Neighborhoods for Rental Returns",
        type: "Learn",
        readTime: "13 min",
        tags: ["Investing", "ROI"]
      },
      {
        title: "ADU Laws in Seattle: What You Can Build",
        type: "Learn",
        readTime: "11 min",
        tags: ["ADU", "Regulations"]
      },
      {
        title: "Analyzing Deals: Seattle Investor's Framework",
        type: "Action",
        readTime: "16 min",
        tags: ["Analysis", "Deal Evaluation"]
      },
      {
        title: "Financing Your First Investment Property",
        type: "Action",
        readTime: "9 min",
        tags: ["Financing", "Investment"]
      }
    ]
  }
];

const CategoryAccordion: React.FC<{ category: Category }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-sm overflow-hidden bg-charcoal-800/30 hover:border-copper-500/30 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
            {category.hubTitle}
          </h3>
          <p className="text-sm text-gray-400">
            {category.description}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-copper-500" />
          ) : (
            <ChevronDown className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 space-y-3">
          {category.articles.map((article, index) => (
            <Link
              key={index}
              to={`/guides/${category.id}-${index + 1}`}
              className="block p-4 bg-charcoal-900/50 hover:bg-charcoal-900 border border-white/5 hover:border-copper-500/50 rounded-sm transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-base md:text-lg font-semibold text-white group-hover:text-copper-500 transition-colors mb-2">
                    {article.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500">
                    <span className={`px-2 py-1 rounded-sm font-medium ${
                      article.type === 'Learn' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-copper-500/10 text-copper-400 border border-copper-500/20'
                    }`}>
                      {article.type === 'Learn' ? (
                        <span className="flex items-center gap-1">
                          <Book className="w-3 h-3" />
                          Learn
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          Action
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                    {article.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-gray-500">
                        #{tag.replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export const Guides: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Seattle Real Estate Guides for Creatives, Tech Workers & Investors | Brandon Young</title>
        <meta 
          name="description" 
          content="Expert guides on buying property in Seattle with non-traditional income. Resources for musicians, founders, freelancers, and investors." 
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Seattle Real Estate Guides",
            "description": "Expert guides on buying property in Seattle with non-traditional income",
            "author": {
              "@type": "Person",
              "name": "Brandon Young",
              "jobTitle": "Real Estate Broker"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Brandon Young Real Estate"
            }
          })}
        </script>
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Seattle Real Estate <span className="text-copper-500">Guides</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Expert resources for buying property in Seattle with non-traditional income. 
              Strategies for musicians, tech workers, creatives, and investors.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-copper-500 hover:bg-copper-600 text-white px-8 py-3 rounded-sm font-semibold uppercase tracking-wide text-sm transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </section>

        {/* Guides Content */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {guidesData.map((category) => (
              <CategoryAccordion key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-charcoal-800/50 border-y border-white/5">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              Ready to Buy Your Seattle Home?
            </h2>
            <p className="text-gray-300 mb-8">
              Get personalized guidance for your unique income situation. Let's talk strategy.
            </p>
            <Link
              to="/#contact"
              className="inline-block bg-copper-500 hover:bg-copper-600 text-white px-8 py-3 rounded-sm font-semibold uppercase tracking-wide text-sm transition-colors"
            >
              Contact Brandon
            </Link>
          </div>
        </section>

        {/* Contact Form */}
        <Contact />
      </main>
    </>
  );
};
