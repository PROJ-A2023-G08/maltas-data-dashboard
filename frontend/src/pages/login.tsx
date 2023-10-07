import { Row, Col, Card } from 'antd';
import { useRouter } from 'next/router';
import LoginForm from '@/layouts/LoginForm';

const LoginPage: React.FC = () => {
    const router = useRouter();  
  const handleLogin = (email: string, password: string) => {
    router.push('/dashboard-home');
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={12}>
        <Card>
          <LoginForm onLogin={handleLogin} />
          <h4 className="cursor-pointer" onClick={()=>{
            router.push("/register");
          }}>Don&apos;t have an account? Register</h4>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
