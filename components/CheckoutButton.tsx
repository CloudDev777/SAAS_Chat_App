"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useSubscriptionStore } from "@/store/store";

import LoadingSpinner from "./LoadingSpinner";
import ManageAccountButton from "./ManageAccountButton";

function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const subscribe = useSubscriptionStore((store) => store.subscription);
  const isSubscriptionLoading = subscribe === undefined;
  const isSubscriberPro =
    subscribe?.status === "active" && subscribe.role === "pro";

  const createCheckoutSession = async () => {
    if (!session) return;

    // push a document into firestore db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OUcQHJxNIp4iqPUAqgGOMJo",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // ...stripe extension on firebase will crate a checkout session
    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        // show an error to customer & inspect
        // your cloud functions logs in the firebase
        // console
        alert(`An error occurred: ${error?.message}`);
        setLoading(false);
      }

      if (url) {
        // we now have a stripe checkout url, let's redirect
        // the user to the checkout page
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div>
      {/* If subscribed show me the user is subscribed */}
      {isSubscriberPro && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to PRO
          </p>
        </>
      )}

      <div className="inline-block rounded border w-full text-center mt-5 border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 disabled:opacity-80 disabled:bg-indigo-300 disabled:cursor-default">
        {isSubscriberPro ? (
          <ManageAccountButton />
        ) : loading || isSubscriptionLoading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={() => createCheckoutSession()} disabled={loading}>
            Signup
          </button>
        )}
      </div>
    </div>
  );
}

export default CheckoutButton;
