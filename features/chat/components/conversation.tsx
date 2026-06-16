"use client";

import { useRealtimeMessages } from "./hooks/useRealtimeMessages";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useRef, useState } from "react";

export function Conversation({ conversationId }: { conversationId: string }) {
  const supabase = createClient();
  const { messages } = useRealtimeMessages(conversationId);
  const [profilesMap, setProfilesMap] = useState<Record<string, string>>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchSenders = async () => {
      const senderIds = Array.from(
        new Set(messages.map((m: any) => m.sender_id).filter(Boolean)),
      );
      if (senderIds.length === 0) {
        setProfilesMap({});
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("id, name")
        .in("id", senderIds as any[]);
      if (error) {
        console.error("Failed to fetch sender profiles:", error);
        return;
      }

      const map: Record<string, string> = {};
      (data || []).forEach((p: any) => {
        map[p.id] = p.name;
      });
      setProfilesMap(map);
    };

    fetchSenders();
  }, [messages, supabase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, profilesMap]);



  return (
    <div className="flex h-full min-h-0 gap-6">
      <div className="w-[11rem] shrink-0" />
      <div className="mt-4 mb-4 h-full min-h-0 w-full overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 gap-2">
            <p>{profilesMap[msg.sender_id]} says:</p>
            <p className="font-bold">• {msg.content}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
