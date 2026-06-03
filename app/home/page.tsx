"use client";

import { ProfileInformations } from "@/features/home/components/profile-informations";
import { ContactsList } from "@/features/home/components/contacts-list";
import Searchbar from "@/features/home/components/search-bar";
import AddContact from "@/features/home/components/add-contact";
import WhatsNew from "@/features/home/components/whats-new";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col justify-between">
      <div
        className="bg-no-repeat bg-[length:100%_100px] h-[100px]"
        style={{
          backgroundImage:
            "url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/scenes/default_background.jpg)",
        }}
      >
        <ProfileInformations />
        <div className="flex items-center">
          <Searchbar />
          <AddContact />
        </div>
        <ContactsList />
      </div>
      <WhatsNew />
    </div>
  );
}
