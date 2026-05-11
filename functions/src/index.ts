import * as functions from "firebase-functions";
import { StreamChat } from "stream-chat";

const STREAM_API_KEY = process.env.STREAM_API_KEY || functions.config().stream?.key;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET || functions.config().stream?.secret;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error("Missing STREAM_API_KEY or STREAM_API_SECRET");
}

const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const createStreamUserAndGetToken = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Must be logged in."
      );
    }
    const { uid } = context.auth;
    const name: string = data?.name ?? "";
    const email: string = data?.email ?? "";
    const image: string = data?.image ?? "";
    try {
      await serverClient.upsertUser({ id: uid, name, email, image: image || undefined });
      const token = serverClient.createToken(uid);
      return { token };
    } catch (e) {
      throw new functions.https.HttpsError("aborted", String(e));
    }
  }
);

export const getStreamUserToken = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Must be logged in."
      );
    }
    const token = serverClient.createToken(context.auth.uid);
    return { token };
  }
);

export const revokeStreamUserToken = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Must be logged in."
      );
    }
    try {
      await serverClient.revokeUserToken(context.auth.uid);
      return { success: true };
    } catch (e) {
      throw new functions.https.HttpsError("aborted", String(e));
    }
  }
);

export const deleteStreamUser = functions.auth.user().onDelete(
  async (user: functions.auth.UserRecord) => {
    try {
      await serverClient.deleteUser(user.uid);
    } catch (e) {
      console.error("Failed to delete Stream user:", String(e));
    }
  }
);
