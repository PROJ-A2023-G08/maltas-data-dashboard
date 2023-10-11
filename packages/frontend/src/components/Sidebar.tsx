import HomeIcon from "@mui/icons-material/Home";
import GridViewIcon from "@mui/icons-material/GridView";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";

const menuItems = [
  {
    name: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    name: "Dashboard",
    icon: <GridViewIcon />,
    path: "/Dashboard",
  },
  {
    name: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
  {
    name: "Help",
    icon: <HelpIcon />,
    path: "/help",
  },
];

const Sidebar = () => {
  return (
    <div className="h-screen px-4 pt-8 pb-4 bg-slate-600 flex justify-between flex-col w-80">
      <div className="flex flex-co">
        <div className="flex items-center pl-1 gap-4">
          <h2>LOGO HERE</h2>
        </div>
      </div>
      <div className="flex flex-col items-start mt-24">
        {menuItems.map((item) => (
          <div className="flex items-center gap-2 w-full mb-4" key={item.name}>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
              {item.icon}
            </div>
            <p className="text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
