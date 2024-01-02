import Link from "next/link";
import { getServerSession } from "next-auth";
import { MessageSquareIcon } from "lucide-react";
import { nextAuthOptions } from "@/auth";

import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
import UserButton from "./UserButton";
import CreateChatButton from "./CreateChatButton";

async function Header() {
  // subscriptions here firebase

  const session = await getServerSession(nextAuthOptions);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* LanguageSelect */}
          {session ? (
            <>
              <Link href="/chat" prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href="/pricing" prefetch={false}>
              Pricing
            </Link>
          )}
          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>
      {/* Banner */}
    </header>
  );
}

export default Header;
