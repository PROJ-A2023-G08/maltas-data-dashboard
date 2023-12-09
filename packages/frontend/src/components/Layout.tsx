import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import SettingsTabs from "../layouts/Settings/SettingsTabs";
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
        return <SettingsTabs />;
      case "Help":
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-start h-screen">
        <Sidebar setActiveComponent={setActiveComponent} />
        {activeComponent !== "Settings" && <div className="bg-backgroundLight flex-1 p-4 px-6 text-black relative h-full overflow-y-scroll">{renderComponent()}</div>}
        {activeComponent === "Settings" && <div className="bg-white flex-1 p-2 text-black relative h-full overflow-y-scroll">{renderComponent()}</div>}
      </div>
    </>
  );
};

export default Layout;
