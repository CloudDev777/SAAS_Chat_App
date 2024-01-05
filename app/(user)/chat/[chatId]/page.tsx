import { nextAuthOptions } from "@/auth";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatMembersBadge from "@/components/ChatMembersBadge";
import { sortedMessagesRef } from "@/lib/converters/Messages";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";
import AdminControls from "@/components/AdminControls";
import { chatMembersRef } from "@/lib/converters/ChatMembers";
import { redirect } from "next/navigation";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

async function ChatPage({ params: { chatId } }: ChatPageProps) {
  const session = await getServerSession(nextAuthOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const hasAccess = await (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id!);

  if (!hasAccess) {
    redirect('/chat?error=permission');
    return null;
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <AdminControls chatId={chatId} />
      <ChatMembersBadge chatId={chatId} />
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </div>
  );
}

export default ChatPage;
