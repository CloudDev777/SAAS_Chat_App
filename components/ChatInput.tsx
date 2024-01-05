"use client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import {
  Message,
  limitedMessagesRef,
  messagesRef,
} from "@/lib/converters/Messages";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
  const { data: session } = useSession();
  const subscription = useSubscriptionStore((state) => state.subscription);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const inputCopy = values.input.trim();
    form.reset();

    if (inputCopy.length === 0) return;
    if (!session?.user) return;

    // check if user is prop and limit them creating a new message in chat
    const messages = await getDocs(limitedMessagesRef(chatId));
    const messagesLength = messages.docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && messagesLength >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the FREE plan limit of 20 message per chat. Upgrade to PRO for unlimited chat messages",
          variant: 'destructive',
          action: (
            <ToastAction altText="Upgrade" onClick={() => router.push("/register")}>
              Upgrade to PRO
            </ToastAction>
          )
      });

      return;
    }

    const userToStore: Message["user"] = {
      id: session.user.id,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: inputCopy,
      timestamp: serverTimestamp(),
      user: userToStore,
    });

    form.reset();
  };

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bh-white border dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ChatInput;
