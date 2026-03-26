import React, { useState, useRef, useEffect } from 'react';

interface PopoverProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  contentClass?: string;
}

export const Popover: React.FC<PopoverProps> & {
  Panel: React.FC<{ children: React.ReactNode }>;
} = ({ children, trigger, placement = 'bottom', contentClass = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const placementStyles = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute z-50 ${placementStyles[placement]} ${contentClass}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[200px]">
      {children}
    </div>
  );
};

Popover.Panel = Panel;