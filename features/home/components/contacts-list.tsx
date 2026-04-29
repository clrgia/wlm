"use client";

import { useContacts } from "@/features/home/hooks/useContacts";
import { useOpenConversation } from "@/features/chat/components/hooks/useOpenConversation";
import Link from "next/link";

export function ContactsList() {
  const contacts = useContacts();
  const { openConversation } = useOpenConversation();

  return (
    <div>
      <p className="mt-4 font-bold">Contacts List :</p>
      {contacts.map((c) => {
        const contact = c.contact_profile;
        if (!contact) return null;
        return (
          <Link
            key={c.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              openConversation(contact.id);
            }}
            className="cursor-pointer"
          >
            • {contact.name} - Status : {contact.status} - Personal Message : {contact.personal_message}
          </Link>
        );
      })}
    </div>
  );
}
