import * as functions from "firebase-functions";
import { StreamChat } from "stream-chat";

const serverClient = StreamChat.getInstance(
  functions.config().stream.key,
  functions.config().stream.secret
);

export const createStreamUserAndGetToken = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Must be logged in."
      );
    }
    const { uid } = context.auth;
    const { name, email, image } = data;
    try {
      await serverClient.upsertUser({ id: uid, name, email, image });
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
    await serverClient.deleteUser(user.uid);
  }
);
