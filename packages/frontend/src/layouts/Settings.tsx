import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
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
import { useTranslation } from "next-i18next";

const acceptedFileTypes: unknown = 'image/*';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required("Display name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

const ImageUpload: React.FC<{
  image: string;
  onImageChange: (image: string) => void;
}> = ({ image, onImageChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    //todo, we need to allow only image upload
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes as Accept,
  });

  return (
    <div className="flex items-center ml-20 flex-wrap">
      <Avatar
        src={file ? URL.createObjectURL(file) : image} // Display the selected image or the existing one.
        alt="Profile Photo"
        sx={{ width: 100, height: 100 }}
      />
      
      <div className="ml-4" {...getRootProps()} style={{ cursor: "pointer" }}>
        <input {...getInputProps()} />
        <Typography variant="h5" color="primary" component="div">
          Upload
        </Typography>
      </div>

      {file && <Typography className="ml-2" variant="body2">Uploading: {file.name}</Typography>}
    </div>
  );
};

const SettingsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const initialValues = {
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "en",
    notifications: false,
    profilePhoto: "",
  };

  const handleSubmit = (values: any) => {
    // Handle form submission, e.g., update user settings
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Card>
            <CardContent>
              <div className="flex ">
                <Typography variant="h5">{t("settings.ProfilePhoto")}</Typography>

                <Field name="profilePhoto" label="Profile Photo">
                  {({ field }: FieldProps<string>) => (
                    <ImageUpload
                      image={field.value}
                      onImageChange={field.onChange}
                    />
                  )}
                </Field>
              </div>
              <hr className="text-gray-300 m-6 ml-12 mr-12" />
              <div>
                <Typography className="mb-4 mt-4" variant="h5">
                {t("settings.PersonalInfo")}
                </Typography>
                <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                  <Field
                    className="mb-4"
                    as={TextField}
                    name="displayName"
                    label={t("settings.NameField")}
                    fullWidth
                  />
                  <Field
                    className="mb-4"
                    as={TextField}
                    name="email"
                    label={t("settings.EmailField")}
                    fullWidth
                  />
                </div>
              </div>
              <hr className="text-gray-300 m-6 ml-12 mr-12" />

              <Typography className="mb-4" variant="h5">
              {t("settings.ChangePassword")}
              </Typography>
              <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                <Field
                  className="mb-4"
                  as={TextField}
                  type="password"
                  name="currentPassword"
                  label={t("settings.CurrentPassword")}
                  fullWidth
                />
                <Field
                  className="mb-4"
                  as={TextField}
                  type="password"
                  name="newPassword"
                  label={t("settings.NewPassword")}
                  fullWidth
                />
                <Field
                  className="mb-4"
                  as={TextField}
                  type="password"
                  name="confirmPassword"
                  label={t("settings.ConfirmPassword")}
                  fullWidth
                />
                <Button
                  type="submit"
                  className="mb-4"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {t("settings.UpdatePassword")}
                </Button>
              </div>
              <hr className="text-gray-300 m-6 ml-12 mr-12" />

              <Typography className="mb-4" variant="h5">
              {t("settings.Language")}
              </Typography>
              <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                <Field
                  className="mb-4"
                  as={TextField}
                  select
                  name="language"
                  label={t("settings.Language")}
                  fullWidth
                >
                  <MenuItem value="en">{t("settings.English")}</MenuItem>
                  <MenuItem value="fi">{t("settings.Finnish")}</MenuItem>
                  <MenuItem value="sv">{t("settings.Swedish")}</MenuItem>
                </Field>
              </div>
              <hr className="text-gray-300 m-6 ml-12 mr-12" />
              <Typography className="mb-4" variant="h5">
              {t("settings.Notifications")}
              </Typography>
              <div className="ml-12 md:ml-28 lg:ml-32 max-w-xl">
                <Field
                  className="mb-4"
                  as={Switch}
                  type="checkbox"
                  name="notifications"
                  checked={values.notifications}
                />
              </div>
              <hr className="bg-gray-200 divide-blue-200 m-6 ml-12 mr-12" />
              <div className="flex mt-3 justify-end">
                <Button
                  className="mb-4"
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {t("settings.Save")}
                </Button>
                <Button className="mb-4 ml-4" type="button" variant="outlined">
                {t("settings.Cancel")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsPage;
