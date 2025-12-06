import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  href,
  external,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 font-sans font-semibold transition-all duration-300 transform active:scale-95 tracking-wide text-sm uppercase min-h-[48px]";
  
  const variants = {
    primary: "bg-copper-500 text-white hover:bg-copper-600 shadow-[0_4px_14px_0_rgba(194,124,75,0.39)] hover:shadow-[0_6px_20px_rgba(194,124,75,0.23)]",
    secondary: "bg-white text-charcoal-900 hover:bg-gray-100",
    outline: "border border-white/20 text-white hover:bg-white/5 backdrop-blur-sm",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a 
        href={href} 
        className={combinedClassName}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};