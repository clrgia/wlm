"use client";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useRealtimeMessages(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  // ✅ Client stable — ne se recrée pas à chaque render
  const supabase = useMemo(() => createClient(), []);

  // 🔹 1. FETCH INITIAL
  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❌ FETCH ERROR:", error);
        return;
      }
      setMessages(data || []);
    };

    fetchMessages();
  }, [conversationId]); // ✅ supabase retiré des deps

  // 🔹 2. REALTIME
  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => {
            switch (payload.eventType) {
              case "INSERT":
                return [...prev, payload.new];
              case "UPDATE":
                return prev.map((msg) =>
                  msg.id === payload.new.id ? payload.new : msg,
                );
              case "DELETE":
                return prev.filter((msg) => msg.id !== payload.old.id);
              default:
                return prev;
            }
          });
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          console.log("✅ Realtime connected");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  return { messages, setMessages };
}
