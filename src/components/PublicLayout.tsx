import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div>
      <div className="w-full z-50">
        <Header />
      </div>

      <div className="w-full">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
