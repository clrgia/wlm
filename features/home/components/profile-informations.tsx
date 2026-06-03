"use client";

import { useProfile } from "@/features/home/hooks/useProfile";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { Avatar } from "./avatar";
import { Name } from "./name";

export function ProfileInformations() {
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;


  return (
    <div className="flex mx-4 py-2">
        <Avatar />
      <div>
        <Name/>
        <div className="aerobutton flex gap-1 items-center">
          <p>{profile.personal_message ?? "Sharing a quick message"}</p>
          <div>
            <img src={`/general/arrow.png`} width={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
