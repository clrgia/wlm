"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ConversationRow = {
  profile_1: string;
  profile_2: string;
};

type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
};

export function MessageSoundListener() {
  const supabase = useMemo(() => createClient(), []);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!isMounted) return;
      setUserId(data.user?.id ?? null);
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id ?? null);
      },
    );

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    let isMounted = true;

    if (!userId) {
      setProfileId(null);
      return;
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load current profile for sound listener:", error);
        setProfileId(null);
        return;
      }

      setProfileId(data?.id ?? null);
    };

    loadProfile();

    return () => { isMounted = false; };
  }, [supabase, userId]);

  useEffect(() => {
    if (!profileId) return;

    const playMessageSound = () => {
      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/type.mp3");
        audioRef.current.volume = 0.8;
      }
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    };

    const channel = supabase
      .channel("global-message-sounds")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const message = payload.new as MessageRow;

          if (!message?.conversation_id || message.sender_id === profileId) return;

          const { data: conversation, error } = await supabase
            .from("conversations")
            .select("profile_1, profile_2")
            .eq("id", message.conversation_id)
            .maybeSingle();

          if (error || !conversation) return;

          const convo = conversation as ConversationRow;
          if (convo.profile_1 !== profileId && convo.profile_2 !== profileId) return;

          playMessageSound();
        },
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase, profileId]);

  return null;
}
