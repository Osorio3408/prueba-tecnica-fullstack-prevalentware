import { UserService } from "@/modules/users/user.service";

describe("UserService - updateUser", () => {
  it("should throw error for invalid role", async () => {
    const service = new UserService();

    await expect(
      service.updateUser("123", {
        role: "INVALID_ROLE" as any,
      })
    ).rejects.toThrow();
  });
});