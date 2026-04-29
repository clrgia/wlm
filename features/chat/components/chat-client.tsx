"use client";

import ContactInformations from "@/features/chat/components/contact-informations";
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
      <ContactInformations conversationId={conversationId} />
      <Conversation conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  );
}
