import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const { email, password } = values;
    onLogin(email, password);
  };

  return (
    <div>
    <h1>Login</h1>
    <Form form={form} name="login-form" onFinish={onFinish}>
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "Please enter a valid email address",
          },
          { required: true, message: "Email is required" },
        ]}
      >
        <Input
          size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Password is required" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginForm;
