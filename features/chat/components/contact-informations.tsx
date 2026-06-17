"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/features/chat/components/avatar";

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
    <div className="pt-3 flex gap-2 bg-[url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/backgrounds/background.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYWNrZ3JvdW5kcy9iYWNrZ3JvdW5kLmpwZyIsImlhdCI6MTc4MDUwNzEzOCwiZXhwIjo0OTM0MTA3MTM4fQ.G_krLWkWAHd7-Mz5t7y85x0wsLxpQoQk2df9QC-ow4c)] bg-no-repeat bg-[length:100%_100px]">
      <div className="mr-6 ml-9">
        {Avatar(contact.avatar_url, contact.status)}
      </div>
      <div>
        <div className="flex items-baseline gap-2 glow">
          <p className="pt-2 text-[20px]">{contact.name}</p>
          <p className="capitalize">({contact.status})</p>
        </div>
        <p>Personal Message : {contact.personal_message}</p>
      </div>
    </div>
  );
}
