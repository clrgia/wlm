import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUpdateStatus(status?: string) {
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(
    async (nextStatus: string) => {
      setLoading(true);
      setError(null);
      try {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user ?? null;
        if (!user) {
          return false;
        }

        const { data, error } = await supabase
          .from("profiles")
          .update({ status: nextStatus })
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) throw error;
        setProfile(data ?? null);
        return true;
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        return false;
      } finally {
        setLoading(false);
      }
    },
    [supabase],
  );

  useEffect(() => {
    if (!status) return;

    updateStatus(status);
  }, [status, updateStatus]);

  return { profile, loading, error, updateStatus };
}
