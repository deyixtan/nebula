import LoginForm from "../LoginForm";
import FocusedLayout from "../layouts/FocusedLayout";

export const LoginPage = () => {
  return <FocusedLayout title="Login Methods" form={<LoginForm />} />;
};

export default LoginPage;
