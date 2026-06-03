import Image from "next/image";
import { useProfile } from "@/features/home/hooks/useProfile";
import { useEffect, useState } from "react";

export function Avatar() {
  const { profile, loading } = useProfile();

  const avatar = profile?.avatar_url ?? "/contacts/add_contact.png";

  const [status, setStatus] = useState<string>(
    () => profile?.status ?? "offline",
  );

  useEffect(() => {
    if (profile?.status) setStatus(profile.status);
  }, [profile?.status]);

  if (loading) return null;
  if (!profile) return null;

  return (
      <div className="h-[80px] w-[80px] relative ">
        <img
          className="absolute m-[7px] rounded-sm w-[52px]"
          src={avatar}
          alt="Avatar"
        />
        <img
          className="absolute w-full h-full bottom-2 right-2"
          src={`/status/status_frame_${status}_small.png`}
          alt="Status Frame"
        />
      </div>
  );
}
