import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
} = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-6 py-4 border-b border-gray-200">{children}</div>;
};

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-6 py-4">{children}</div>;
};

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">{children}</div>;
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;