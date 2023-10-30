import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';


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

interface RegisterBasics {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterProps {
  onRegister: (values: RegisterBasics) => void;
}

const RegisterForm: React.FC<RegisterProps> = ({ onRegister }) => {
  
  const onSubmit = async (values: RegisterBasics) => {
    onRegister(values);
    const { firstName, lastName, email, password } = values;
    try {
      const data =  { firstName, lastName, email, password }
      const response = await axios.post("http://localhost:5000/api/auth/register", data)
      console.log(response.data)

    }catch(error)  { 
      //console.log(error.message)
    }
  };

  return (
    <div className="pt-12">
      <Typography variant="h2" component="div" align="center" gutterBottom>
        Register
      </Typography>
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
              fullWidth
              variant="outlined"
            />
            <ErrorMessage className="text-red-500" name="firstName" component="div" />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="text"
              label="Last Name"
              name="lastName"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage className="text-red-500" name="lastName" component="div" />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="text"
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage className="text-red-500" name="email" component="div" />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="password"
              label="Password"
              name="password"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage className="text-red-500" name="password" component="div" />
          </div>
          <div className="pb-4">
            <Field
              as={TextField}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              fullWidth
              variant="outlined"
            />
            <ErrorMessage className="text-red-500" name="confirmPassword" component="div" />
          </div>
          <Button size="large" type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;