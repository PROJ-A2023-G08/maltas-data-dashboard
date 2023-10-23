import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Help from "./Help";

const Layout = () => {
  const [activeComponent, setActiveComponent] = useState("Home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "Dashboard":
        return <Dashboard />;
      case "Settings":
        return <Settings />;
      case "Help":
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar setActiveComponent={setActiveComponent} />
      <div className="bg-white flex-1 p-4 text-black">{renderComponent()}</div>
    </div>
  );
};

export default Layout;
