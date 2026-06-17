import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useProfile() {
  const supabase = useMemo(() => createClient(), []);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("profiles")
      .select("id, name, status, avatar_url, personal_message")
      .eq("user_id", user.id)
      .single();

    setProfile(data);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchProfile();

    const handleProfileChanged = () => {
      fetchProfile();
    };

    window.addEventListener("profile:changed", handleProfileChanged);

    return () => {
      window.removeEventListener("profile:changed", handleProfileChanged);
    };
  }, [fetchProfile]);

  return { profile, loading };
}
