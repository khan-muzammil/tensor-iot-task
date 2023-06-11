import React from "react";
import Logo from "./Icons/Logo";

const Header: React.FC = () => {
  return (
    <div className="h-full shadow">
      <div className="w-full p-5 flex justify-center items-center bg-white z-20">
        <Logo className="w-64 h-8" />
      </div>
    </div>
  );
};

export default Header;
