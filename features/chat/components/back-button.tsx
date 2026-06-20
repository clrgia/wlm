"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function BackButton({ conversationId }: { conversationId: string }) {
  const [contactEmail, setContactEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactEmail = async () => {
      if (!conversationId) return;

      const response = await fetch(
        `/api/chat/contact-email?conversationId=${encodeURIComponent(conversationId)}`,
      );

      const data = (await response.json()) as { email?: string | null };
      setContactEmail(data.email ?? null);
    };

    fetchContactEmail();
  }, [conversationId]);

  return (
    <div className="flex items-center gap-2">
      <Link href="/home">
        <div className="w-8 h-8 cursor-pointer m-1">
          <img src={`/general/back_button.png`} alt="" />
        </div>
      </Link>
      <img
        src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/contact_chat_icon.png"
        alt=""
      />
      <div className="flex flex-col leading-tight">
        <p>Contact</p>
        {contactEmail && (
          <p className="text-[11px] opacity-70">{contactEmail}</p>
        )}
      </div>
    </div>
  );
}
