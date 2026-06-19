import ChatClient from "@/features/chat/components/chat-client";

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
    <div className="bg-gradient-to-b from-white to-[#c5eaff] from-85%">
      <ChatRouteContent params={params} />
    </div>
  );
}
