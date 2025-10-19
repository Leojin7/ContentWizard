import React from 'react';

interface PopoverProps {
  children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl border border-light-3 shadow-2xl z-30">
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};

export default Popover;
