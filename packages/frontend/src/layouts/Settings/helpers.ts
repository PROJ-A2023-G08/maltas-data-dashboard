import * as Yup from "yup";


  export const validationSchemaPersonalInfo = Yup.object().shape({
    firstname: Yup.string().required("first name is required"),
    lastname: Yup.string().required("first name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  

  export const validationSchemaUpdatePassword = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });


  export const validationSchemaUserSettings = Yup.object().shape({
    language: Yup.string(),
    notifications: Yup.boolean()
  });


  export const validationSchemaUploadImage = Yup.object().shape({
    profilePhoto: Yup.string().required("Please Upload an image"),
  });


  export interface ProfilePhoto {
    profilePhoto: string;
  };

  export interface PersonalInfo {
    firstname: string;
    lastname: string;
    email: string;
  };

  export interface UpdatePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

  export interface UpdateUserSettings {
    language: string;
    notifications: boolean;
  };




