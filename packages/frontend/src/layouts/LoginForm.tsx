import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useState } from "react";
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useRouter } from 'next/navigation';
import { login } from '../../lib/api/api';


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
  onLogin?: (values: LoginBasic) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onSubmit = async (values: LoginBasic) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const data =  {  email, password }
      const response = await login(data);
     
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setLoading(false);
        setError(false);
        router.push('/');
       
      }
    }catch(error)  { 
      setLoading(false);
      console.log(error)
      setError(true);
    }
 
 
  };
  return (
    <div className="pt-2 h-full">
      <section className="flex items-center mb-8">
        <span className="pr-4">
          <DoubleArrowIcon sx={{ fontSize: 30 }} color="primary" />
        </span>
        <Typography variant="h3" color="primary" component="div" align="center" gutterBottom>
          Welcome back!
        </Typography>
      </section>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
        {error &&<div className='text-red-600'>Incorrect email or password</div>}
          <div className="pb-4">
            <Field
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
            <Field
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
          <div className="flex justify-end mb-3"><Typography color={"text.primary"} variant="h6">Forgot Password?</Typography></div>
          <Button
            className="mb-2"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            disabled={loading}
            centerRipple={loading}
            color="primary"
            sx={{
              height: (theme) => theme.spacing(7),
            }}
          >
            Login
          </Button>
          <Typography
          variant="h6"
          color={"text.primary"}
          className="cursor-pointer mt-4 pt-3"
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
