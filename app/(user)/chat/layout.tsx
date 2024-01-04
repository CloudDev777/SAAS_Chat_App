import { PropsWithChildren } from "react";

function ChatsLayout({ children }: PropsWithChildren) {
  return <div className="flex-1 w-full flex-col max-w-6xl mx-auto">{children}</div>;
}

export default ChatsLayout;
