import React, { useState, useMemo } from "react";
import Notifications from "@mui/icons-material/Notifications";
import LockIcon from "@mui/icons-material/Lock";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircle from "@mui/icons-material/AccountCircle";
import BusinessIcon from "@mui/icons-material/Business";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import Loading from "@/components/Loading/Loading";
import NotificationSettingsPage from "./NotificationSettings";
import LanguageSettingsPage from "./LanguageSettings";
import AdminPage from "./AdminPage";
import {
  useMediaQuery,
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  useTheme,
  Theme,
  ListItemIcon,
} from "@mui/material";
import Profile from "./Profile";
import { useUserProfile } from "../../../lib/queries";
import UpdatePassword from "./UpdatePassword";

interface SettingsTabsProps {
  //
}

const SettingsTabs: React.FC<SettingsTabsProps> = () => {
  const userApi = useUserProfile({
    keepPreviousData: true,
  });

  const userData = userApi?.data;
  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (userApi.isLoading || !userApi.data) {
    return <Loading />;
  }

  return (
    <div className={isSmallScreen ? "pt-0" : "flex pt-0"}>
      <Tabs
        orientation={"vertical"}
        variant={"scrollable"}
        value={value}
        onChange={handleChange}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
          padding: (theme) => theme.spacing(2),
          minWidth: "232px",
        }}
      >
        <Tab
          icon={<AccountCircle />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Profile"
          iconPosition="start"
        />
        <Tab
          icon={<SettingsIcon />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Account Settings"
          iconPosition="start"
        />
        <Tab
          icon={<LockIcon />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Update Password"
          iconPosition="start"
        />
        <Tab
          icon={<Notifications />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Notifications"
          iconPosition="start"
        />
        <Tab
          icon={<BusinessIcon />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Organizations"
          iconPosition="start"
        />
        {userData && userData.isAdmin? <Tab
          icon={<SupervisorAccount />}
          sx={{ minHeight: "12px", minWidth: "200px", justifyContent: "start" }}
          label="Admin"
          iconPosition="start"
        />: null}
      </Tabs>

      <Box px={3} sx={{ width: "100%" }}>
        {value === 0 && (
          <>
            <Typography
              variant="h2"
              sx={{
                paddingTop: isSmallScreen ? "24px" : "14px",
                marginLeft: "30px",
              }}
              className="text-slate-600"
            >
              Profile
            </Typography>
            <Profile user={userData} />
          </>
        )}

        {value === 1 && (
          <>
            <Typography
              variant="h2"
              sx={{
                marginLeft: "30px",
                paddingTop: isSmallScreen ? "24px" : "14px",
              }}
              className="text-slate-600"
            >
              Account Settings
            </Typography>
            <div>
              <LanguageSettingsPage user={userData} />
            </div>
          </>
        )}

        {value === 2 && (
          <>
            <Typography
              variant="h2"
              sx={{
                marginLeft: "30px",
                paddingTop: isSmallScreen ? "24px" : "14px",
              }}
              className="text-slate-600"
            >
              Update Password
            </Typography>
            <UpdatePassword user={userData} />
          </>
        )}

        {value === 3 && (
          <>
            <Typography
              variant="h2"
              sx={{
                marginLeft: "30px",
                paddingTop: isSmallScreen ? "24px" : "14px",
              }}
              className="text-slate-600"
            >
              Notifications
            </Typography>
            <NotificationSettingsPage user={userData} />
          </>
        )}

        {value === 4 && (
          <>
            <Typography
              variant="h2"
              sx={{
                marginLeft: "30px",
                paddingTop: isSmallScreen ? "24px" : "14px",
              }}
              className="text-slate-600"
            >
              Organizations
            </Typography>
            <Typography>
              The user should be able to select from a list of organizations and
              view their stats
            </Typography>
          </>
        )}

        {value === 5 && userData?.isAdmin? (
          <>
            <Typography
              variant="h2"
              sx={{
                marginLeft: "30px",
                paddingTop: isSmallScreen ? "24px" : "14px",
              }}
              className="text-slate-600"
            >
              Admin
            </Typography>
            <AdminPage user={userData} />
          </>
        ): null}
      </Box>
    </div>
  );
};

export default SettingsTabs;
