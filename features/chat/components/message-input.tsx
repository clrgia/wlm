"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Avatar } from "@/features/chat/components/avatar";
import { useProfile } from "@/features/home/hooks/useProfile";
import { EmoticonSelector } from "@/features/chat/components/emoticon-selector";
import { WinkSelector } from "@/features/chat/components/wink-selector";
import { NudgeButton } from "@/features/chat/components/nudge-button";
import { FontSelector } from "@/features/chat/components/font-selector";
import { BackgroundSelector } from "@/features/chat/components/background-selector";

export function MessageInput({ conversationId }: { conversationId: string }) {
  const supabase = createClient();
  const [text, setText] = useState("");
  const [lastMessageTime, setLastMessageTime] = useState<string | null>(null);
  const [lastMessageDate, setLastMessageDate] = useState<string | null>(null);
  const { profile } = useProfile();

  useEffect(() => {
    const fetchLastReceivedMessage = async () => {
      if (!conversationId || !profile?.id) return;

      const { data, error } = await supabase
        .from("messages")
        .select("created_at, sender_id")
        .eq("conversation_id", conversationId)
        .neq("sender_id", profile.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch last received message:", error);
        return;
      }

      if (!data?.created_at) {
        setLastMessageTime(null);
        setLastMessageDate(null);
        return;
      }

      const createdAt = new Date(data.created_at);

      setLastMessageTime(
        new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(createdAt),
      );
      setLastMessageDate(
        new Intl.DateTimeFormat("fr-FR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(createdAt),
      );
    };

    fetchLastReceivedMessage();
  }, [conversationId, profile?.id, supabase]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: profile.id,
        content: text,
      })
      .select("*")
      .single();

    setText("");
  };

  return (
    <div className="flex mb-12 mt-6 mr-6">
      <div className="mr-6 ml-9 mt-2 flex items-center">
        {profile ? Avatar(profile.avatar_url, profile.status) : null}
      </div>
      {/* <div className="z-50 absolute left-[165px] bottom-[70px]">
        <img
          src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/chat_input_corner.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvY2hhdF9pbnB1dF9jb3JuZXIucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTcwMDI3OCwiZXhwIjo0OTM1MzAwMjc4fQ.AjQxqcObD72OQ4z1LPnJE3mF72ij1kw2zCliW87PWm4"
          alt=""
        />
      </div> */}

      <div>
        <div className="w-full">
          {/* <div className="flex gap-1">
            <p>user </p>
            <p>is typing...</p>
          </div> */}

          {lastMessageTime && lastMessageDate && (
            <p className="opacity-50 my-1">
              Last message received at {lastMessageTime} on {lastMessageDate}.
            </p>
          )}

          <img
            src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/horizontal_divider.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvaG9yaXpvbnRhbF9kaXZpZGVyLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE2OTkxMjcsImV4cCI6NDkzNTI5OTEyN30.HpyWE1_hDgYaQ0AheTCaArdzA-_KecddiC6yk_XjG6M"
            alt=""
            className="pointer-events-none mb-1"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            className="w-full border rounded-t-[4px] outline-none p-1 border-[#bdd5df] h-[8rem] bg-[#f6fcff] resize-none mb-[-5px]"
          />

          <div
            className="flex border-x border-b rounded-b-[4px] border-[#bdd5df]"
            style={{
              backgroundImage: `url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/chat_icons_background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvY2hhdF9pY29uc19iYWNrZ3JvdW5kLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE3MDAyMTYsImV4cCI6NDkzNTMwMDIxNn0.JZBtVoqba04ne2agrceQ8qiOS6ns_7TmGCFGVLgMa88)`,
            }}
          >
            {EmoticonSelector()}
            {WinkSelector()}
            {NudgeButton()}
            <div className="px-2">
              <img
                src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/chat_icons_separator.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvY2hhdF9pY29uc19zZXBhcmF0b3IucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTY5ODg5MCwiZXhwIjo0OTM1Mjk4ODkwfQ.B3vhvr_UszAn1KM8yHZrOwj8_AXYxeAagmrgk2ZHYM8"
                alt=""
              />
            </div>
            {FontSelector()}
            {BackgroundSelector()}
          </div>
        </div>
      </div>
    </div>
  );
}
