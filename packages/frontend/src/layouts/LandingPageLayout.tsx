import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  List,
  Typography,
  IconButton,
  Button,
  Drawer,
  Divider,
  Box,
  AppBar,
  ListItemButton,
  ListItemText,
  Toolbar,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useTheme } from "@mui/system";
import { useRouter } from "next/router";
import cx from "classnames";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Footer from "../components/LandingPage/Footer";
import { getRoute } from "../components/LandingPage/helper";
import useAuth from "../../lib/util/useAuth";

interface Props {
  children: React.ReactNode;
  landingPageImageUrl?: string;
  currentRoute?: string;
}

const drawerWidth = 240;
const navItems = ["HOME", "ABOUT", "CONTACT"];

const getIcon = (item: string) => {
  switch (item) {
    case "HOME":
      return <HomeIcon />;
    case "ABOUT":
      return <InfoIcon />;
    case "CONTACT":
      return <MailIcon />;
    default:
      return null;
  }
};

interface ScrollHandlerProps {
  children: React.ReactElement;
}

const ScrollHandler: React.FC<ScrollHandlerProps> = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
  });

  return React.cloneElement(children, {
    style: {
      color: trigger ? "#247fbc" : "#fff",
      backgroundColor: trigger ? "#fff" : "transparent",
      boxShadow: trigger
        ? "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -1px rgba(0,0,0,0.06)"
        : "none",
      transition:
        "background-color 0.3s ease-out, border-bottom 0.3s ease-out, box-shadow 0.3s ease-out",
    },
  });
};

const LandingPageLayout: React.FC<Props> = (props) => {
  const { logout, isLoggedIn } = useAuth();
  const { children, landingPageImageUrl } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 250,
  });

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Image
        className={cx(trigger ? "mt-20" : "mt-16", "cursor-pointer")}
        src="/Malta_logo.svg"
        alt="Maltas Logo"
        width={100}
        height={100}
        onClick={() => {
          router.push("/home");
        }}
      />
      <Typography color={"primary"} variant="h5" sx={{ mb: 1 }}>
        Maltas technology Oy
      </Typography>
      <Divider />
      <List
        sx={{
          color: "primary.main",
        }}
      >
        {navItems.map((item) => (
          <ListItemButton
            onClick={() => {
              router.push(getRoute(item));
            }}
            key={item}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              {getIcon(item)}
            </ListItemIcon>
            <ListItemText primary={convertToCapitalized(item)} />
          </ListItemButton>
        ))}
        {isLoggedIn ? (
          <>
            <ListItemButton
              onClick={() => {
                router.push("/");
              }}
              key={"DASHBOARD"}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                logout();
              }}
              key={"LOGOUT"}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </>
        ) : (
          <ListItemButton
            onClick={() => {
              router.push("/login");
            }}
            key={"LOGIN"}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ScrollHandler>
        <AppBar component="nav">
          <Toolbar sx={{ mr: 4, ml: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                color: trigger
                  ? "primary.main"
                  : mobileOpen
                  ? "primary.main"
                  : "#fff",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Image
              src="/Malta_logo.svg"
              alt="Maltas Logo"
              width={40}
              height={40}
              onClick={() => {
                router.push("/");
              }}
              style={{
                marginLeft: theme.breakpoints.down("md") ? "auto" : "24px",
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{
                mx: 1,
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
              Maltas technology Oy
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  startIcon={getIcon(item)}
                  onClick={() => {
                    router.push(getRoute(item));
                  }}
                  variant={props.currentRoute === item ? "outlined" : "text"}
                  sx={{
                    color: trigger ? "primary.main" : "#fff",
                    marginLeft: 4,
                    fontSize: 12,
                  }}
                >
                  {item}
                </Button>
              ))}
              {isLoggedIn ? (
                <>
                  <Button
                    key={"DASHBOARD"}
                    startIcon={<DashboardIcon />}
                    onClick={() => {
                      router.push("/");
                    }}
                    variant={"text"}
                    sx={{
                      color: trigger ? "primary.main" : "#fff",
                      marginLeft: 4,
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    DASHBOARD
                  </Button>
                  <Button
                    key={"LOGOUT"}
                    startIcon={<ExitToAppIcon />}
                    onClick={() => {
                      logout();
                    }}
                    variant={"text"}
                    sx={{
                      color: trigger ? "primary.main" : "#fff",
                      marginLeft: 4,
                      fontSize: 12,
                      cursor: "pointer"
                    }}
                  >
                    LOGOUT
                  </Button>
                </>
              ) : (
                <Button
                  key={"LOGIN"}
                  startIcon={<LockIcon />}
                  onClick={() => {
                    router.push("/login");
                  }}
                  variant={"text"}
                  sx={{
                    color: trigger ? "primary.main" : "#fff",
                    marginLeft: 4,
                    fontSize: 12,
                    cursor: "pointer"
                  }}
                >
                  LOGIN
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </ScrollHandler>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <FullWidthImage
          src={landingPageImageUrl || "/free_doctors_image.jpg"}
          alt="doctors during operation"
          height={400}
        />
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default LandingPageLayout;

export function convertToCapitalized(inputString: string) {
  let resultString =
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
  return resultString;
}

interface FullWidthImageProps {
  src: string;
  alt: string;
  height: number;
}

export const FullWidthImage: React.FC<FullWidthImageProps> = ({
  src,
  alt,
  height,
}) => {
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: `${height}px`, objectFit: "cover" }}
      />
    </div>
  );
};
