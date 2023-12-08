import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "next-i18next";
import useAuth from "../../lib/util/useAuth";
import Image from 'next/image'
import { ButtonBase } from "@mui/material";
import { useUserProfile } from "../../lib/queries";
import { Typography, Avatar } from "@mui/material";

interface SidebarProps {
  setActiveComponent: (componentName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveComponent }) => {
  const { t } = useTranslation("common");
  const { logout} = useAuth();
  const userDataApi = useUserProfile();
  const userData = userDataApi?.data 

  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleSidebarItemClick = (componentName: string) => {
    setActiveComponent(componentName);
    setSelectedItem(componentName); 
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
    <div className="bg-darkblue text-white w-60 min-h-screen pl-2 pr-2">
      <div className="flex flex-col items-start justify-between h-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col items-center justify-center w-full h-36">
            <div className="pt-20">
              <Image
                src="/Malta_logo.svg"
                alt="Maltas Logo"
                width={160}
                height={160}
              />
            </div>
          </div>

          <div className="flex flex-col items-start justify-start w-full pt-12">
            <Typography color={"primary"} variant="h5" sx={{
              width: "100%",
              textAlign: "center",
              marginTop: "15px",
              fontWeight: 700,
            }}>
              Maltas technology Oy
            </Typography>
            {userData && (
              <List sx={{
                paddingTop: "20px"
              }}>
                <ListItem>
                  <ListItemIcon>
                    <Avatar alt={"user image"} src={userData.imageUrl || ""} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      fontWeight: 700,
                    }}
                    primary={`${userData.firstName || ""}  || ${
                      userData.lastName || ""
                    }`}
                    color="#fff"
                    secondary={
                      <Typography variant="body2" color={"primary.main"}>
                        {userData.email || ""}
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            )}
            <List
              className="w-full"
              component="nav"
              aria-label="main mailbox folders"
            >
              {menuItems.map((item) => (
                <ListItem
                  sx={{
                    width: "100% !important",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSidebarItemClick(item.name)}
                  key={item.name}
                  className={`${
                    selectedItem === item.name
                      ? "bg-selection text-black rounded-xl mb-2"
                      : "hover:bg-white hover:text-black rounded-xl mb-2"
                  }`}
                  style={{ height: "70px" }}
                >
                  <ButtonBase
                    className="flex items-center"
                    disableTouchRipple
                    disableRipple
                  >
                    <div className="-ml-2 pt-1">
                      <ListItemIcon>{item.icon}</ListItemIcon>
                    </div>
                    <p className="font-bold text-xl -ml-6">
                      {t("sidebar." + item.name)}
                    </p>
                  </ButtonBase>
                </ListItem>
              ))}
            </List>
          </div>
        </div>
        <div
          onClick={() => {
            logout();
          }}
          className="flex flex-row items-center justify-start w-52 h-12 pl-5 cursor-pointer hover:bg-white hover:text-black hover:rounded-md"
        >
          <div className="mr-4">
            <LogoutIcon />
          </div>
          <p className="font-bold">{t("sidebar.LogOut")}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;