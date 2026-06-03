import Link from "next/link";
import { ContactItemType } from "./contacts-list";

type ContactRowProps = {
  contact: ContactItemType;
  openConversation: (contactProfileId: string) => void;
};

export function ContactRow({ contact, openConversation }: ContactRowProps) {
  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        openConversation(contact.contact_profile.id);
      }}
      className="px-6 cursor-pointer hovercontact w-full text-[12px] border border-transparent flex items-baseline gap-2"
    >
      <div>
        <img
          src={`/status/${contact.contact_profile.status}-dot.png`}
          width={7}
        />
      </div>
      {contact.contact_profile.name}
      {contact.contact_profile.personal_message &&
        " - " + contact.contact_profile.personal_message}
    </Link>
  );
}
