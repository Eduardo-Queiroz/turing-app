import { userGenerator } from "@turing-app/utils"; // Adjust the import path as necessary
import { uniqueNamesGenerator } from "unique-names-generator";

jest.mock("unique-names-generator", () => ({
  uniqueNamesGenerator: jest.fn(),
  starWars: [],
}));

describe("userGenerator", () => {
  it("should generate a user with a random Star Wars name and avatar URL", () => {
    (uniqueNamesGenerator as jest.Mock).mockReturnValue("Luke Skywalker");

    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const user = userGenerator();

    expect(user.name).toBe("Luke Skywalker");
    expect(user.avatar).toBe("https://i.pravatar.cc/300?img=35");
  });

  it("should generate the avatar URL with random number between 0 and 70", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const user1 = userGenerator();
    expect(user1.avatar).toBe("https://i.pravatar.cc/300?img=0");

    jest.spyOn(Math, "random").mockReturnValue(0.9999);
    const user2 = userGenerator();
    expect(user2.avatar).toBe("https://i.pravatar.cc/300?img=70");
  });
});
