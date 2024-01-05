import ChatList from "@/components/ChatList";
import ChatPermissionsError from "@/components/ChatPermissionsError";
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
      {error && (
        <div className="m-2">
          <ChatPermissionsError />
        </div>
      )}
      <ChatList />
    </div>
  );
}

export default ChatsPage;
