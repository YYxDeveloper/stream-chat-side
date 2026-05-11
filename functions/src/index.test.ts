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
      onCall: (handler: any) => handler,
    },
    auth: {
      user: jest.fn(() => ({
        onDelete: jest.fn(),
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
  });

  describe("getStreamUserToken", () => {
    it("should return token without creating user", async () => {
      const { getStreamUserToken } = require("./index");
      const result = await getStreamUserToken({}, { auth: { uid: "user123" } });
      expect(mockStreamChatInstance.upsertUser).not.toHaveBeenCalled();
      expect(mockStreamChatInstance.createToken).toHaveBeenCalledWith("user123");
      expect(result).toEqual({ token: "mock-token" });
    });
  });

  describe("revokeStreamUserToken", () => {
    it("should revoke token and return success", async () => {
      const { revokeStreamUserToken } = require("./index");
      const result = await revokeStreamUserToken({}, { auth: { uid: "user123" } });
      expect(mockStreamChatInstance.revokeUserToken).toHaveBeenCalledWith("user123");
      expect(result).toEqual({ success: true });
    });
  });
});
