'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { useSubscriptionStore } from "@/store/store";
import { PlusCircleIcon } from "lucide-react";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { ToastAction } from "./ui/toast";
import { getUserByEmailRef } from "@/lib/converters/User";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function InviteUserButton({ chatId }: { chatId: string }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();

  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const emailCopy = values.email;
    form.reset();
    if (!session?.user.id) return;

    toast({
      title: "Sending invite",
      description: "Please wait while we send the invite ..",
    });

    // check if user is pro and limit them adding more then 2 people in chat
    const chatMembers = await getDocs(chatMembersRef(chatId));
    const chatMembersLength = chatMembers.docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && chatMembersLength > 2) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the FREE plan limit of 20 message per chat. Upgrade to PRO to continue adding users",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to PRO
          </ToastAction>
        ),
      });

      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(emailCopy));

    if (querySnapshot.empty) {
      toast({
        title: "User not found",
        description:
          "Please enter an email address of a registered user OR resend the invitation once they have signed up!",
        variant: "destructive",
      });
      return;
    } else {
      const user = querySnapshot.docs?.[0]?.data();

      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      }).then(() => {
        setOpen(false);

        toast({
          title: "Added to chat",
          description: "The user has been added to chat successfully",
          className: "bg-green-600 text-white",
          duration: 3000,
        });

        setOpenInviteLink(true)
      });
    }
  };

  if (adminId === session?.user.id) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              <span>Add User To Chat</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User To Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this
                chat!.{" "}
                <span className="text-indigo-600 font-bold">
                  (Note: they must be registered)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="john@doe.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="ml-auto sm:w-fit w-full">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        {/* <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        /> */}
      </>
    );
  }

  return <div className="flex justify-end space-x-2 m-5 mb-0"></div>;
}

export default InviteUserButton;
