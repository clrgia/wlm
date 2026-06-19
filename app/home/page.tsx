"use client";

import { ProfileInformations } from "@/features/home/components/profile-informations";
import { ContactsList } from "@/features/home/components/contacts-list";
import Searchbar from "@/features/home/components/search-bar";
import AddContact from "@/features/home/components/add-contact";
import WhatsNew from "@/features/home/components/whats-new";
import Footer from "@/features/home/components/footer";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col justify-between bg-gradient-to-b from-white to-[#c5eaff] from-85% ">
      <div
        className="bg-no-repeat bg-[length:100%_300px]"
        style={{
          backgroundImage:
            "url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/main_background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvbWFpbl9iYWNrZ3JvdW5kLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE3MTE2MTQsImV4cCI6MTc5MDM1MTYxNH0.FI-nq8QDlgrC4ZU8rdkwPevujEZlonRAYcKL_vEPXeE)",
        }}
      >
        <ProfileInformations />
        <div className="flex items-center gap-2 h-9 mx-4">
          <Searchbar />
          <AddContact />
        </div>
        <ContactsList />
      </div>
      <div>
        <WhatsNew />
        <Footer />
      </div>
    </div>
  );
}
