import capitalize from "./capitalize";

describe("capitalize", () => {
  it.each([
    ["", ""],
    [" word", " word"],
    ["word", "Word"],
    ["1word", "1word"],
  ])("capitalizes %s to %s", (input, output) => {
    expect(capitalize(input)).toBe(output);
  });
});
