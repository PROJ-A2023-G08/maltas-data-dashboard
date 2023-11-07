import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";

import {
  Button,
  Card,
  CardContent,
  Switch,
  TextField,
  Typography,
  Avatar,
  MenuItem,
} from "@mui/material";
import { useDropzone, Accept } from "react-dropzone";
import {
  validationSchemaPersonalInfo,
  validationSchemaUpdatePassword,
  validationSchemaUserSettings,
  validationSchemaUploadImage,
  UpdatePassword,
  UpdateUserSettings,
  PersonalInfo,
  ProfilePhoto
} from "./helpers";


const ImageUpload: React.FC<{
  image: string;
  onImageChange: (image: string | ArrayBuffer| null) => void;
  name: string;
}> = ({ image, onImageChange, name }) => {


  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    //todo, we need to allow only image upload
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const binaryStr = reader.result
        onImageChange(binaryStr);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex items-center flex-wrap">
      <Avatar
        src={file ? URL.createObjectURL(file) : image} // Display the selected image or the existing one.
        alt="Profile Photo"
        sx={{ width: 100, height: 100 }}
      />

      <div className="ml-4" {...getRootProps()} style={{ cursor: "pointer" }}>
        <input name={name} {...getInputProps()} />
        <Typography variant="h5" color="primary" component="div">
          Upload
        </Typography>
      </div>

      {file && (
        <Typography className="ml-2" variant="body2">
          Uploading: {file.name}
        </Typography>
      )}
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const initialValueProfilePhoto = {
    profilePhoto: "",
  };

  const initialValuePersonalInfo = {
    firstname: "",
    lastname: "",
    email: "myemail@gmail.com",
  };

  const initialValueChangePassword = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const initialValueUserSettings = {
    language: "en",
    notifications: false,
  };

  const handleSubmitPhoto = (values: ProfilePhoto) => {
    console.log(values);
  };

  const handleSubmitPersonalInfo=(values: PersonalInfo)=>{
    console.log(values);
  }

  const handleSubmitUpdatePassword=(values: UpdatePassword)=>{
    console.log(values);
  }

  const handleSubmitUserSettings=(values: UpdateUserSettings)=>{
    console.log(values);
  }

  return (
    <>
      <Formik
        initialValues={initialValueProfilePhoto}
        validationSchema={validationSchemaUploadImage}
        onSubmit={handleSubmitPhoto}
      >
        {({ values, isSubmitting }) =>{ 
          console.log(values);
          return(
          <Form>
            <Card>
              <CardContent>
                <div>
                  <Typography variant="h5">Profile Photo</Typography>
                  <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                    <Field name="profilePhoto" label="Profile Photo">
                      {({ field }: FieldProps<string>) => (
                        <ImageUpload
                          name={field.name}
                          image={field.value}
                          onImageChange={field.onChange}
                        />
                      )}
                    </Field>
                    <Button
                      type="submit"
                      className="mb-4 mt-3"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Update Profile Image
                    </Button>
                    <ErrorMessage
                      className="text-red-500 mb-4 w-full"
                      name="profilePhoto"
                      component="div"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}}
      </Formik>
      <hr className="text-gray-300 m-6 ml-12 mr-12" />
      <Formik
        initialValues={initialValuePersonalInfo}
        validationSchema={validationSchemaPersonalInfo}
        onSubmit={handleSubmitPersonalInfo}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Card>
              <CardContent>
                <div>
                  <Typography className="mb-4 mt-4" variant="h5">
                    Personal Information
                  </Typography>
                  <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                    <Field
                      className="mb-2"
                      as={TextField}
                      name="firstname"
                      label="First Name"
                      fullWidth
                    />
                    <ErrorMessage
                      className="text-red-500 mb-4"
                      name="firstname"
                      component="div"
                    />
                    <Field
                      className="mb-4"
                      as={TextField}
                      name="lastname"
                      label="Last Name"
                      fullWidth
                    />
                    <ErrorMessage
                      className="text-red-500 mb-4"
                      name="lastname"
                      component="div"
                    />
                    <Field
                      className="mb-4"
                      as={TextField}
                      name="email"
                      label="Email Address"
                      fullWidth
                      disabled
                    />
                    <Button
                      type="submit"
                      className="mb-4"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Update Personal Information
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
      <hr className="text-gray-300 m-6 ml-12 mr-12" />
      <Formik
        initialValues={initialValueChangePassword}
        validationSchema={validationSchemaUpdatePassword}
        onSubmit={handleSubmitUpdatePassword}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Card>
              <CardContent>
                <Typography className="mb-4" variant="h5">
                  Change Password
                </Typography>
                <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                  <Field
                    className="mb-2"
                    as={TextField}
                    type="password"
                    name="currentPassword"
                    label="Current Password"
                    fullWidth
                  />
                  <ErrorMessage
                    className="text-red-500 mb-4"
                    name="currentPassword"
                    component="div"
                  />
                  <Field
                    className="mb-2"
                    as={TextField}
                    type="password"
                    name="newPassword"
                    label="New Password"
                    fullWidth
                  />
                  <ErrorMessage
                    className="text-red-500 mb-4"
                    name="newPassword"
                    component="div"
                  />
                  <Field
                    className="mb-2"
                    as={TextField}
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    fullWidth
                  />
                  <ErrorMessage
                    className="text-red-500 mb-4"
                    name="newPassword"
                    component="div"
                  />
                  <Button
                    type="submit"
                    className="mb-4"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
      <hr className="text-gray-300 m-6 ml-12 mr-12" />
      <Formik
        initialValues={initialValueUserSettings}
        validationSchema={validationSchemaUserSettings}
        onSubmit={handleSubmitUserSettings}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <Card>
              <CardContent>
                <Typography className="mb-4" variant="h5">
                  Language
                </Typography>
                <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                  <Field
                    className="mb-4"
                    as={TextField}
                    select
                    name="language"
                    label="Language"
                    fullWidth
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="fi">Finnish</MenuItem>
                  </Field>
                </div>
                <Typography className="mb-4" variant="h5">
                  Notifications
                </Typography>
                <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                  <div className="w-full">
                    <Field
                      className="mb-4"
                      as={Switch}
                      type="checkbox"
                      name="notifications"
                      checked={values.notifications}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="mb-4"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Update User Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SettingsPage;
