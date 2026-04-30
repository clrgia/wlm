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
    <div>
      <Image
        className="relative mt-1 ml-1"
        src={avatar}
        alt="Avatar"
        width={45}
        height={45}
        unoptimized
      />
      <Image
        className="absolute top-0.5 ml-[-6]"
        src={`/status/status_frame_${status}_small.png`}
        alt={status}
        width={65}
        height={65}
        unoptimized
      />
    </div>
  );
}
