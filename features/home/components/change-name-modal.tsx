"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/features/home/hooks/useProfile";

interface Props {
  setShowChangeNameModal: (show: boolean) => void;
}

export const ChangeNameModal: React.FC<Props> = ({
  setShowChangeNameModal,
}) => {
  const supabase = useMemo(() => createClient(), []);
  const { profile, loading: profileLoading } = useProfile();
  const [name, setName] = useState<string>("");
  const [personalMessage, setPersonalMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name ?? "");
    setPersonalMessage(profile.personal_message ?? "");
  }, [profile]);

  const handleSave = async (closeAfterSave = true) => {
    if (!profile) return;
    setIsSaving(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ name, personal_message: personalMessage })
        .eq("id", profile.id);

      if (updateError) throw updateError;

      // notify other parts of the app
      try {
        window.dispatchEvent(new Event("profile:changed"));
      } catch {}

      if (closeAfterSave) {
        setShowChangeNameModal(false);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError((err as any)?.message ?? "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-[520px] my-6 mx-auto max-w-3xl">
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-[#f0f0f0] outline-none focus:outline-none h-[605px] border border-black border-opacity-35">
            <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
              <div className="flex items-center ml-1">
                <p className="ml-1 pt-1">Options</p>
              </div>
              <button
                className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
                onClick={() => setShowChangeNameModal(false)}
              >
                <p className="text-[10px]">╳</p>
              </button>
            </div>

            <div className="flex pl-2 h-full w-full">
              <div className="border border-black bg-white w-[110px] mr-2 h-full">
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Personal
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Layout
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Sign In
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Messages
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Alerts
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Sounds
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  File Transfer
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Privacy
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Security
                </div>
                <div className="py-[5px] pl-1 hover:bg-[#0078d7] hover:text-white cursor-pointer m-[1px]">
                  Connection
                </div>
              </div>
              <div className="w-full pr-1">
                <fieldset className="border border-black border-opacity-10 h-full">
                  <legend className="font-bold ml-2  ">Personal</legend>
                  <div className="flex gap-1 mt-2">
                    <p className="ml-6">Display Name</p>
                    <div className="mt-[10px]">
                      <img src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/others/subtitles_line_options.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvdGhlcnMvc3VidGl0bGVzX2xpbmVfb3B0aW9ucy5wbmciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgxNzA2MDgyLCJleHAiOjE3OTAzNDYwODJ9.dhBGjJXpfJsWFVueuBqhMbvfaralNuct-FJPl6Jh6fY" />
                    </div>
                  </div>
                  <div className="ml-12 mt-1">
                    <div>
                      <p>Type your name as you want others to see it:</p>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={profileLoading || isSaving}
                        className="w-[145px] border border-black border-opacity-25 h-8 mt-1 outline-none pl-1"
                      />
                    </div>
                    <div className="mt-1">
                      <p>Type a personal message for your contacts to see:</p>
                      <input
                        type="text"
                        value={personalMessage}
                        onChange={(e) => setPersonalMessage(e.target.value)}
                        disabled={profileLoading || isSaving}
                        className="w-[290px] border border-black border-opacity-25 h-8 mt-1 outline-none pl-1"
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={isSaving}
              >
                OK
              </button>
              <button
                type="button"
                onClick={() => setShowChangeNameModal(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={isSaving}
              >
                Apply
              </button>
              <button type="button">Help</button>
            </div>
            {error && <div className="mt-2 text-red-600">{error}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeNameModal;
