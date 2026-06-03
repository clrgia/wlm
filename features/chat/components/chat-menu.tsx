export default function ChatMenu() {
  return (
    <div className="h-[31.4px] flex bg-[url(/background/chat_menu_background.png)] justify-between items-center px-4 text-white shadow-lg">
      <div className="p-1 flex gap-4">
        <div className="p-1 flex items-center opacity-50">Photos</div>
        <div className="p-1 flex items-center opacity-50">Files</div>
        <div className="p-1 flex items-center opacity-50">Games</div>
        <div className="p-1 flex items-center opacity-50">Activities</div>
        <div className="p-1 flex items-center opacity-50">Invite</div>
        <div className="p-1 flex items-center opacity-50">Block</div>
      </div>

      <div className="flex gap-1 items-center aerobutton py-4 px-1 h-6">
        <div>
          <img src={`/contacts/1489.png`} alt="" />
        </div>
        <div>
          <img src={`/general/arrow_white.png`} alt="" />
        </div>
      </div>
    </div>
  );
}
