import { User } from "..";

export type UpdateUserQueryParams = Partial<User>;

export interface UploadProfileImageQueryParams {
    email: string;
    imageUrl: string;
}

export interface AdminUpdateUserRoleQueryParams {
    email: string;
    role: string;
    isAdmin: boolean;
}

export interface AdminDeleteUserQueryParams {
    id: string;
}
export interface AdminGetSingleUserQueryParams {
    id: string;
}