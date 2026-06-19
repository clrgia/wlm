type AvatarProps = {
  image?: string;
  status?: string;
};

export function Avatar({ image, status }: AvatarProps) {
  return (
    <div className="h-[11rem] w-[11rem] flex items-center justify-center relative">
      <img
        className="absolute rounded-sm m-2 w-[8rem] h-[8rem]"
        src={`https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/usertiles/default.png`}
        alt="Avatar"
      />
      <img
        className="absolute"
        src={
          status
            ? `https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/status_frame_${status}_large.png`
            : `https://wxactkxxweinaigcwvkw.supabase.co/storage/v1/object/public/status/status_frame_offline_large.png`
        }
        alt={`${status}`}
      />
    </div>
  );
}
