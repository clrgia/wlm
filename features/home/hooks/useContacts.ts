import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "./useProfile";

export function useContacts() {
  const supabase = useMemo(() => createClient(), []); // ✅ stable
  const [contacts, setContacts] = useState<any[]>([]);
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile?.id) return;

    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select(
          `
            id,
            status,
            category_id,
            categories ( id, name ),
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
    };

    fetchContacts();
  }, [profile?.id]);

  return contacts;
}
