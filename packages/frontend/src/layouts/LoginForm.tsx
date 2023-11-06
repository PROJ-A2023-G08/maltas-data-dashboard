import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography } from '@mui/material';
import axios, { AxiosError} from 'axios';
import { useState, ChangeEvent  } from 'react';
import { useRouter } from 'next/navigation';

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
  const [error, setErrMsg] = useState('');
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
      console.log(error);
    }
  };
  return (
    <div className="pt-24 h-full">
      <Typography variant="h2" component="div" align="center" gutterBottom>
        Login
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
          <Button size="large" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
