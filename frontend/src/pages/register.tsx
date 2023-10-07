import { Row, Col, Card } from "antd";
import { useRouter } from "next/router";
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
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col span={12}>
        <Card>
          <RegisterForm onRegister={handleLogin} />
          <h4
            className="cursor-pointer"
            onClick={() => {
              router.push("/login");
            }}
          >
            Already have an account? Login
          </h4>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
