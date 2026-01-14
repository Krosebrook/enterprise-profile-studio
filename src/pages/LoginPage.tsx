import { AuthForm } from '@/components/auth/AuthForm';
import { Navbar } from '@/components/layout/Navbar';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <AuthForm mode="login" />
    </>
  );
}
