import { adminDB } from "@/firebase-admin";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { chatId } = await req.json();

  const ref = adminDB.collection("chats").doc(chatId);

  const bulkWriter = adminDB.bulkWriter();
  const MAX_RETRY_ATTEMPTS = 5;

  bulkWriter.onWriteError((error) => {
    if (error.failedAttempts < MAX_RETRY_ATTEMPTS) {
      return true;
    } else {
      console.error("Failed write at documents: ", error.documentRef.path);
      return false;
    }
  });

  try {
    await adminDB.recursiveDelete(ref, bulkWriter);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Promise.rejected: ", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
