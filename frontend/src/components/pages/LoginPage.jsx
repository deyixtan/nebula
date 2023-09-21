import LoginForm from "../LoginForm";
import FocusedLayout from "../layouts/FocusedLayout";

export const LoginPage = () => {
  return <FocusedLayout title="Nebula" form={<LoginForm />} />;
};

export default LoginPage;
