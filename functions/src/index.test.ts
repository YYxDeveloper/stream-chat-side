const mockStreamChatInstance = {
  upsertUser: jest.fn().mockResolvedValue({}),
  createToken: jest.fn().mockReturnValue("mock-token"),
  revokeUserToken: jest.fn().mockResolvedValue({}),
  deleteUser: jest.fn().mockResolvedValue({}),
};

jest.mock("stream-chat", () => ({
  StreamChat: {
    getInstance: jest.fn(() => mockStreamChatInstance),
  },
}));

jest.mock("firebase-functions", () => {
  const actualFunctions = jest.requireActual("firebase-functions");
  return {
    ...actualFunctions,
    config: jest.fn(() => ({
      stream: { key: "test-key", secret: "test-secret" },
    })),
    https: {
      ...actualFunctions.https,
      onCall: (handler: any) => handler,
    },
    auth: {
      user: jest.fn(() => ({
        onDelete: (handler: any) => handler,
      })),
    },
  };
});

describe("Stream Chat Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createStreamUserAndGetToken", () => {
    it("should create user and return token", async () => {
      const { createStreamUserAndGetToken } = require("./index");
      const result = await createStreamUserAndGetToken(
        { name: "Test User", email: "test@test.com", image: "http://img.com" },
        { auth: { uid: "user123" } }
      );
      expect(mockStreamChatInstance.upsertUser).toHaveBeenCalledWith({
        id: "user123",
        name: "Test User",
        email: "test@test.com",
        image: "http://img.com",
      });
      expect(result).toEqual({ token: "mock-token" });
    });

    it("should throw failed-precondition when not authenticated", async () => {
      const { createStreamUserAndGetToken } = require("./index");
      await expect(
        createStreamUserAndGetToken({}, { auth: null })
      ).rejects.toMatchObject({ code: "failed-precondition" });
    });

    it("should use empty strings for missing data fields", async () => {
      const { createStreamUserAndGetToken } = require("./index");
      await createStreamUserAndGetToken({}, { auth: { uid: "user123" } });
      expect(mockStreamChatInstance.upsertUser).toHaveBeenCalledWith({
        id: "user123",
        name: "",
        email: "",
        image: undefined,
      });
    });
  });

  describe("getStreamUserToken", () => {
    it("should return token without creating user", async () => {
      const { getStreamUserToken } = require("./index");
      const result = await getStreamUserToken({}, { auth: { uid: "user123" } });
      expect(mockStreamChatInstance.upsertUser).not.toHaveBeenCalled();
      expect(mockStreamChatInstance.createToken).toHaveBeenCalledWith("user123");
      expect(result).toEqual({ token: "mock-token" });
    });

    it("should throw failed-precondition when not authenticated", async () => {
      const { getStreamUserToken } = require("./index");
      await expect(
        getStreamUserToken({}, { auth: null })
      ).rejects.toMatchObject({ code: "failed-precondition" });
    });
  });

  describe("revokeStreamUserToken", () => {
    it("should revoke token and return success", async () => {
      const { revokeStreamUserToken } = require("./index");
      const result = await revokeStreamUserToken({}, { auth: { uid: "user123" } });
      expect(mockStreamChatInstance.revokeUserToken).toHaveBeenCalledWith("user123");
      expect(result).toEqual({ success: true });
    });

    it("should throw failed-precondition when not authenticated", async () => {
      const { revokeStreamUserToken } = require("./index");
      await expect(
        revokeStreamUserToken({}, { auth: null })
      ).rejects.toMatchObject({ code: "failed-precondition" });
    });
  });

  describe("deleteStreamUser", () => {
    it("should delete Stream user on beforeDelete trigger", async () => {
      const { deleteStreamUser } = require("./index");
      await deleteStreamUser({ uid: "user123" });
      expect(mockStreamChatInstance.deleteUser).toHaveBeenCalledWith("user123");
    });

    it("should not throw if deleteUser fails", async () => {
      mockStreamChatInstance.deleteUser.mockRejectedValueOnce(new Error("API error"));
      const { deleteStreamUser } = require("./index");
      await expect(deleteStreamUser({ uid: "user123" })).resolves.not.toThrow();
    });
  });
});
