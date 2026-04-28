
import { ProfileInformations } from "@/features/home/components/profile-informations";
import { ContactsList } from "@/features/home/components/contacts-list";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ProfileInformations />
        <ContactsList />
      </div>
    </div>
  );
}
