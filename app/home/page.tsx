
import { ProfileInformations } from "@/features/home/components/profile-informations";
import { ContactsList } from "@/features/home/components/contacts-list";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default function Page() {
  return (
    <div className="flex w-full justify-center p-10">
      <div className="w-full">
        <LogoutButton />
        <ProfileInformations />
        <ContactsList />
      </div>
    </div>
  );
}
