import { nextAuthOptions } from "@/auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/ChatMembers";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import ChatListRows from "./ChatListRows";

async function ChatList() {
  const session = await getServerSession(nextAuthOptions);

  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id!)
  );

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    // setting timestamp to null, because only plain objects can be passed
    // from server components to client components
    timestamp: null, 
  }));

  return <ChatListRows initialChats={initialChats} />;
}

export default ChatList;
