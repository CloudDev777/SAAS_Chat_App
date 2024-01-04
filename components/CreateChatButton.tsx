"use client";

import { useState } from "react";
import { MessageSquarePlusIcon, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

import { addChatRef } from "@/lib/converters/ChatMembers";

import { useToast } from "@/components/ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "./LoadingSpinner";
import { serverTimestamp, setDoc } from "firebase/firestore";

interface CreateChatButtonProps {
  isLarge?: boolean;
}
function CreateChatButton({ isLarge }: CreateChatButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user.id) return;

    setLoading(true);
    toast({
      title: "Creating new chat ..",
      description: "Hold on tight while we create your new chat ...",
      duration: 3000,
    });

    // Check if user is not pro and limit them creating a new chat
    // @todo do something here

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created",
          className: "bg-green-600 text-white",
          duration: 2000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "There was an error creating your chat!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge) {
    <div>
      <Button variant="default" onClick={createNewChat}>
        {loading ? <LoadingSpinner /> : "Create a New Chat"}
      </Button>
    </div>;
  }

  return (
    <Button variant="ghost" onClick={createNewChat}>
      <MessageSquarePlusIcon />
    </Button>
  );
}

export default CreateChatButton;
