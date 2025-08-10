import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  children,
  variant = 'primary',
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-gradient-to-br from-primary-navy to-primary-navy/90',
    secondary: 'bg-gradient-to-br from-secondary-teal to-secondary-teal/90',
    accent: 'bg-gradient-to-br from-accent-ochre to-accent-ochre/90',
  };

  return (
    <section className={`${variantClasses[variant]} text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-white">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;