"use client";

import "7.css/dist/7.scoped.css";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Avatar } from "./avatar";

const STORAGE_KEYS = {
  email: "msn_remembered_email",
  password: "msn_remembered_password",
  autoSignIn: "msn_auto_signin",
} as const;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("Available");
  const statusMap: Record<string, string> = {
    Available: "online-dot.png",
    Busy: "busy-dot.png",
    Away: "away-dot.png",
    "Appear offline": "offline-dot.png",
  };

  const [rememberMe, setRememberMe] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [signInAutomatically, setSignInAutomatically] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEYS.email);
    const savedPassword = localStorage.getItem(STORAGE_KEYS.password);
    const savedAutoSignIn = localStorage.getItem(STORAGE_KEYS.autoSignIn);

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    if (savedPassword) {
      setPassword(savedPassword);
      setRememberPassword(true);
      setRememberMe(true); // se souvenir du mdp implique forcément se souvenir de l'email
    }
    if (savedAutoSignIn === "true") {
      setSignInAutomatically(true);
    }
  }, []);

  const dropdownItems: DropdownItem[] = [
    {
      label: "Available",
      onClick: () => setSelectedStatus("Available"),
      icon: (
        <img
          src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/online-dot.png`}
          width={8}
        />
      ),
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Busy",
      onClick: () => setSelectedStatus("Busy"),
      icon: (
        <img
          src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/busy-dot.png`}
          width={8}
        />
      ),
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Away",
      onClick: () => setSelectedStatus("Away"),
      icon: (
        <img
          src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/away-dot.png`}
          width={8}
        />
      ),
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Appear offline",
      onClick: () => setSelectedStatus("Appear offline"),
      icon: (
        <img
          src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/offline-dot.png`}
          width={8}
        />
      ),
      dividerBefore: false,
      disabled: false,
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      const { data: userData, error: getUserError } =
        await supabase.auth.getUser();
      const userId = userData?.user?.id ?? data?.user?.id ?? null;

      if (userId) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ status: selectedStatus })
          .eq("id", userId);
        if (updateError)
          console.warn("Failed to update status:", updateError.message);
      }

      if (rememberPassword) {
        localStorage.setItem(STORAGE_KEYS.email, email);
        localStorage.setItem(STORAGE_KEYS.password, password);
      } else if (rememberMe) {
        localStorage.setItem(STORAGE_KEYS.email, email);
        localStorage.removeItem(STORAGE_KEYS.password);
      } else {
        localStorage.removeItem(STORAGE_KEYS.email);
        localStorage.removeItem(STORAGE_KEYS.password);
      }

      if (signInAutomatically) {
        localStorage.setItem(STORAGE_KEYS.autoSignIn, "true");
      } else {
        localStorage.removeItem(STORAGE_KEYS.autoSignIn);
      }

      router.replace("/home");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center pt-4">
          <Avatar />
          <p className="mt-8 title">Signing in...</p>
          <img src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/thinking.gif?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvdGhpbmtpbmcuZ2lmIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTcxNzE3MywiZXhwIjo0OTM1MzE3MTczfQ.RBeINYnDYXdPxQQ-2J0CMXG3-3rBR7-JPymzt5cI1Bs" />
        </div>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center pt-4">
        <Avatar />
        <p className="mt-8 title">Sign in</p>
        <div className="flex gap-1">
          <p className="mb-4">
            Sign in with your Windows Live ID. Don't have one?
          </p>
          <Link href="/auth/sign-up" className="link">
            Sign up.
          </Link>
        </div>
        <form onSubmit={handleLogin}>
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

              <div className="flex gap-1 items-baseline">
                <p>Sign in as:</p>
                <Dropdown
                  trigger={
                    <div className="aerobutton flex gap-1 items-center">
                      <img
                        src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/${encodeURIComponent(
                          statusMap[selectedStatus] ?? "online-dot.png",
                        )}`}
                        width={8}
                        className="mx-2"
                      />
                      <p>{selectedStatus}</p>
                      <div>
                        <img src={`/general/arrow.png`} width={7} />
                      </div>
                    </div>
                  }
                  items={dropdownItems}
                  align="right"
                />
              </div>

              <div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="rememberme"
                    checked={rememberMe}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRememberMe(checked);
                      // Si on décoche "remember me", ça n'a plus de sens de garder le mdp
                      if (!checked) setRememberPassword(false);
                    }}
                  />
                  <label htmlFor="rememberme">Remember me</label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="rememberpassword"
                    checked={rememberPassword}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setRememberPassword(checked);
                      // Se souvenir du mdp implique se souvenir de l'email
                      if (checked) setRememberMe(true);
                    }}
                  />
                  <label htmlFor="rememberpassword">Remember my password</label>
                </div>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    id="signinautomatically"
                    checked={signInAutomatically}
                    onChange={(e) => setSignInAutomatically(e.target.checked)}
                  />
                  <label htmlFor="signinautomatically">
                    Sign me in automatically
                  </label>
                </div>
                <Link href="/auth/forgot-password" className="link">
                  Forgot your password?
                </Link>
              </div>
            </fieldset>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="flex items-center mt-4"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
