import { db } from "@/firebase";
import { Subscription } from "@/types/Subscription";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
} from "firebase/firestore";

const subscriptionConvertor: FirestoreDataConverter<Subscription> = {
  // what goes into firebase
  toFirestore: function (subscription: Subscription): DocumentData {
    return { ...subscription };
  },
  // what comes from firebase, that we mutate on for type definition, can
  // be used for adding other information as well
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Subscription {
    const data = snapshot.data(options);

    const sub: Subscription = {
      id: snapshot.id,
      cancel_at: data.cancel_at,
      cancel_at_period_end: data.cancel_at_period_end,
      current_period_start: data.current_period_start,
      created: data.created,
      ended_at: data.ended_at,
      items: data.items,
      metadata: data.metadata,
      price: data.price,
      prices: data.prices,
      status: data.status,
      stripeLink: data.stripeLink,
      payment_method: data.payment_method,
      product: data.product,
      quantity: data.quantity,
      role: data.role,
      trial_end: data.trial_end,
      trial_start: data.trial_start,
      latest_invoice: data.latest_invoice,
      current_period_end: data.current_period_end,
      canceled_at: data.canceled_at,
    };

    return sub;
  },
};

export const subscriptionRef = (userId: string) =>
  collection(db, "customers", userId, "subscriptions").withConverter(
    subscriptionConvertor
  );
