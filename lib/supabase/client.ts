import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Si "Sign me in automatically" a été coché lors de la dernière connexion,
  // on persiste la session dans le localStorage (survit à la fermeture du navigateur).
  // Sinon, on utilise le sessionStorage (effacé à la fermeture de l'onglet/navigateur).
  const autoSignIn =
    typeof window !== "undefined" &&
    localStorage.getItem("msn_auto_signin") === "true";

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage:
          typeof window !== "undefined"
            ? autoSignIn
              ? window.localStorage
              : window.sessionStorage
            : undefined,
      },
    },
  );
}
