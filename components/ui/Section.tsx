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

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section 
      id={id} 
      ref={ref}
      className={`relative w-full overflow-hidden ${noPadding ? '' : 'py-16 sm:py-20 md:py-32'} ${className}`}
    >
      <div className={`reveal-on-scroll ${isVisible ? 'is-visible' : ''}`}>
        {children}
      </div>
    </section>
  );
};