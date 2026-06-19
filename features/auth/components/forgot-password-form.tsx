"use client";

import "7.css/dist/7.scoped.css";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { Avatar } from "./avatar";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center pt-4">
        <Avatar/>
        <p className="mt-8 title">Reset Your Password</p>
        <div className="mt-2 w-[22rem] win7">
          <fieldset>
            {success ? (
            <div>
              <div className="flex gap-2">
                <p>We sent you a password reset email!</p>
                <Link href="/auth/login" className="link">
                  Sign in.
                </Link>
              </div>
            </div>
            ) : (
              <div>
                <div>
                  <p className="text-muted-foreground mb-6">
                    Type in your email and we&apos;ll send you a link to reset
                    your password :
                  </p>
                </div>
                <div>
                  <form onSubmit={handleForgotPassword}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <input
                          id="email"
                          type="email"
                          placeholder="Example555@hotmail.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full placeholder:italic"
                        />
                      </div>
                      {error && <p className="text-sm text-red-500">{error}</p>}
                      <button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send reset email"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </fieldset>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
