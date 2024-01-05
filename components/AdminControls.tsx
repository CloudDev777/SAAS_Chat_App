import InviteUserButton from "@/components/InviteUserButton";
import DeleteChatButton from "./DeleteChatButton";

function AdminControls({ chatId }: { chatId: string }) {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUserButton chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
}

export default AdminControls;
