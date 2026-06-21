export function NudgeButton({ onNudge }: { onNudge?: () => void }) {
    const handleNudgeClick = () => {
      const audio = new Audio("https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/sign/sounds/nudge.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zZGU4ZTViOC04ZDVmLTQ1NTYtOTE2ZC1jMTFiNjA0NzhkMTkiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzb3VuZHMvbnVkZ2UubXAzIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MjA1MzU4NSwiZXhwIjo0OTM1NjUzNTg1fQ.L76S1G7CRN5F2F632eFAQGIt5aYqB0-sDqU7RHSVu7Y");
      audio.play();
      onNudge?.();
    };
  return (
    <div className="aerobutton flex gap-1 px-1 items-center" onClick={handleNudgeClick}>
      <div>
        <img
          src="https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/icons/send_nudge.png"
          alt=""
        />
      </div>
    </div>
  );
}
