"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type NotificationData = {
  sender: string;
  content: string;
};

export function Notification() {
  const supabase = useMemo(() => createClient(), []);
  const pathname = usePathname();
  const [profileId, setProfileId] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationData | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const userId = authData.user?.id;
      if (!userId || !isMounted) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (isMounted) setProfileId(profile?.id ?? null);
    };

    load();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setProfileId(null);
      else load();
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    if (!profileId) return;

    const channel = supabase
      .channel("global-notification-listener")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          const message = payload.new as { conversation_id: string; sender_id: string; content: string };

          if (message.sender_id === profileId) return;
          if (pathname === `/chat/${message.conversation_id}`) return;

          const { data: conversation } = await supabase
            .from("conversations")
            .select("profile_1, profile_2")
            .eq("id", message.conversation_id)
            .maybeSingle();

          if (!conversation) return;
          if (conversation.profile_1 !== profileId && conversation.profile_2 !== profileId) return;

          const { data: senderProfile } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", message.sender_id)
            .maybeSingle();

          setNotification({
            sender: senderProfile?.name ?? "Someone",
            content: message.content,
          });
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase, profileId, pathname]);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification) return null;

  return (
    <div
      className="fixed bottom-2 right-4 z-50 w-[16.7rem] h-[9.7rem] bg-no-repeat border border-gray-400 rounded-lg shadow-[3px_3px_12px_1px_rgba(51,_65,_85,_0.12)]"
      style={{
        backgroundImage:
          "url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/others/notification.png)",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center m-1">
          <img src="/general/wlm-icon.png" className="mx-1" alt="icon" />
          <p>Windows Live Messenger</p>
        </div>

        <button
          onClick={() => setNotification(null)}
          className="pb-2 pt-2 px-3 rounded-tr-lg hover:bg-red-700"
        >
          <p className="text-[7px]">╳</p>
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col w-full justify-center">
          <div className="flex justify-center">
            <p>{notification.sender} says:</p>
          </div>
          <div className="flex justify-center">
            <p className="truncate">{notification.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
