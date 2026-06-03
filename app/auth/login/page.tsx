import { LoginForm } from "@/features/auth/components/login-form";
import Login from "@/features/auth/login";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full justify-center">
        <LoginForm />
    </div>
  );
}
