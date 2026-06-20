"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const supabase = useMemo(() => createClient(), []);

  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const userId = data.user?.id;
      if (!userId) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();
      setProfileId(profile?.id ?? null);
    });
  }, []);

  // 📩 FETCH MESSAGES
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      setMessages(data || []);
    };

    fetchMessages();
  }, [conversationId]);

  // 🔥 REALTIME
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const msg = payload.new;

          setMessages((prev) => [...prev, msg]);
          if (msg.sender_id === profileId) return;
          new Audio("/sounds/type.mp3").play();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, profileId]);

  return { messages };
}
