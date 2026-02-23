import assert from "node:assert";
import test from "node:test";
import { spellCheck } from "./common.mjs";

test("Spell checker correctly identifies misspelled words", () => {
  assert.deepEqual(spellCheck("hello world"), ["hello", "world"]);
  assert.deepEqual(spellCheck("Hello World"), []);
  assert.deepEqual(spellCheck("cake, please"), []);
  assert.deepEqual(spellCheck("feisty-cat"), ["feisty"]);
  assert.deepEqual(spellCheck("act-a"), []);
});