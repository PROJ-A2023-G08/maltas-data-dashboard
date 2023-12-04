import React, { useState, useEffect } from "react";
import { User } from "../../../lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useMUpdateUserProfileMutation } from "../../../lib/mutations";

interface NotificationSettings {
  me: boolean;
  myTeam: boolean;
  anyTeammate: boolean;
  noOne: boolean;
}

interface NotificationSettingsState {
  conversationAssignedTo: NotificationSettings;
  customerRepliesAssignedTo: NotificationSettings;
  customerRepliesOrAddsNote: NotificationSettings;
  customerRatesConversation: NotificationSettings;
}

const getText = (action: string): string => {
  switch (action) {
    case "conversationAssignedTo":
      return "Conversation is assigned to";
    case "customerRepliesAssignedTo":
      return "Customer replies to a conversation assigned to";
    case "customerRepliesOrAddsNote":
      return "Customer replies or adds a note to a conversation assigned to";
    case "customerRatesConversation":
      return "Customer rates a conversation assigned to";
    default:
      return "";
  }
};

interface NotificationsProps {
  user?: User;
}

const NotificationSettingsPage: React.FC<NotificationsProps> = (props) => {
  const mutation = useMUpdateUserProfileMutation();
  const [newConversation, setNewConversation] = useState(
    props.user?.notification === "yes" ? true : false,
  );
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettingsState>({
      conversationAssignedTo: {
        me: false,
        myTeam: false,
        anyTeammate: false,
        noOne: false,
      },
      customerRepliesAssignedTo: {
        me: false,
        myTeam: false,
        anyTeammate: false,
        noOne: false,
      },
      customerRepliesOrAddsNote: {
        me: false,
        myTeam: false,
        anyTeammate: false,
        noOne: false,
      },
      customerRatesConversation: {
        me: false,
        myTeam: false,
        anyTeammate: false,
        noOne: false,
      },
    });

  const handleUpdateNotifications = (value: boolean) => {
    try {
      mutation.mutate(
        {
          email: props?.user?.email,
          notification: value ? "yes" : "no",
        },
        {
          onSuccess: () => {
            toast("Profile Updated Succesfully", {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              type: "success",
            });
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (
    action: keyof NotificationSettingsState,
    target: keyof NotificationSettings,
  ) => {
    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [action]: {
        ...prevSettings[action],
        [target]: !prevSettings[action][target],
      },
    }));
  };

  const handleSelectAll = (action: keyof NotificationSettingsState) => {
    const allChecked = Object.values(notificationSettings[action]).every(
      (value) => value,
    );

    setNotificationSettings((prevSettings) => ({
      ...prevSettings,
      [action]: Object.fromEntries(
        Object.keys(prevSettings[action]).map((target) => [
          target,
          !allChecked,
        ]),
      ),
    }));
  };

  return (
    <div className="px-6 pt-6">
      <Typography variant="h5" gutterBottom>
        New conversation notifications
      </Typography>
      <div className="flex items-center pb-3">
        <Checkbox
          className="mr-4"
          checked={newConversation as boolean}
          onChange={(e) => {
            setNewConversation((prev) => !prev);
            handleUpdateNotifications(e.target.checked);
          }}
        />
        <Typography color={"text.secondary"}>
          Get notified by email whenever a new conversation occurs within your
          organization
        </Typography>
      </div>
      <Typography variant="h5">Action-based notifications</Typography>
      <Typography className="pb-6" color={"text.secondary"}>
        Receive an email notification when the following actions occur
      </Typography>

      <FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={Object.values(notificationSettings).every((action) =>
                  Object.values(action).every((value) => value),
                )}
                onChange={() => {
                  Object.keys(notificationSettings).forEach((action) =>
                    handleSelectAll(action as keyof NotificationSettingsState),
                  );
                }}
              />
            }
            label="Select All"
          />
        </FormGroup>
      </FormControl>
      <div className="flex p-2" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ACTION
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ME
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                MY TEAM
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ANY TEAMMATE
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                NO ONE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(notificationSettings).map(([action, targets]) => (
              <TableRow key={action}>
                <TableCell>{getText(action)}</TableCell>
                {Object.entries(targets).map(([target, checked]) => (
                  <TableCell key={target}>
                    <Checkbox
                      checked={checked as boolean}
                      onChange={() =>
                        handleCheckboxChange(
                          action as keyof NotificationSettingsState,
                          target as keyof NotificationSettings,
                        )
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NotificationSettingsPage;
