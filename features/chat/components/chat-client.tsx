"use client";

import { useState } from "react";
import ContactInformations from "@/features/chat/components/contact-informations";
import ChatMenu from "@/features/chat/components/chat-menu";
import { Conversation } from "@/features/chat/components/conversation";
import { MessageInput } from "@/features/chat/components/message-input";
import { BackButton } from "@/features/chat/components/back-button";

export default function ChatClient({
  conversationId,
}: {
  conversationId: string;
}) {
  const [shaking, setShaking] = useState(false);

  const handleNudge = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 500);
  };

  if (!conversationId) return null;

  return (
    <div className={`h-screen flex flex-col overflow-hidden${shaking ? " nudge" : ""}`}>
      <BackButton conversationId={conversationId} />
      <ChatMenu />
      <div
        className="h-screen flex flex-col overflow-hidden bg-no-repeat bg-[length:100%_300px]"
        style={{
          backgroundImage:
            "url(https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/main_background.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvbWFpbl9iYWNrZ3JvdW5kLnBuZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODE3MTI0NjcsImV4cCI6NDkzNTMxMjQ2N30.sGo7k5h7pO-jNhEfBR1xx4z24p6-Qqd1kbKZ_9hGWCw)",
        }}
      >
        <ContactInformations conversationId={conversationId} />

        <Conversation conversationId={conversationId} />
        <MessageInput conversationId={conversationId} onNudge={handleNudge} />
      </div>
    </div>
  );
}
