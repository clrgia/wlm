"use client";

import { useContacts } from "@/features/home/hooks/useContacts";
import { useOpenConversation } from "@/features/chat/components/hooks/useOpenConversation";
import { ContactAccordion } from "@/features/home/components/contact-accordion";

export type ContactItemType = ReturnType<typeof useContacts>[number];

export function ContactsList() {
  const contacts = useContacts();
  const favorites = contacts.filter((c) => c.favorite == true);
  const { openConversation } = useOpenConversation();

  const categories = [
    ...new Map(
      contacts
        .filter((c) => c.categories && c.categories.name)
        .map((c) => [c.category_id, c.categories]),
    ).values(),
  ];

  const otherContacts = contacts.filter(
    (c) => !c.categories || !c.categories.name,
  );

  return (
    <div className="flex flex-col">
      <ContactAccordion
        title="Favorites"
        contacts={favorites}
        openConversation={openConversation}
        icon="/general/favorites.png"
      />

      {categories.map((cat) => {
        const categoryContacts = contacts.filter(
          (c) => c.category_id === cat.id,
        );

        return (
          <ContactAccordion
            key={cat.id}
            title={cat.name}
            contacts={categoryContacts}
            openConversation={openConversation}
          />
        );
      })}

      {otherContacts.length > 0 && (
        <ContactAccordion
          title="Other Contacts"
          contacts={otherContacts}
          openConversation={openConversation}
          defaultOpen={false}
        />
      )}
    </div>
  );
}
