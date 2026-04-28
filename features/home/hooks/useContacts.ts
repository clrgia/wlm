import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useContacts() {
  const supabase = createClient();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select(`
    id,
    status,
    user_profile:profile!contacts_user_id_fkey(*),
    contact_profile:profile!contacts_contact_id_fkey(*)
  `);

      console.log(data);
      console.log(error);

      setContacts(data || []);
    };

    fetchContacts();
  }, []);

  return contacts;
}
