import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
  color?: 'red' | 'blue' | 'gray';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'solid', color = 'red', size = 'md', className = '', disabled = false }) => {
  const baseStyles = 'rounded-lg font-medium transition-colors';
  const variantStyles = {
    solid: {
      red: 'bg-red-600 text-white hover:bg-red-700',
      blue: 'bg-blue-600 text-white hover:bg-blue-700',
      gray: 'bg-gray-600 text-white hover:bg-gray-700',
    },
    outline: {
      red: 'border border-red-600 text-red-600 hover:bg-red-50',
      blue: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
      gray: 'border border-gray-600 text-gray-600 hover:bg-gray-50',
    },
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant][color]} ${className}`}>
      {children}
    </button>
  );
};