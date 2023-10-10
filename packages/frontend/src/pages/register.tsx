import { useRouter } from "next/router";
import { Container } from "@mui/material";
import RegisterForm from "@/layouts/RegisterForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLogin = (values: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    router.push("/dashboard-home");
  };

  return (
    <Container component="main" maxWidth="xs">
      <RegisterForm onRegister={handleLogin} />
      <h4
        className="cursor-pointer"
        onClick={() => {
          router.push("/login");
        }}
      >
        Already have an account? Login
      </h4>
    </Container>
  );
};

export default LoginPage;
