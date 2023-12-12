import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { useRouter } from "next/router";
import LoginForm, { LoginBasic } from "@/layouts/LoginForm";
import Image from "next/image";
import useAuth from "../../lib/util/useAuth";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { isLoggedIn} = useAuth();
  if(isLoggedIn){
    router.push("/");
  }

  return (
    <Box
      sx={{
        backgroundImage: `url("/hill_snow2.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      component={"div"}
      className="h-screen"
    >
      <Box
        sx={{
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div className="flex flex-col items-center p-12 pb-2 sm:flex-row sm:justify-start">
          <Image
            src="/Malta_Logo.png"
            alt="Maltas Logo"
            className="dark:invert mr-4 cursor-pointer"
            width={150}
            height={150}
            priority
            onClick={()=>{
              router.push("/");
            }}
          />
          <Typography
            variant="h3"
            color={"primary"}
            sx={{
              fontWeight: 800,
            }}
            component={"h3"}
          >
            Maltas technology Oy
          </Typography>
        </div>

        <Container component="main" maxWidth="sm">
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
            className="p-12 py-5 bg-opacity-50"
          >
            <CardContent
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <LoginForm  />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
