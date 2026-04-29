"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function MessageInput({ conversationId }: { conversationId: string }) {
  const supabase = createClient();
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    const { data: user } = await supabase.auth.getUser();
    console.log("📨 sendMessage user:", user?.user?.id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.user?.id)
      .single();

    console.log("📨 sendMessage profile:", profile);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: profile?.id,
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
    <div className="flex gap-2 flex-col">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        className="border w-full"
      />
      <button onClick={sendMessage} className="border p-4">
        Send
      </button>
    </div>
  );
}
