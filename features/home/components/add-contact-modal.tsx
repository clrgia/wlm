"use client";

import { NextPage } from "next";
import { useMemo, useState, type FormEvent } from "react";
import "7.css/dist/7.scoped.css";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/features/home/hooks/useProfile";

interface Props {
  setShowAddContactModal: (show: boolean) => void;
}

const AddContactModal: NextPage<Props> = ({ setShowAddContactModal }) => {
  const supabase = useMemo(() => createClient(), []);
  const { profile, loading: profileLoading } = useProfile();
  const [contactValue, setContactValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (err: unknown) => {
    const fallbackMessage = "Unable to add contact.";

    if (
      typeof err === "object" &&
      err !== null &&
      "message" in err &&
      typeof (err as { message?: unknown }).message === "string"
    ) {
      const message = (err as { message: string }).message;

      return message === "No profile was found for this email."
        ? "The instant messaging address that you entered is not valid. Check the address and try again."
        : message;
    }

    return fallbackMessage;
  };

  const handleAddContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const email = contactValue.trim().toLowerCase();
    setIsSaving(true);

    try {
      const { error: rpcError } = await supabase.rpc("add_contact_by_email", {
        contact_email: email,
      });

      if (rpcError) {
        throw rpcError;
      }

      window.dispatchEvent(new Event("contacts:changed"));
      setShowAddContactModal(false);
    } catch (err) {
      console.error("add-contact-modal: add contact failed", err);
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex items-center h-full">
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* Content */}
          <div className="w-[41rem] border border-gray-400 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none bg-gradient-to-t from-[#c1cfe483] via-white to-[#edf4fd83]">
            {/* Header */}
            <div className="flex items-start justify-between rounded-t-lg bg-[#f3f3f3]">
              <div className="flex items-center m-1">
                <div className="mx-1">
                  <img src={"/general/wlm-icon.png"} />
                </div>
                <p>Windows Live Messenger</p>
              </div>
              <button
                className="pb-2 pt-1 px-3 rounded-tr-lg hover:bg-red-700 hover:text-white"
                onClick={() => setShowAddContactModal(false)}
              >
                <p className="text-[10px]">╳</p>
              </button>
            </div>
            {error && (
              <div className="flex gap-1 p-2 bg-[#ffffc5] rounded border border-[#c9cdd3]">
                <div>
                  <img
                    src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/warning.png`}
                  />
                </div>
                <p className="overflow-auto">{error}</p>
              </div>
            )}

            {/* Body */}
            <div className="mx-4 mb-6 h-[32rem] ">
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xl text-[#192661]">
                  Enter the person's information
                </p>
                <div className="cursor-pointer">
                  <img
                    src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/question.png`}
                  />
                </div>
              </div>
              <p className="opacity-60">
                Enter an instant messaging address, mobile device number, or
                both. When you add someone to Messenger, they also become part
                of your network on Windows Live.
              </p>

              <form
                id="add-contact-form"
                className="flex flex-col gap-1 mb-6 mt-6"
                onSubmit={handleAddContact}
              >
                <label htmlFor="email">Instant messaging address:</label>
                <input
                  id="email"
                  type="email"
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  disabled={profileLoading || isSaving}
                  className="w-full border border-gray-300 rounded focus:outline-none p-0.5"
                />
                <p className="opacity-50">
                  Example: example@live.com or example@yahoo.com
                </p>
              </form>
            </div>

            {/* Footer */}
            <div className="w-full bg-white h-[1px] shadow-sm shadow-[#6b8fa3]" />
            <div className="flex items-center justify-end rounded-b win7 p-3 gap-1.5">
              <button
                type="submit"
                form="add-contact-form"
                disabled={!contactValue.trim() || profileLoading || isSaving}
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => setShowAddContactModal(false)}
                disabled={isSaving}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default AddContactModal;
