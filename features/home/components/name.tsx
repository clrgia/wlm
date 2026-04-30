"use client";

import { useProfile } from "@/features/home/hooks/useProfile";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { useLogout } from "../hooks/useLogout";

export function Name() {
  const logout = useLogout();
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  const dropdownItems: DropdownItem[] = [
    {
      label: "Available",
      onClick: () => {},
      icon: <img src={`/status/online-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Busy",
      onClick: () => {},
      icon: <img src={`/status/busy-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Away",
      onClick: () => {},
      icon: <img src={`/status/away-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Appear offline",
      onClick: logout,
      icon: <img src={`/status/offline-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Sign out from here",
      onClick: () => {},
      dividerBefore: true,
      disabled: false,
    },
    {
      label: "Change display picture...",
      onClick: () => {},
      dividerBefore: true,
      disabled: false,
    },
    {
      label: "Change scene...",
      onClick: () => {},
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Change display name...",
      onClick: () => {},
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Options...",
      onClick: () => {},
      dividerBefore: true,
      disabled: false,
    },
  ];

  return (
    <Dropdown
      trigger={
        <div className="aerobutton flex gap-1 items-center">
          <p>{profile.name}</p>
          <p className="capitalize">({profile.status})</p>
          <div>
            <img src={`/general/arrow.png`} width={7} />
          </div>
        </div>
      }
      items={dropdownItems}
      align="right"
    />
  );
}
