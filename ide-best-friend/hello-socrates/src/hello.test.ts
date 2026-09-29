import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { hello } from "./hello.ts";

describe("hello", () => {
  it("greets SoCraTes by default", () => {
    assert.equal(hello(), "Hello, SoCraTes!");
  });

  it("greets by name", () => {
    assert.equal(hello("Adam"), "Hello, Adam!");
  });

  it("trims whitespace", () => {
    assert.equal(hello("  Adam  "), "Hello, Adam!");
  });
});
