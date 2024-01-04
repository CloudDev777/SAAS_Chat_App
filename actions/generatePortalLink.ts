"use server";

import { nextAuthOptions } from "@/auth";
import { adminDB } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function generatePortalLink() {
  const session = await getServerSession(nextAuthOptions);
  const host = headers().get("host");

  if (!session?.user.id) return "No user id found for manage accounts";

  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? `http://${host}/register`
      : `https://${host}/register`;

  const doc = await adminDB.collection("customers").doc(id).get();

  if (!doc.data) {
    return console.error("No customer record found with user id: ", id);
  }

  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  return redirect(stripeSession.url);
}
