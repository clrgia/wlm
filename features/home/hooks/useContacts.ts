import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "./useProfile";

export function useContacts() {
  const supabase = useMemo(() => createClient(), []); // ✅ stable
  const [contacts, setContacts] = useState<any[]>([]);
  const { profile } = useProfile();

  const fetchContacts = useCallback(async () => {
    if (!profile?.id) return;

    const { data, error } = await supabase
      .from("contacts")
      .select(
        `
            id,
            status,
            category_id,
            categories ( id, name ),
            favorite,
            user_profile:profiles!contacts_user_id_fkey(*),
            contact_profile:profiles!contacts_contact_id_fkey(*)
          `,
      )
      .or(`user_id.eq.${profile.id},contact_id.eq.${profile.id}`)
      .eq("status", "accepted");

    if (error) {
      console.error("useContacts: fetch error", error);
      return;
    }

    const normalized = (data || []).map((row: any) => ({
      ...row,
      contact_profile:
        row.user_profile?.id === profile.id
          ? row.contact_profile
          : row.user_profile,
    }));

    setContacts(normalized);
  }, [profile?.id, supabase]);

  useEffect(() => {
    fetchContacts();

    const handleContactsChanged = () => {
      fetchContacts();
    };

    window.addEventListener("contacts:changed", handleContactsChanged);

    return () => {
      window.removeEventListener("contacts:changed", handleContactsChanged);
    };
  }, [fetchContacts]);

  return contacts;
}
