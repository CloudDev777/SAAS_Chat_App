"use client";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "./components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";
import { Copy } from "lucide-react";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

function ShareLink({
  isOpen,
  setIsOpen,
  chatId,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  chatId: string;
}) {
  const { toast } = useToast();
  const host = window.location.host;

  const linkToChat =
    process.env.NODE_ENV === "development"
      ? `http://${host}/chat/${chatId}`
      : `https://${host}/chat/${chatId}`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(linkToChat);

      toast({
        title: "Copied Successfully",
        description:
          "Share this to the person you want to chat with! (Note: They must be added to the Chat to access it!)",
        className: "bg-green-600 text-white",
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={(open: boolean) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Copy />
          <span className="pl-2">Share Link</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Any user who has been{" "}
            <span className="text-indigo-600 font-bold">granted access</span>{" "}
            can use this link
          </DialogDescription>
        </DialogHeader>

        <section className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={linkToChat} readOnly />
          </div>
          <Button
            type="submit"
            onClick={() => copyToClipboard()}
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h4 w-4" />
          </Button>
        </section>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ShareLink;
