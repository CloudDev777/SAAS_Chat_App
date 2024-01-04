"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { StarIcon } from "lucide-react";

import { useSubscriptionStore } from "@/store/store";
import UserAvatar from "./UserAvatar";
import LoadingSpinner from "./LoadingSpinner";
import ManageAccountButton from "./ManageAccountButton";

interface UserButton {
  session: Session | null;
}

function UserButton({ session }: UserButton) {
  const subscription = useSubscriptionStore((state) => state.subscription);

  if (!session) {
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session.user?.name || ""}
          image={session.user?.image || ""}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subscription === undefined && (
          <DropdownMenuLabel>
            <LoadingSpinner />
          </DropdownMenuLabel>
        )}
        {subscription?.role === "pro" && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center gap-2 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E935C1" />
              <p>Pro Member</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
