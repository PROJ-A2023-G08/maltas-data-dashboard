import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError} from 'axios';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useState, ChangeEvent  } from 'react';
import { useRouter } from 'next/navigation';
import { StyledField } from './RegisterForm';

const initialValues = {
  email: '',
  password: '',
};

export type LoginBasic = typeof initialValues;

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required.'),
  password: Yup.string().required('Password is required'),
});

interface LoginFormProps {
  onLogin: (values: LoginBasic) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const onSubmit = async (values: LoginBasic) => {
    //onLogin(values);
    const { email, password } = values;
    try {
      const data =  {  email, password }
      const response = await axios.post("http://localhost:5000/api/auth/login", data)
      console.log(response.data)
      if (response.status === 200) {
        console.log("Success")
        router.push("/");
      }
    }catch(error)  { 
      console.log(error)
    }
 
 
  };
  return (
    <div className="pt-12 h-full">
      <section className="flex items-center mb-8">
        <span className="pr-4">
          <DoubleArrowIcon sx={{ fontSize: 30 }} color="success" />
        </span>
        <Typography variant="h3" color="green" component="div" align="center" gutterBottom>
          Welcome back!
        </Typography>
      </section>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="pb-4">
            <StyledField
              as={TextField}
              type="text"
              label="Email"
              name="email"
              fullWidth
              sx={{ borderRadius: 1}}
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="email"
              component="div"
            />
          </div>
          <div className="pb-4">
            <StyledField
              as={TextField}
              type="password"
              label="Password"
              name="password"
              sx={{ borderRadius: 1}}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="password"
              component="div"
            />
          </div>
          <div className="flex justify-end mb-3"><Typography color={"gray"} variant="h6">Forgot Password?</Typography></div>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
          >
            Login
          </Button>
          <Typography
          variant="h6"
          color={"gray"}
          className="cursor-pointer mt-4"
          onClick={() => {
            router.push("/register");
          }}
        >
          Don&apos;t have an account? Register
        </Typography>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
