import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FieldProps } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { register } from '../../lib/api/api';

export const StyledField = styled(Field)< FieldProps>(({ theme }) => ({
  background: "white",
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.success.main,
    },
  },
  '& label.Mui-focused': {
    color: theme.palette.success.main,
  },
}));


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
});

export interface RegisterBasics {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterProps {
  onRegister?: (values: RegisterBasics) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ onRegister }) => {
  const router = useRouter();
  const onSubmit = async (values: RegisterBasics) => {

    const { firstName, lastName, email, password } = values;
    try {
      const data =  { firstName, lastName, email, password }
      const response = await register(data);
  
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        router.push('/');
       
      }

    }catch(error)  { 
      //console.log(error.message)
    }
  };

  return (
    <div className="pt-3">
      <section className="flex items-center mb-8">
        <span className="pr-4">
          <DoubleArrowIcon sx={{ fontSize: 30 }} color="primary" />
        </span>
        <Typography
          variant="h3"
          color="primary"
          component="div"
          align="center"
          gutterBottom
        >
          Register
        </Typography>
      </section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="pb-4">
            <Field
              as={TextField}
              type="text"
              label="First Name"
              name="firstName"
              sx={{ borderRadius: 1 }}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="firstName"
              component="div"
            />
          </div>
          <div className="pb-4">
            <Field
              sx={{ borderRadius: 1 }}
              as={TextField}
              type="text"
              label="Last Name"
              name="lastName"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="lastName"
              component="div"
            />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="text"
              label="Email"
              name="email"
              sx={{ borderRadius: 1 }}
              fullWidth
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
              fullWidth
              sx={{ borderRadius: 1 }}
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="password"
              component="div"
            />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              fullWidth
              sx={{ borderRadius: 1 }}
              variant="outlined"
            />
            <ErrorMessage
              className="text-red-500"
              name="confirmPassword"
              component="div"
            />
          </div>
          <Button
            sx={{
              height: (theme) => theme.spacing(7),
              mb: (theme) => theme.spacing(1)
            }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;