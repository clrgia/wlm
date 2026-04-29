"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContactInformations({
  conversationId,
}: {
  conversationId: string;
}) {
  const supabase = createClient();
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {

      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .select("profile_1, profile_2")
        .eq("id", conversationId)
        .single();

      if (convError || !conversation) {
        console.error("Conversation not found or error");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (!userId) {
        console.error("No auth user");
        return;
      }

      const { data: myProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .single();


      if (!myProfile) {
        console.error("No profile found");
        return;
      }

      const contactProfileId =
        conversation.profile_1 === myProfile.id
          ? conversation.profile_2
          : conversation.profile_1;

      const { data: contactData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", contactProfileId)
        .single();

      if (error || !contactData) {
        console.error("Failed to fetch contact profile");
        return;
      }

      setContact(contactData);
    };

    fetchContact();
  }, [conversationId]);

  if (!contact) return <div>Loading...</div>;

  return (
    <div className="border flex gap-2">
      <div>
        <img src={contact.avatar_url} width={100} />
      </div>
      <div>
        <p className="font-bold">Username : {contact.name}</p>
        <p>Personal Message : {contact.personal_message}</p>
      </div>
    </div>
  );
}
