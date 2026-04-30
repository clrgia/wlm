"use client";

import { ProfileInformations } from "@/features/home/components/profile-informations";
import { ContactsList } from "@/features/home/components/contacts-list";
import Searchbar from "@/features/home/components/search-bar";
import AddContact from "@/features/home/components/add-contact";

export default function Page() {
  return (
    <div className="w-full">
      <ProfileInformations />
      <div className="flex items-center">
        <Searchbar />
        <AddContact />
      </div>
      <ContactsList />
    </div>
  );
}
