import React, { useState } from 'react';

const IconTipName = ({ Icon, size, name, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = () => {
    // Call the onClick function if it's provided, or use an empty function if not
    onClick ? onClick() : (() => { });
  };

  return (
    <div
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} 
    >
      <Icon size={size} />
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            zIndex: 2,
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default IconTipName;
