"use client";

import { useProfile } from "@/features/home/hooks/useProfile";

export function ProfileInformations() {
  const { profile, loading } = useProfile();

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div>
      <img src={profile.avatar_url} />
      <h1>{profile.name}</h1>
      <p>{profile.personal_message}</p>
    </div>
  );
}
