import nextElementInList from "@/utils/nextElementInList";

describe("nextElementInList", () => {
  it("locates and returns next element in list", () => {
    const list = ["A", "B", "C"];
    const value = "B";

    expect(nextElementInList(list, value)).toBe("C");
  });
});
describe("when element is at end of the list", () => {
  it("locates and returns first element in list", () => {
    const list = ["A", "B", "C"];
    const value = "C";

    expect(nextElementInList(list, value)).toBe("A");
  });
});
