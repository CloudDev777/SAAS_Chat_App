"use client";

import { useSession } from "next-auth/react";

function CheckoutButton() {
  const { data: session } = useSession();

  const createCheckoutSession = () => {
    if (!session) return;

    // push a document into firestore db

    // ...stripe extension on firebase will crate a checkout session

    // redirect user to checkout page
  };

  return (
    <div>
      {/* If subscribed show me the user is subscribed */}
      <button
        onClick={() => createCheckoutSession()}
        className="inline-block rounded border w-full text-center mt-5 border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      >
        Sign Up
      </button>
    </div>
  );
}

export default CheckoutButton;
