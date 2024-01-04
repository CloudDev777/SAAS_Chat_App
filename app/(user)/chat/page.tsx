import ChatList from "@/components/ChatList";
import React from "react";

interface Props {
  params: {};
  searchParams: {
    error: string;
  };
}

function ChatsPage({ params, searchParams: { error } }: Props) {
  return (
    <div className="">
      {/* Chat Permission chat */}

      <ChatList />
    </div>
  );
}

export default ChatsPage;
