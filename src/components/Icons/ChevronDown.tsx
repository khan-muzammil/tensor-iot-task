import React from "react";

type Props = {
  className: string;
};

const ChevronDown: React.FC<Props> = ({ className = "w-4 h-4" }) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M7.99999 8.78135L11.3 5.48135L12.2427 6.42402L7.99999 10.6667L3.75732 6.42402L4.69999 5.48135L7.99999 8.78135Z"
        fill="#4B5563"
      />
    </svg>
  );
};

export default ChevronDown;
