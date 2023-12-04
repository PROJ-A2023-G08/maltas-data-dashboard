import * as api from "./api/api";
import { useMutation, useQueryClient } from 'react-query';
import { qkGetUserProfile, qkAllUsers } from "./api/queryKeys";
import { UpdatePasswordQueryParams, UpdateUserQueryParams, UploadProfileImageQueryParams, AdminDeleteUserQueryParams, AdminUpdateUserRoleQueryParams  } from "./types/queryTypes";
import useAuth from "./util/useAuth";
import { User } from "./types";

export const useMUpdatePasswordMutation = () => {
  const { accessToken}= useAuth()
  const queryClient = useQueryClient();
  return useMutation(
    (data: UpdatePasswordQueryParams) => api.updatePassword(accessToken!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(qkGetUserProfile);
      },
    }
  );
};

export const useMUploadProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken}= useAuth()
  return useMutation(
    (data: UploadProfileImageQueryParams) => api.uploadProfileImage(accessToken!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(qkGetUserProfile);
      },
    }
  );
};

export const useMUpdateUserProfileMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken}= useAuth()
  return useMutation(
    (data: UpdateUserQueryParams) => api.updateUserProfile(accessToken!, data),
    {
      onSuccess: (newUserData: User) => {
        queryClient.invalidateQueries(qkGetUserProfile);
      },
    }
  );
};

export const useMUpdateUserRoleMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken}= useAuth()
  return useMutation(
    (data: AdminUpdateUserRoleQueryParams) => api.updateUserRole(accessToken!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(qkGetUserProfile);
      },
    }
  );
};

export const useMDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  const { accessToken}= useAuth()
  return useMutation(
    (data: AdminDeleteUserQueryParams) => api.deleteUser(accessToken!, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(qkAllUsers);
      },
    }
  );
};


