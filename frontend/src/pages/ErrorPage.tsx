import AuthLayout from '@/components/ui/layout/AuthLayout';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <AuthLayout
      title="We need to know who you are"
      description="Enter your credentials to access your account"
      rightButtonText="Login"
      onRightButtonClick={() => navigate('/login')}>
      <div></div>
    </AuthLayout>
  );
}

export default ErrorPage;
