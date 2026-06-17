"use client";

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
  if (!conversationId) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="shrink-0">
        <BackButton conversationId={conversationId} />
        <ChatMenu />
        <ContactInformations conversationId={conversationId} />
      </div>
      <div className="flex-1 min-h-0">
        <Conversation conversationId={conversationId} />
      </div>
      <div className="shrink-0">
        <MessageInput conversationId={conversationId} />
      </div>
    </div>
  );
}
