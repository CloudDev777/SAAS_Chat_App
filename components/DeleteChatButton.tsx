"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAdminId from "@/hooks/useAdminId";

function DeleteChatButton({ chatId }: { chatId: string }) {
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();
  const adminId = useAdminId({ chatId });

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    toast({
      title: "Deleting chat",
      description: "Please wait while we delete the chat ..",
    });

    await fetch("/api/chat/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    }).then((res) => {
      toast({
        title: "Success",
        description: "Your chat has been deleted!",
        className: "bg-green-600 text-white",
        duration: 3000,
      });
      router.replace("/chat");
    }).catch((error) => {
      toast({
        title: "Error",
        description: "There was an error deleting your chat!",
        variant: 'destructive',
      });
    }).finally(() => setOpen(false));
  };

  if (session?.user.id !== adminId) return null;

  return (
    <Dialog open={open} onOpenChange={(open: boolean) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon />
          <span className="pl-2">Delete Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will delete the chat for all users.
          </DialogDescription>
        </DialogHeader>

        <div className="gird grid-cols-2 space-x-2">
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteChatButton;
