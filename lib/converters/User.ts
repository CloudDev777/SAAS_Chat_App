import { db } from "@/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  where,
  query,
} from "firebase/firestore";
import { User } from "next-auth";

const userConverter: FirestoreDataConverter<User> = {
  // what goes into firebase
  toFirestore: function (member: User): DocumentData {
    return {
      email: member.email,
      image: member.image,
      name: member.name,
    };
  },
  // what comes from firebase, that we mutate on for type definition, can
  // be used for adding other information as well
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);

    const sub: User = {
      id: snapshot.id,
      email: data.email,
      image: data.image,
      name: data.name,
    };

    return sub;
  },
};

export const getUserByEmailRef = (email: string) =>
  query(collection(db, "users"), where("email", "==", email)).withConverter(
    userConverter
  );
