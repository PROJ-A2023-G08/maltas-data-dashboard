import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import * as api from "./api/api";
import {
  User,
  AdminGetSingleUserResult,
  AdminGetAllUsersResult,
} from "./types";
import useAuth from "./util/useAuth";
import {
  qkGetUserProfile,
  qkAllUsers,
  qkGetSingleUserByAdmin,
} from "./api/queryKeys";
import { AdminGetSingleUserQueryParams } from "./types/queryTypes";

export const useUserProfile = (options?: UseQueryOptions<User>) => {
  const { accessToken, fastAccessToken } = useAuth();
  return useQuery<User>(
    [qkGetUserProfile, accessToken],
    () => api.getUserProfile(fastAccessToken || accessToken!),
    options,
  );
};

export const useAdminGetAllUsers = (
  options?: UseQueryOptions<AdminGetAllUsersResult>,
) => {
  const { accessToken, fastAccessToken } = useAuth();
  return useQuery<AdminGetAllUsersResult>(
    [qkAllUsers, accessToken],
    () => api.getAllUsers(fastAccessToken || accessToken!),
    options,
  );
};

export const useAdminGetSingleUser = (
  data: AdminGetSingleUserQueryParams,
  options?: UseQueryOptions<AdminGetSingleUserResult>,
) => {
  const { accessToken, fastAccessToken } = useAuth();
  return useQuery<AdminGetSingleUserResult>(
    [qkGetSingleUserByAdmin, accessToken],
    () => api.getSingleUser(fastAccessToken || accessToken!, data),
    options,
  );
};
