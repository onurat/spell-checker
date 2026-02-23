# TESTING.md

## Website input
The website provides a `<textarea>` with id `text-input` where users can write text. This meets the rubric requirement for an input field.

## Trigger spell check
A button with id `check-button` allows the user to trigger the spell check. Clicking this button runs the `spellCheck` function.

## Spell check logic
The `spellCheck` function verifies every word in the input:
- Words with capitalized first letters (proper nouns) are treated as correct.
- Punctuation characters `,.?!":;` are removed before checking words.
- Hyphenated words are split into separate words and checked individually.
- The dictionary combines the `words.json` file and any custom words added by the user.

## Highlight mistakes
Misspelled words are displayed under the input in the `#results` div. They are styled with a red background using the `.mistake` class and listed clearly with the message:  
*"Misspelled words: [word]. Would you like to add this word to the dictionary?"*

## Add word to dictionary
If a word is misspelled, a button appears under the message allowing the user to add the first misspelled word to a temporary custom dictionary. Clicking this button re-runs the spell check, and the added word is no longer flagged.

## Punctuation handling
Words next to punctuation are checked correctly:
- `"cake,"` is treated as `"cake"` and not marked as incorrect.
- `"feisty-cat"` splits into `"feisty"` and `"cat"`. Only `"feisty"` is flagged if it is not in the dictionary.

## Accessibility
The page passes 100% in Lighthouse accessibility:
- Uses `<main>` landmark.
- `aria-live="polite"` on results ensures screen readers announce changes.
- Buttons and textarea have clear labels.
- High color contrast and readable font.

## Unit tests
A non-trivial unit test exists in `common.test.mjs`:

```js
import assert from "node:assert";
import test from "node:test";
import { spellCheck } from "./common.mjs";

test("Spell checker correctly identifies misspelled words", () => {
  assert.deepEqual(spellCheck("hello world"), ["hello", "world"]);
  assert.deepEqual(spellCheck("Hello World"), []);
  assert.deepEqual(spellCheck("cake, please"), []);
  assert.deepEqual(spellCheck("feisty-cat"), ["feisty"]);
});