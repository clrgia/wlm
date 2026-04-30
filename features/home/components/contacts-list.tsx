"use client";

import { useContacts } from "@/features/home/hooks/useContacts";
import { useOpenConversation } from "@/features/chat/components/hooks/useOpenConversation";
import Link from "next/link";

export function ContactsList() {
  const contacts = useContacts();
  const { openConversation } = useOpenConversation();

  // Catégories normales (avec nom)
  const categories = [
    ...new Map(
      contacts
        .filter((c) => c.categories && c.categories.name)
        .map((c) => [c.category_id, c.categories]),
    ).values(),
  ];

  // Contacts sans catégorie ou avec nom null
  const otherContacts = contacts.filter(
    (c) => !c.categories || !c.categories.name,
  );

  return (
    <div className="flex flex-col">
      {/* Catégories classiques */}
      {categories.map((cat) => {
        const categoryContacts = contacts.filter(
          (c) => c.category_id === cat.id,
        );

        return (
          <div key={cat.id} className="flex flex-col">
            <div className="text-[16px]">{cat.name}</div>

            {categoryContacts.map((c) => (
              <Link
                key={c.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openConversation(c.contact_profile.id);
                }}
                className="px-6 cursor-pointer hovercontact w-full text-[12px] border border-transparent flex items-baseline gap-2"
              >
                <div>
                  <img
                    src={`/status/${c.contact_profile.status}-dot.png`}
                    width={7}
                  />
                </div>
                {c.contact_profile.name}
                {c.contact_profile.personal_message &&
                  " - " + c.contact_profile.personal_message}
              </Link>
            ))}
          </div>
        );
      })}

      {/* Nouvelle catégorie "Other contacts" */}
      {otherContacts.length > 0 && (
        <div className="flex flex-col mt-4">
          <div className="text-[16px]">Other Contacts</div>

          {otherContacts.map((c) => (
            <Link
              key={c.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                openConversation(c.contact_profile.id);
              }}
              className="px-6 cursor-pointer hovercontact w-full text-[12px] border border-transparent flex items-baseline gap-2"
            >
              <div>
                <img
                  src={`/status/${c.contact_profile.status}-dot.png`}
                  width={7}
                />
              </div>
              {c.contact_profile.name}
              {c.contact_profile.personal_message &&
                " - " + c.contact_profile.personal_message}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
