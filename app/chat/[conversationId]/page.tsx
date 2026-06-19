import ChatClient from "@/features/chat/components/chat-client";

async function ChatRouteContent({
  params,
}: {
  params: { conversationId: string };
}) {
  return <ChatClient conversationId={params.conversationId} />;
}

export default function Page({
  params,
}: {
  params: { conversationId: string };
}) {
  return (
    <div className="bg-gradient-to-b from-white to-[#c5eaff] from-85%">
      <ChatRouteContent params={params} />
    </div>
  );
}
