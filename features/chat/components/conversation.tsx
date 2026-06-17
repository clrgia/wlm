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
    <div className="flex h-full min-h-0 gap-6 overflow-y-auto">
      <div className="w-[13rem] shrink-0" />
      <div className="w-full">
        {messages.map((msg, index) => {
          const previousMessage = messages[index - 1];
          const shouldShowSenderLabel =
            !previousMessage || previousMessage.sender_id !== msg.sender_id;

          return (
            <div key={msg.id} className="p-2 gap-2">
              {shouldShowSenderLabel && (
                <p className="opacity-70">{profilesMap[msg.sender_id]} says:</p>
              )}
              <div className="flex gap-2 items-baseline">
                <div>
                  <img
                    src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/message_dot.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvbWVzc2FnZV9kb3QucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MTcwNDQzOCwiZXhwIjo0OTM1MzA0NDM4fQ.WMTeldaHNIFa_yt9yQrdtHZ9f6BoTC8DeFFfSKYxKhk"
                    alt="Message Dot"
                  />
                </div>
                <p>{msg.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
