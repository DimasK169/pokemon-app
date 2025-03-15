import React from "react";
import Home from "./page/home";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="text-fuchsia-500">Component Header</div>
      <Home/>
      <div>Component Footer</div>
    </div>
  );
};

export default Layout;
