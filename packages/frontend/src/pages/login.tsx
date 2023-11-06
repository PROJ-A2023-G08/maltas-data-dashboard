import { Container } from "@mui/material";
import { useRouter } from "next/router";
import LoginForm, { LoginBasic } from "@/layouts/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLogin = (values: LoginBasic) => {
    router.push("/dashboard-home");
  };

  return (
    <Container component="main" className="h-full" maxWidth="xs">
      <LoginForm onLogin={handleLogin} />
      <h4
        className="cursor-pointer"
        onClick={() => {
          router.push("/register");
        }}
      >
        Don&apos;t have an account? Register
      </h4>
    </Container>
  );
};

export default LoginPage;
