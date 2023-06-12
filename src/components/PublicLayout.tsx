import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const PublicLayout: React.FC = () => {
  return (
    <div>
      <div className="w-full z-50">
        <Header />
      </div>

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
