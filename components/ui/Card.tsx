import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '', padding = 'p-6' }) => {
  return (
    <div className={`bg-white ${padding} rounded-2xl border border-light-3 ${className}`}>
      {children}
    </div>
  );
};

export default Card;