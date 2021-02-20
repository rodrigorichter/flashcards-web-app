import React from 'react';

export default function Tooltip({ children, content }) {
  const tipRef = React.createRef(null);

  function handleMouseEnter() {
    tipRef.current.style.visibility = "visible";
  }

  function handleMouseLeave() {
    tipRef.current.style.visibility = "hidden";
  }

  return (
    <div className="relative flex justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div
        className="absolute whitespace-nowrap bg-gray-600 text-white text-xs px-2 py-1 rounded flex items-center"
        style={{ top: "100%", marginTop: "10px", visibility: "hidden" }}
        ref={tipRef}>
        {content}
      </div>
      {children}
    </div>
  );
}
