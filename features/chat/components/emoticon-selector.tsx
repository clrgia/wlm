export function EmoticonSelector() {
  return (
      <div className="aerobutton flex gap-1 px-1 items-center">
        <div className="w-6">
          <img
            src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/select_emoticon.png"
            alt="Select Emoticon"
          />
        </div>
        <div>
          <img
            src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/arrow.png"
            alt="Dropdown Arrow"
          />
        </div>
      </div>
  );
}
