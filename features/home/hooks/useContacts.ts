import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "./useProfile";

export function useContacts() {
  const supabase = createClient();
  const [contacts, setContacts] = useState<any[]>([]);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase.from("contacts").select(`
        id,
        status,
        user_profile:profiles!contacts_user_id_fkey(*),
        contact_profile:profiles!contacts_contact_id_fkey(*)
      `);

      const currentProfileId = profile?.id;

      const normalizedContacts = (data || [])
        .filter((contactRow: any) => {
          if (!currentProfileId) return true;
          return (
            contactRow.user_profile?.id === currentProfileId ||
            contactRow.contact_profile?.id === currentProfileId
          );
        })
        .map((contactRow: any) => {
          const otherProfile =
            contactRow.user_profile?.id === currentProfileId
              ? contactRow.contact_profile
              : contactRow.user_profile;

          return {
            ...contactRow,
            contact_profile: otherProfile,
          };
        })
        .filter(
          (contactRow: any) =>
            contactRow.contact_profile?.id !== currentProfileId,
        );

      setContacts(normalizedContacts);
    };

    if (profile?.id) {
      fetchContacts();
    }
  }, [profile?.id]);

  return contacts;
}
