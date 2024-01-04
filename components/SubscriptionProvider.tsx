"use client";
import { PropsWithChildren, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";

function SubscriptionProvider({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session.user.id),
      (snapshot) => {
        if (snapshot?.empty) {
          setSubscription(null);
        } else {
          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("Error getting subscription document: ", error);
      }
    );
  }, [session, setSubscription]);

  return <>{children}</>;
}

export default SubscriptionProvider;
