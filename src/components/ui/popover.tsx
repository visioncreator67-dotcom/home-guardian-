import React, { useState, useRef, useEffect } from 'react';

export const Popover: React.FC<{ children: React.ReactNode; trigger: React.ReactNode; placement?: 'top' | 'bottom'; contentClass?: string }> & {
  Panel: React.FC<{ children: React.ReactNode }>;
} = ({ children, trigger, placement = 'bottom', contentClass = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && <div className={`absolute z-50 ${placement === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'} ${contentClass}`}>{children}</div>}
    </div>
  );
};

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white rounded-lg shadow-lg border p-4 min-w-[200px]">{children}</div>
);

Popover.Panel = Panel;