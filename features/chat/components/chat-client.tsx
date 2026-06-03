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
    <div>
      <BackButton />
      <ChatMenu />
      <ContactInformations conversationId={conversationId} />
      <Conversation conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
