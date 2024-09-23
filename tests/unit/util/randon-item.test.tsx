import { getRandomItem } from "@turing-app/utils";

describe("getRandomItem", () => {
  it("should return undefined if the array is empty", () => {
    const result = getRandomItem([]);
    expect(result).toBeUndefined();
  });

  it("should return an item from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const result = getRandomItem(array);
    expect(array).toContain(result);
  });

  it("should return the first item if Math.random returns 0", () => {
    jest.spyOn(Math, "random").mockReturnValue(0);
    const array = [1, 2, 3];
    const result = getRandomItem(array);
    expect(result).toBe(1);
  });

  it("should return the last item if Math.random returns close to 1", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.99);
    const array = [1, 2, 3];
    const result = getRandomItem(array);
    expect(result).toBe(3);
  });
});
