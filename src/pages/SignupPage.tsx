import { AuthForm } from '@/components/auth/AuthForm';
import { Navbar } from '@/components/layout/Navbar';

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <AuthForm mode="signup" />
    </>
  );
}
