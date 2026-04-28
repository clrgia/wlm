"use client";

import { useContacts } from "@/features/home/hooks/useContacts";

export function ContactsList() {
  const contacts = useContacts();

  return (
    <div>
        <p>Contacts :</p>
      {contacts.map((c) => (
        <div key={c.id}>
          {c.contact_profile?.name} - {c.contact_profile?.status} - {c.contact_profile?.personal_message}
        </div>
      ))}
    </div>
  );
}