import ChatClient from "@/features/chat/components/chat-client";
import { Suspense } from "react";

async function ChatRouteContent({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  const { conversationId } = await params;
  return <ChatClient conversationId={conversationId} />;
}

export default function Page({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) {
  return (
    <div className="flex w-full justify-center p-10">
      <div className="w-full">
        <Suspense fallback={null}>
          <ChatRouteContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
