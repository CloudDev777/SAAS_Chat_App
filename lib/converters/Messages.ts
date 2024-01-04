import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import { LanguageSupported } from "@/store/store";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Message {
  id: string;
  input: string;
  timestamp: Date;
  user: User;
  translated?: {
    [K in LanguageSupported]: string;
  };
}

const messageConvertor: FirestoreDataConverter<Message> = {
  // what goes into firebase
  toFirestore: function (message: Message): DocumentData {
    return {
      ...message
    };
  },
  // what comes from firebase, that we mutate on for type definition, can
  // be used for adding other information as well
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);

    const sub: Message = {
      id: snapshot.id,
      input: data.input,
      timestamp: data.timestamp?.toDate(),
      translated: data.translated,
      user: data.user,
    };

    return sub;
  },
};

export const messagesRef = (chatId: string) =>
  collection(db, "chats", chatId, "messages").withConverter(messageConvertor);

export const limitedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), limit(25));

export const sortedMessagesRef = (chatId: string) =>
  query(messagesRef(chatId), orderBy("timestamp", "asc"));

export const limitedSortedMessagesRef = (chatId: string) =>
  query(query(messagesRef(chatId), limit(1)), orderBy("timestamp", "desc"));
