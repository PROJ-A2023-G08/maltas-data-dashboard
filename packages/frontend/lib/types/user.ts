export interface GeneralUpdateResult {
    success: boolean;
    message: string;
}
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    gender: string;
    notification: boolean | string;
    phoneNumber: string;
    address: string;
    city: string;
    postalCode: string;
    createdAt: string;
    updatedAt: string;
    bio:string;
    profession:string;
    isAdmin: boolean;
    role:string;
    language: string;
}

export interface UploadProfileImageResult {
    success: boolean;
    message: string;
}

interface UserAdminList {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isAdmin: boolean;
}
export type AdminGetAllUsersResult = {allUsers: UserAdminList[]};
export type AdminDeleteUserResult = GeneralUpdateResult;
export type UpdateUserRoleResult = GeneralUpdateResult;
export type AdminGetSingleUserResult = User;

