import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import css from "./settings.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "../../../lib/types";
import { useMUpdatePasswordMutation } from "../../../lib/mutations";
import { useUserProfile } from "../../../lib/queries";
import useAuth from "../../../lib/util/useAuth";
import Loading from "@/components/Loading/Loading";

interface UpdatePasswordProps {
  user?: User;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = (props) => {
  const { logout }= useAuth()
  const mutation = useMUpdatePasswordMutation();
  const userApi = useUserProfile({
    enabled: !props.user?.email,
  });

  const userData = userApi?.data;
  const email = props.user?.email || userData?.email || "";
  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm password is required"),
  });


  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await mutation.mutateAsync({
          email,
          currentPassword: values.currentPassword,
          newPassword: values.password,
        },{
          onSuccess: ()=>{
            toast("Password Updated Succesfully",{
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              type: "success",
              onClose: (props)=>{
                logout();
              }
            });
            
          }
        });
      } catch (error) {
        toast("Something went wrong, please contact support if it persists.",{
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          type: "error",
        });
      }
    },
  });

  if(userApi.isLoading){
    return <Loading />
  }


  return (
    <form onSubmit={formik.handleSubmit} className="p-6 w-full max-w-2xl ">
      <div className="mb-6">
        <label
          htmlFor="currentPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Current password
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          className={cx(
            "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
            css.input,
          )}
          placeholder="•••••••••"
          required
        />
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <div className="text-red-500">{formik.errors.currentPassword}</div>
        ) : null}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={cx(
            "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
            css.input,
          )}
          placeholder="•••••••••"
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className={cx(
            "bg-gray-50 h-12 border text-gray-900 text-sm rounded block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white   border-none",
            css.input,
          )}
          placeholder="•••••••••"
          required
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="text-white bg-primary hover:bg-blue-400 focus:ring-4 focus:outline-none font-medium rounded-md text-sm w-full sm:w-36 px-5 py-3 text-center   border-none"
      >
        Save
      </button>
    </form>
  );
};

export default UpdatePassword;
