"use client";

import "7.css/dist/7.scoped.css";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "./avatar";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center pt-4">
        <Avatar />
        <p className="mt-8 title">Sign up</p>
        <div className="flex gap-1">
          <p className="mb-4">
            Create a new account with your Windows Live ID.
          </p>
          <Link href="/auth/login" className="link">
            Sign in.
          </Link>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mt-2 w-[19.5rem] win7">
            <fieldset>
              <input
                className="w-full placeholder:italic"
                id="email"
                type="email"
                placeholder="Example555@hotmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full mt-1 placeholder:italic"
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <input
                className="w-full mt-1 placeholder:italic"
                id="repeat-password"
                type="password"
                placeholder="Confirm your password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </fieldset>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="flex items-center mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
