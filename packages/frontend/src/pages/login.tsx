import { Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import LoginForm, { LoginBasic } from "@/layouts/LoginForm";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const handleLogin = (values: LoginBasic) => {
    router.push("/dashboard-home");
  };

  return (
    <Container component={"div"} className="h-screen">
      <div className="flex justify-start items-center p-12">
        <Image
          src="/maltasLogo.jpg"
          alt="Maltas Logo"
          className="dark:invert mr-4"
          width={100}
          height={100}
          priority
        />
        <Typography variant="h5" color={"green"} component={"h4"} >Maltas technology Oy</Typography>
      </div>
      <Container component="main" className="h-full" maxWidth="xs">
        <LoginForm onLogin={handleLogin} />
      </Container>
    </Container>
  );
};

export default LoginPage;
