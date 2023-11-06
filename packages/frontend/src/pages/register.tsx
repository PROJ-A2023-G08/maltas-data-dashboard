import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";
import RegisterForm from "@/layouts/RegisterForm";
import Image from "next/image";

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
        <Typography variant="h6" color={"green"} component={"h4"} >Maltas technology Oy</Typography>
      </div>
    <Container component="main" maxWidth="xs">
      <RegisterForm onRegister={handleLogin} />
      <Typography
          variant="h6"
          color={"gray"}
          className="cursor-pointer mt-4"
          onClick={() => {
            router.push("/login");
          }}
        >
           Already have an account? Login
        </Typography>
    </Container>
    </Container>
  );
};

export default LoginPage;
