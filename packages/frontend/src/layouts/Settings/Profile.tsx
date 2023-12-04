import React, { useMemo, useState, ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import css from "./settings.module.css";
import Select, { SingleValue, GroupBase } from "react-select";
import countryList from "react-select-country-list";
import ReactCountryFlag from "react-country-flag";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { User } from "../../../lib/types";
import { useUserProfile } from "../../../lib/queries";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useMUploadProfileImageMutation, useMUpdateUserProfileMutation } from "../../../lib/mutations";

interface ProfileProps {
  user?: User;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const mutation = useMUpdateUserProfileMutation();
  const userApi = useUserProfile({
    enabled: !props.user?.email,
  });
  const user = props.user || userApi.data;
  interface CountryData {
    label: string;
    value: string;
  }
  const [countryValue, setCountryValue] =
    useState<SingleValue<string>>(user?.address! || "Finland");
  type InputType = string | { value: string; label: string };
  function getCode(input: InputType): string {
    if (typeof input === "string") {
      return countryList()?.getValue(input);
    } else if (
      typeof input === "object" &&
      input !== null &&
      "value" in input
    ) {
      return input.value;
    } else {
      return "";
    }
  }
  const options: unknown = useMemo(() => countryList().getData(), []);
  const countryCode = useMemo(() => {
    return getCode(countryValue!);
  }, [countryValue]);

  const changeHandler = (value: SingleValue<string>) => {
    setCountryValue(value);
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().nullable(),
    profession: Yup.string().nullable(),
    email: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phoneNumber || "",
      profession: user?.profession || "",
      country: user?.address || "",
      email: user?.email ||  "",
      bio: user?.bio || "",
      city: user?.city || "",
      postCode: user?.postalCode || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        mutation.mutate({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          city: values.city,
          address: values.country,
          bio: values.bio,
          phoneNumber: values.phone,
          postalCode: values.postCode,
          profession: values.profession,
        },{
           onSuccess: ()=>{
             toast("Profile Updated Succesfully",{
               position: "top-right",
               autoClose: 5000,
               closeOnClick: true,
               type: "success"
             });
      
           }
         })
         
       }catch(error){
         toast("Something went wrong, please contact support if it persists.",{
           position: "top-right",
           autoClose: 5000,
           closeOnClick: true,
           type: "error",
         });
       }
    },
  });

  return (
    <>
      <div>
        <ProfileImageUpload userEmail={user?.email} existingImage={user?.imageUrl} />
       
      </div>
      <form onSubmit={formik.handleSubmit} className="p-6">
      <div className="text-primary pb-2">{user?.email || ""}</div>
        <div className="grid gap-4 mb-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
                css.input,
              )}
              placeholder="Jesh"
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-500">{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
                css.input,
              )}
              placeholder="Mahtava"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-500">{formik.errors.lastName}</div>
            ) : null}
          </div>

         
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
                css.input,
              )}
              placeholder="XXX-XXXXXXXXXX"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="relative">
            <ReactCountryFlag
              style={{
                width: "45px",
                height: "45px",
                position: "absolute",
                top: "32px",
                zIndex: 2000,
                left: "8px",
              }}
              countryCode={countryCode}
              svg
            />
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <Select
              defaultInputValue={countryValue as string}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  height: "50px",
                  flex: 1,
                  paddingLeft: "50px",
                  backgroundColor: "rgb(249 250 251)",
                  borderColor: state.isFocused
                    ? "rgba(0, 0, 0, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "rgba(102, 178, 255, 0.6) 0px 0px 0px 0.5px",
                  },
                }),
              }}
              name="country"
              options={options as GroupBase<string>[]}
              value={countryValue}
              onChange={(value)=>{
                changeHandler(value);
                formik.setFieldValue("country", countryList().getLabel(getCode(value as InputType)));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="profession"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profession
            </label>
            <input
           
              id="profession"
              name="profession"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.profession}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none focus:outline-none",
                css.input,
              )}
              placeholder="Doctor"
              
            />
            {formik.touched.profession && formik.errors.profession ? (
              <div className="text-red-500">{formik.errors.profession}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="postCode"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Postcode
            </label>
            <input
              type="text"
              id="postCode"
              name="postCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postCode}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
                css.input,
              )}
              placeholder="34567"
            />
            {formik.touched.postCode && formik.errors.postCode ? (
              <div className="text-red-500">{formik.errors.postCode}</div>
            ) : null}
          </div> 
          <div>
          <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className={cx(
                "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
                css.input,
              )}
              placeholder="Tampere"
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500">{formik.errors.city}</div>
            ) : null}
          </div>
          

        </div>
        <div className="mb-6">
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bio}
            className={cx(
              "bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
              css.input,
            )}
            rows={4}
            placeholder="Tell us about yourself, your health journey..."
          />
          {formik.touched.bio && formik.errors.bio ? (
            <div className="text-red-500">{formik.errors.bio}</div>
          ) : null}
        </div>
        
        <button
          type="submit"
          className="text-white bg-primary hover:bg-blue-400 focus:ring-4 focus:outline-none font-medium rounded-md text-sm w-full sm:w-36 px-5 py-3 text-center   border-none"
        >
          Save
        </button>
      </form>
    </>
  );
};

export default Profile;

interface ProfileImageUploadProps {
  existingImage?: string; 
  userEmail?:string;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  existingImage,
  userEmail
}) => {
  const mutationImage = useMUploadProfileImageMutation();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    existingImage || null,
  );

  useEffect(()=>{
    if(existingImage){
      setPreviewImage(existingImage);
    }
  },[existingImage])


  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
     
      setSelectedImage(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target?.result as string;
        resolve(dataURL);
      };

      reader.onerror = (event) => {
        reject(new Error('Error reading file: ' + event.target?.error));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async () => {
    
    if (selectedImage) {
        try {
          const dataURL = await  readFileAsDataURL(selectedImage);
       
          const blob = await fetch(dataURL).then((res) => res.blob());
          const sizeInBytes = blob.size;
          const sizeInKB = sizeInBytes / 1024;
          //const sizeInMB = sizeInKB / 1024;
          if(sizeInKB > 60){
            toast("Sorry you cannat upload images greater than 60kb",{
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              type: "error",
            });
            return;
          }

      
        await mutationImage.mutateAsync({imageUrl: dataURL, email: userEmail!},{
            onSuccess: ()=>{
              toast("Profile Image Updated Succesfully",{
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                type: "success"
              });
              handleRemoveImage();
            }
          })
          
        }catch(error){
          toast("Something went wrong, please contact support if it persists.",{
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            type: "error",
          });
        }
      };   
    }


  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(existingImage || null);
  };

  return (
    <div className="pl-10 pt-4">
      <Avatar
        alt="Profile Image"
        src={previewImage || ""}
        sx={{ width: 120, height: 120, margin: 0,  }}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="profile-image-input"
        type="file"
        onChange={handleImageChange}
      />
      <label className="ml-4" htmlFor="profile-image-input">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <span className="ml-4 text-gray-500">max 60kb</span>
      <div className="flex">
      {selectedImage && (
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload Image
        </Button>
      )}

      {selectedImage && (
        <Button
          sx={{
            marginLeft: "10px",
          }}
          variant="outlined"
          color="error"
          onClick={handleRemoveImage}
        >
          Remove Image
        </Button>
      )}
      </div>
    </div>
  );
};

