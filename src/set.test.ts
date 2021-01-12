import { set } from "./set";

describe("Set", () => {
  it("should set value using a string path", () => {
    const obj = {
      a: {
        b: {
          c: "change this",
        },
      },
    };

    set(obj, "a.b.c", "d");

    expect(obj.a.b.c).toBe("d");
  });

  it("should set value using an array path", () => {
    const obj = {
      a: {
        b: {
          c: "change this",
        },
      },
    };

    set(obj, ["a", "b", "c"], "d");

    expect(obj.a.b.c).toBe("d");
  });

  it("should create path if it didn't exist", () => {
    const obj = {};

    set(obj, ["a", "b", "c"], "d");

    // @ts-ignore
    expect(obj?.a?.b?.c).toBe("d");
  });

  it("should create object from string path, if it's not supplied as an argument", () => {
    let obj = set("a.b.c", "d");

    // @ts-ignore
    expect(obj?.a?.b?.c).toBe("d");
  });

  it("should create object from array path, if it's not supplied as an argument", () => {
    let obj = set(["a", "b", "c"], "d");

    // @ts-ignore
    expect(obj?.a?.b?.c).toBe("d");
  });

  it("should use path Separator from options", () => {
    const obj = {
      a: {
        b: {
          c: "change this",
        },
      },
    };

    set(obj, "a#b#c", "d", { pathSeparator: "#" });

    expect(obj?.a?.b?.c).toBe("d");
  });
});
