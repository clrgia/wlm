import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function Page() {
  return (
    <div
      className="flex min-h-svh w-full justify-center bg-no-repeat bg-[length:100%_300px]"
      style={{
        backgroundImage:
          "url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/main_background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvbWFpbl9iYWNrZ3JvdW5kLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE3MTI0NjcsImV4cCI6NDkzNTMxMjQ2N30.sGo7k5h7pO-jNhEfBR1xx4z24p6-Qqd1kbKZ_9hGWCw)",
      }}
    >
      <SignUpForm />
    </div>
  );
}
