"use client";

import { useProfile } from "@/features/home/hooks/useProfile";
import { useUpdateStatus } from "../hooks/useUpdateStatus";
import Dropdown, { DropdownItem } from "@/components/ui/dropdown";
import { useLogout } from "../hooks/useLogout";
import { ChangeNameModal } from "@/features/home/components/change-name-modal";
import { ChangePictureModal } from "@/features/home/components/change-picture-modal";
import { useState } from "react";

export function Name() {
  const [showChangeNameModal, setShowChangeNameModal] = useState(false);
  const [showChangePictureModal, setShowChangePictureModal] = useState(false);
  const logout = useLogout();
  const { updateStatus } = useUpdateStatus("");
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  const dropdownItems: DropdownItem[] = [
    {
      label: "Available",
      onClick: () => {
        updateStatus("online");
      },
      icon: <img src={`/status/online-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Busy",
      onClick: () => {
        updateStatus("busy");
      },
      icon: <img src={`/status/busy-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Away",
      onClick: () => {
        updateStatus("away");
      },
      icon: <img src={`/status/away-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Appear offline",
      onClick: () => {
        updateStatus("offline");
      },
      icon: <img src={`/status/offline-dot.png`} width={8} />,
      dividerBefore: false,
      disabled: false,
    },
    {
      label: "Sign out from here",
      onClick: logout,
      dividerBefore: true,
      disabled: false,
    },
    {
      label: "Change display picture...",
      onClick: () => setShowChangePictureModal(true),
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
      onClick: () => setShowChangeNameModal(true),
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
    <>
      <Dropdown
        trigger={
          <div className="aerobutton flex gap-2 items-baseline mt-2.5">
            <p className="text-[20px] my-[-5px]">{profile.name}</p>
            <p>({profile.status})</p>
            <div>
              <img src={`/general/arrow.png`} width={7} />
            </div>
          </div>
        }
        items={dropdownItems}
        align="right"
      />
      {showChangeNameModal && (
        <ChangeNameModal setShowChangeNameModal={setShowChangeNameModal} />
      )}
      {showChangePictureModal && (
        <ChangePictureModal setShowChangePictureModal={setShowChangePictureModal} />
      )}
    </>
  );
}
