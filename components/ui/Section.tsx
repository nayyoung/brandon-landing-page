import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noPadding?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, id, className = '', noPadding = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={ref}
      className={`relative w-full overflow-hidden ${noPadding ? '' : 'py-20 md:py-32'} ${className}`}
    >
      <div className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    </section>
  );
};