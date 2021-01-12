import { get } from "./get";

describe("Get", () => {
  const obj = {
    a: {
      b: "ab",
    },
    x: null,
    c: ["d", "e"],
    "dot.dot": "don't trip now",
    get: {
      the: {
        prize: "got it",
      },
    },
  };

  it("should access object using a string", () => {
    expect(get(obj, "a.b")).toBe("ab");
  });

  it("should access object using an array", () => {
    expect(get(obj, ["a", "b"])).toBe("ab");
  });

  it("should access nested array using an index in path", () => {
    expect(get(obj, "c.0")).toBe("d");
    expect(get(obj, "c.1")).toBe("e");
  });

  it("should use the provided path seperator", () => {
    const value = get(obj, "get/the/prize", { pathSeparator: "/" });

    expect(value).toBe("got it");
  });

  it("should use the provided default value", () => {
    const DEFAULT_VAL = "my-default-value";

    const value = get(obj, "blah.wrong.path", {
      defaultValue: DEFAULT_VAL,
    });

    expect(value).toBe(DEFAULT_VAL);
  });

  it("should return undefind if path doesn't exist", () => {
    expect(get(obj, "foo.blah.bar")).toBeUndefined();
  });

  it("should fetch null", () => {
    expect(get(obj, "x")).toBeNull();
  });
});
