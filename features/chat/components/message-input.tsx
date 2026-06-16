"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/features/auth/components/avatar";
import { useProfile } from "@/features/home/hooks/useProfile";

export function MessageInput({ conversationId }: { conversationId: string }) {
  const supabase = createClient();
  const [text, setText] = useState("");
  const { profile } = useProfile();

  const sendMessage = async () => {
    if (!text.trim()) return;

    if (!profile?.id) {
      console.error("No connected profile found");
      return;
    }

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: profile.id,
        content: text,
      })
      .select("*")
      .single();

    console.log("📨 sendMessage insert result:", { data, error });

    if (error) {
      console.error("❌ sendMessage insert error:", error);
      return;
    }

    setText("");
  };

  return (
    <div className="flex gap-2 mb-12 mt-6 mr-6">
      <div>{profile ? Avatar(profile.avatar_url, profile.status) : null}</div>
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          className="border w-full h-full"
        />
      </div>
    </div>
  );
}
