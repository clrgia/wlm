import { useState } from "react";
import { ContactRow } from "@/features/home/components/contact-row";
import type { ContactItemType } from "@/features/home/components/contacts-list.types";

type ContactAccordionProps = {
  title: string;
  contacts: ContactItemType[];
  openConversation: (contactProfileId: string) => void;
  icon?: string;
  defaultOpen?: boolean;
};

export function ContactAccordion({
  title,
  contacts,
  openConversation,
  icon,
  defaultOpen = true,
}: ContactAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-2 flex flex-col">
      <button
        type="button"
        className="flex items-center cursor-pointer ml-1 hovercontact border border-transparent text-left"
        onClick={() => setIsOpen((current) => !current)}
      >
        <img
          src={
            isOpen
              ? "/general/open_tab_arrow.png"
              : "/general/closed_tab_arrow.png"
          }
          alt={isOpen ? "close tab" : "open tab"}
          className="mr-1"
        />
        {icon && <img src={icon} className="mr-1" alt={`${title} icon`} />}
        <p className="text-[#1D2F7F] mr-1">{title}</p>
        <p className="opacity-40">({contacts.length})</p>
      </button>

      {isOpen && (
        <div className="accordion">
          {contacts
            .slice()
            .sort((a, b) =>
              a.contact_profile.name.localeCompare(b.contact_profile.name),
            )
            .map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                openConversation={openConversation}
              />
            ))}
        </div>
      )}
    </div>
  );
}
