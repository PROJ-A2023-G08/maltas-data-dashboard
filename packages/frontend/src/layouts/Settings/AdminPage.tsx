import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import Select from "react-select";
import { User } from "../../../lib/types";
import { toast } from "react-toastify";
import {
  useMDeleteUserMutation,
  useMUpdateUserRoleMutation,
} from "../../../lib/mutations";
import Loading from "@/components/Loading/Loading";
import {
  useAdminGetSingleUser,
  useAdminGetAllUsers,
  useUserProfile,
} from "../../../lib/queries";

enum Role {
  USER,
  ADMIN,
  MANAGER,
}

interface UserRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isAdmin: boolean;
}

interface AdminPageProps {
  user?: User;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const deleteUserMutation = useMDeleteUserMutation();
  const updateRoleMutation = useMUpdateUserRoleMutation();
  const userData = useUserProfile({
    enabled: !props.user?.email,
  });

  const allUsersApi = useAdminGetAllUsers({
    keepPreviousData: true,
  });

  const allUsersData = allUsersApi.data?.allUsers || [];

  const [users, setUsers] = useState<UserRow[]>([]);

  useEffect(() => {
    if (allUsersData) {
      setUsers(allUsersData);
    }
  }, [allUsersData]);

  const handleRoleChange = async (
    userId: string,
    newRole: string,
    email: string,
  ) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole || "USER" } : user,
      ),
    );
    try {
      await updateRoleMutation.mutateAsync(
        {
          email: email,
          role: newRole || "USER",
          isAdmin: newRole === "ADMIN" ? true : false,
        },
        {
          onSuccess: () => {
            toast("User deleted Succesfully", {
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

  const truncateId = (id: string): string => {
    return id.length > 7 ? `${id.substring(0, 7)}...` : id;
  };

  const handleAdminChange = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isAdmin: !user.isAdmin } : user,
      ),
    );
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    try {
      await deleteUserMutation.mutateAsync(
        {
          id: userId,
        },
        {
          onSuccess: () => {
            toast("User deleted Succesfully", {
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

  if (allUsersApi.isLoading) {
    return <Loading />;
  }

  return (
    <div className="container ">
      <TableContainer className="pb-44">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                ID
              </TableCell>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                First Name
              </TableCell>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                Last Name
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {truncateId(user.id)}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.firstName}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    className="w-28"
                    options={[
                      { value: "USER", label: "User" },
                      { value: "ADMIN", label: "Admin" },
                      { value: "MANAGER", label: "Manager" },
                    ]}
                    value={{ value: user.role, label: user.role }}
                    onChange={(selectedOption) =>
                      handleRoleChange(
                        user.id,
                        selectedOption?.value!,
                        user.email,
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminPage;
