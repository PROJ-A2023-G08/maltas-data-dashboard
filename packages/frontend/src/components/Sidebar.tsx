import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarProps {
  setActiveComponent: (componentName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const handleSidebarItemClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      name: "Dashboard",
      icon: <GridViewIcon />,
    },
    {
      name: "Settings",
      icon: <SettingsIcon />,
    },
    {
      name: "Help",
      icon: <HelpIcon />,
    },
  ];

  return (
    <div className="bg-gray-800 text-white w-60 min-h-screen">
      <div className="flex flex-col items-start justify-between h-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-center justify-center w-full h-40">
            <img
              className="w-8 h-8 rounded-full"
              src="https://avatars.githubusercontent.com/u/10491406?v=4"
              alt="avatar"
            />
            <h3 className="text-lg font-bold">LOGO HERE</h3>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            {menuItems.map((item) => (
              <div
                className="flex flex-row items-center justify-start w-full h-12 pl-5 cursor-pointer hover:bg-gray-700"
                key={item.name}
                onClick={() => handleSidebarItemClick(item.name)}
              >
                <div className="mr-4">{item.icon}</div>
                <div>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-start w-full h-12 pl-5 cursor-pointer hover:bg-gray-700">
          <div className="mr-4">
            <LogoutIcon />
          </div>
          <div>Log out here?</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
