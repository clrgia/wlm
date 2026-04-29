import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function useOpenConversation() {
  const supabase = createClient();
  const router = useRouter();

  const openConversation = async (contactId: string) => {
    const { data: user } = await supabase.auth.getUser();
    const userId = user.user?.id;

    if (!userId) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", userId)
      .single();

    console.log("Current Profile:", profile);

    const [profile_1, profile_2] =
      profile?.id < contactId ? [profile?.id, contactId] : [contactId, profile?.id];

    const { data: existing, error: selectError } = await supabase
      .from("conversations")
      .select("*")
      .eq("profile_1", profile_1)
      .eq("profile_2", profile_2)
      .maybeSingle();

    if (selectError) {
      console.error("SELECT ERROR:", selectError);
      return;
    }

    let conversation = existing;
    console.log("Profile 1:", profile_1, "Profile 2:", profile_2);

    if (!conversation) {
      const { data: newConv, error: insertError } = await supabase
        .from("conversations")
        .insert({
          profile_1,
          profile_2,
        })
        .select()
        .single();

      if (insertError) {
        console.error("INSERT ERROR:", insertError);
        return;
      }

      conversation = newConv;
    }

    if (!conversation) return;


    router.push(`/chat/${conversation.id}`);
  };

  return { openConversation };
}
