"use client";

import { useProfile } from "@/features/home/hooks/useProfile";

export function ProfileInformations() {
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="border flex gap-2">
      <div>
        <img src={profile.avatar_url} width={100} />
      </div>
      <div>
        <p className="font-bold">Username : {profile.name}</p>
        <p>Personal Message : {profile.personal_message}</p>
      </div>
    </div>
  );
}
