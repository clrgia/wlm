"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/features/home/hooks/useProfile";
import { usertiles } from "@/components/utils/usertiles-import";
import { Avatar } from "@/features/chat/components/avatar";

interface Props {
  setShowChangePictureModal: (show: boolean) => void;
}

export const ChangePictureModal: React.FC<Props> = ({ setShowChangePictureModal }) => {
    const supabase = useMemo(() => createClient(), []);
    const { profile, loading: profileLoading } = useProfile();
    const [selectedPicture, setSelectedPicture] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (profile?.avatar_url) {
        setSelectedPicture(profile.avatar_url);
      }
    }, [profile]);

    const handleSave = async (closeAfterSave = true) => {
      if (!profile) return;
      setIsSaving(true);
      setError(null);
      try {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar_url: selectedPicture })
          .eq("id", profile.id);

        if (updateError) throw updateError;

        try {
          window.dispatchEvent(new Event("profile:changed"));
        } catch {}

        if (closeAfterSave) {
          setShowChangePictureModal(false);
        }
      } catch (err) {
        console.error("Failed to update picture:", err);
        setError((err as any)?.message ?? "Failed to save");
      } finally {
        setIsSaving(false);
      }
    };



  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {/* Content */}
        <div className="w-[39rem] border border-gray-400 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c1cfe483] via-white to-[#edf4fd83]">
          {/* Header */}
          <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
            <div className="flex items-center ml-1">
              <div>
                <img src={"/general/wlm-icon.png"} />
              </div>
              <p className="ml-1 pt-1">Display Picture</p>
            </div>
            <button
              className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
              onClick={() => setShowChangePictureModal(false)}
            >
              <p className="text-[10px]">╳</p>
            </button>
          </div>

          {/* Body */}
          <div className="mx-4 mb-6">
            <p className="mt-2 text-xl text-[#1D2F7F]">
              Select a display picture
            </p>
            <p className="opacity-60">
              Choose how you want to appear in Messenger:
            </p>
          </div>

          <div className="flex ml-2">
            <div className="win7">
              <div className="flex flex-wrap gap-4 h-[351px] w-[25rem] overflow-y-auto p-2.5 has-scrollbar mb-2">
                <div className="font-bold w-full mb-[-5px]">
                  Regular pictures
                </div>
                {Object.entries(usertiles).map(([name, src]) => (
                  <div
                    key={name}
                    className="cursor-pointer"
                    onClick={() => setSelectedPicture(src)}
                  >
                    <img
                      key={name}
                      src={src}
                      alt={name}
                      className="w-[4rem] shadow-lg usertiles-shadow border border-hidden"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-6 w-full">
              <div className="mb-14 flex justify-center">
                {profile ? <Avatar image={selectedPicture} /> : null}
              </div>
              <div className="win7 flex flex-col gap-0.5">
                <button disabled>Webcam picture...</button>
                <button disabled>Dynamic picture...</button>
                <button>Browse...</button>
                {/* <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  /> */}
                <button
                  onClick={() =>
                    setSelectedPicture(
                      "https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/usertiles/default.png",
                    )
                  }
                >
                  Remove
                </button>
                <button disabled>Modify...</button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mb-4 link ml-4">Download more pictures...</p>
          <div className="w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]" />
          <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
            <button
              type="button"
              onClick={() => {
                handleSave(true);
                setShowChangePictureModal(false);
              }}
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => setShowChangePictureModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePictureModal;
