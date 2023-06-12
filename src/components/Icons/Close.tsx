import React from "react";

type Props = {
  className?: string;
};

const Close: React.FC<Props> = ({ className = "w-3 h-3" }) => {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M5.99999 4.82166L10.125 0.696655L11.3033 1.87499L7.17832 5.99999L11.3033 10.125L10.125 11.3033L5.99999 7.17832L1.87499 11.3033L0.696655 10.125L4.82166 5.99999L0.696655 1.87499L1.87499 0.696655L5.99999 4.82166Z"
        fill="#4B5563"
      />
    </svg>
  );
};

export default Close;
